const fs = require('fs');
const p = require('path');
const os = require('os');
const { execFile, spawn } = require('child_process');
const { promisify } = require('util');
const execFileAsync = promisify(execFile);

const JOBS = new Map();
const QUEUE = [];
let ACTIVE = 0;
const MAX = 2;
const T = 500000;

const BINS = new Map([
  ['win32-x64','yt-dlp.exe'],['win32-ia32','yt-dlp_x86.exe'],
  ['darwin','yt-dlp_macos'],['linux-x64','yt-dlp_linux'],
  ['linux-arm64','yt-dlp_linux_aarch64'],['linux-arm','yt-dlp_linux_armv7l'],
  ['default','yt-dlp']
]);

const FMT_VIDEO = ['-f','sd/18/bestvideo[height<=720][vcodec*=h264]+bestaudio[acodec*=aac]/bestvideo[height<=720]+bestaudio/bestvideo+bestaudio/best','--sponsorblock-remove','all','--embed-chapters','--add-metadata'];
const FMT_AUDIO = ['-f','ba/best','-x','--audio-format','mp3','--audio-quality','0','--sponsorblock-remove','all','--embed-thumbnail','--add-metadata','--postprocessor-args','ffmpeg:-id3v2_version 3'];
const COMMON = ['--no-part','--no-mtime','--min-sleep-interval','3','--max-sleep-interval','10'];

const ENGINES = {
  video: ['ytsearch5','gvsearch5','dailymotionsearch5'],
  audio: ['ytsearch5','scsearch5','nicosearch5']
};

let BIN = null;

async function getBin(binDir) {
  if (BIN) return BIN;
  try { await execFileAsync('yt-dlp', ['--version'], {timeout:5000}); BIN = 'yt-dlp'; return BIN; } catch(_){}
  const name = BINS.get(os.platform()+'-'+os.arch()) || BINS.get('default');
  const fp = p.join(binDir, name);
  if (fs.existsSync(fp)) { BIN = fp; return BIN; }
  const url = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/'+name;
  const r = await fetch(url);
  if (!r.ok) throw new Error('Download failed: '+r.statusText);
  const buf = Buffer.from(await r.arrayBuffer());
  fs.mkdirSync(p.dirname(fp), {recursive:true});
  fs.writeFileSync(fp, buf);
  if (os.platform() !== 'win32') fs.chmodSync(fp, '755');
  BIN = fp; return BIN;
}

function exec(bin, args) {
  return new Promise((res, rej) => {
    execFile(bin, args, {maxBuffer:100*1024*1024, timeout:T}, (e, stdout, stderr) => {
      if (e) { e.stderr = stderr; return rej(e); }
      res({stdout, stderr});
    });
  });
}

function enqueue(fn) {
  return new Promise((res, rej) => {
    QUEUE.push({fn, res, rej});
    drain();
  });
}
function drain() {
  while (ACTIVE < MAX && QUEUE.length) {
    const {fn, res, rej} = QUEUE.shift();
    ACTIVE++;
    fn().then(res).catch(rej).finally(() => { ACTIVE--; drain(); });
  }
}

async function runDownload(job, url, type, binDir, tempDir, MB) {
  job.status = 'downloading';
  const dir = p.join(tempDir, job.jobId);
  fs.mkdirSync(dir, {recursive:true});
  try {
    const bin = await getBin(binDir);
    const fmt = type === 'video' ? FMT_VIDEO : FMT_AUDIO;
    await new Promise((res, rej) => {
      const proc = spawn(bin, [
        '--restrict-filenames','--no-abort-on-error','--newline','--progress',
        ...COMMON, ...fmt,
        '-o', p.join(dir, '%(title).70s.%(ext)s'), url
      ]);
      job._proc = proc;
      proc.stdout.on('data', d => {
        const s = d.toString();
        const pm = s.match(/(\d+\.?\d*)%/);
        const sm = s.match(/([\d.]+\s*[KMG]iB\/s)/);
        if (pm) job.percent = parseFloat(pm[1]);
        if (sm) job.speed = sm[1];
      });
      proc.on('close', code => (code === 0 || fs.readdirSync(dir).length) ? res() : rej(new Error('Exit '+code)));
      proc.on('error', rej);
    });
    for (const f of fs.readdirSync(dir)) {
      fs.renameSync(p.join(dir, f), p.join(MB, f));
    }
    job.percent = 100; job.status = 'done'; job.speed = '';
  } catch(e) {
    job.status = 'error'; job.error = e.message;
  } finally {
    try { fs.rmSync(dir, {recursive:true, force:true}); } catch(_){}
    setTimeout(() => JOBS.delete(job.jobId), 30000);
  }
}

module.exports = function(app, MB) {
  const BIN_DIR = p.join(MB, '..', 'bin');
  const TEMP_DIR = p.join(MB, 'tmp-ytdlp');
  fs.mkdirSync(BIN_DIR, {recursive:true});
  fs.mkdirSync(TEMP_DIR, {recursive:true});

  app.post('/api/yt-dlp/search', async (req, res) => {
    const {query} = req.body;
    if (!query) return res.status(400).json({error:'query required'});
    try {
      const bin = await getBin(BIN_DIR);
      const type = req.body.type || 'audio';
      const settled = await Promise.allSettled(ENGINES[type].map(async engine => {
        const {stdout} = await exec(bin, [
          '--dump-json','--flat-playlist','--playlist-items','1-5',
          ...COMMON, engine+':'+query
        ]);
        const results = stdout.trim().split('\n').filter(Boolean).flatMap(line => {
          try {
            const d = JSON.parse(line);
            return [{id:d.id||d.url, title:d.title||'—', duration:d.duration||0, url:d.webpage_url||d.url, thumb:d.thumbnail||null, channel:d.channel||d.uploader||''}];
          } catch(_) { return []; }
        });
        return {engine, results};
      }));
      res.json({groups: settled.filter(g => g.status==='fulfilled' && g.value.results.length).map(g => g.value)});
    } catch(e) { res.status(500).json({error:e.message}); }
  });

  app.post('/api/yt-dlp/download', async (req, res) => {
    const {url, type='audio', title=''} = req.body;
    if (!url) return res.status(400).json({error:'url required'});
    const jobId = 'ytdl_'+Date.now();
    const job = {jobId, title:title||url, type, percent:0, speed:'', status:'queued', error:null};
    JOBS.set(jobId, job);
    res.json({jobId});
    enqueue(() => runDownload(job, url, type, BIN_DIR, TEMP_DIR, MB));
  });

  app.get('/api/yt-dlp/jobs', (req, res) => res.json([...JOBS.values()]));

  app.delete('/api/yt-dlp/jobs/:id', (req, res) => {
    const job = JOBS.get(req.params.id);
    if (job?._proc) try { job._proc.kill('SIGTERM'); } catch(_){}
    JOBS.delete(req.params.id);
    res.json({ok:true});
  });

  app.post('/api/yt-dlp/update', async (req, res) => {
    try {
      const bin = await getBin(BIN_DIR);
      const {stdout, stderr} = await exec(bin, ['--update-to','master']);
      BIN = null;
      res.json({ok:true, output:stdout||stderr});
    } catch(e) { res.status(500).json({error:e.message}); }
  });
};
