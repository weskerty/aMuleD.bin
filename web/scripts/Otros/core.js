(function(){
const D='web/es.html';
const CP='web/otros/Archivos/HTML/centralPage.html';
const CC_MAX=5;
let c='';
let bg={};
const CC=[];

function ccG(u){
const i=CC.findIndex(x=>x.k===u);
if(i===-1)return null;
const e=CC.splice(i,1)[0];
CC.push(e);
return e.v;
}
function ccS(u,v){
const i=CC.findIndex(x=>x.k===u);
if(i!==-1)CC.splice(i,1);
if(CC.length>=CC_MAX)CC.shift();
CC.push({k:u,v:v});
}

const md=window.markdownit({
html:!0,breaks:!0,linkify:!0,typographer:!0
}).use(window.markdownItAnchor,{
permalink:window.markdownItAnchor.permalink.headerLink(),
slugify:s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,'').replace(/\s+/g,'-')
});

function iM(){return window.matchMedia("(max-width: 768px)").matches}

function hL(){
const l=document.getElementById('loading-screen');
if(l)l.classList.add('hide')
}

async function lBG(){
try{
const r=await fetch('web/fondo.json');
if(!r.ok){bg={type:'fallback'};return}
const d=await r.json();
const m=new Date().getMonth();
bg=d.backgrounds.find(b=>b.month===m)||d.backgrounds[0]||{type:'fallback'}
}catch(e){bg={type:'fallback'}}
}

function aBG(){
const rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const v=document.getElementById('bg-video');
if(iM()||rm||!bg||bg.type!=='video'){
if(v)v.remove();
if(bg&&bg.type==='css'){
document.body.style.background=bg.css
}else if(bg&&bg.type==='image'){
document.body.style.backgroundImage=`url(${bg.src})`;
document.body.style.backgroundSize='cover';
document.body.style.backgroundPosition='center';
document.body.style.backgroundAttachment='fixed'
}
hL();return
}
if(!v||!bg.src){hL();return}
v.querySelector('source').src=bg.src;
v.load();
const t=setTimeout(()=>{v.pause();v.src='';v.load();hL()},5000);
v.addEventListener('loadeddata',()=>{clearTimeout(t);hL()})
}

const ES=new Set();
function eS(e){
const s=e.querySelectorAll('script');
s.forEach(o=>{
if(o.dataset.executed)return;
if(o.type==='module')return;
if(o.src&&ES.has(o.src))return;
if(o.src)ES.add(o.src);
o.dataset.executed="1";
const n=document.createElement('script');
for(const a of o.attributes)n.setAttribute(a.name,a.value);
if(o.src)n.src=o.src;
else n.textContent=o.textContent;
o.parentNode.replaceChild(n,o);
});
}

async function lX(p='web/scripts/'){
if(window.__LX)return;
window.__LX=true;
try{
const r=await fetch(p+'list.json');
if(!r.ok)return;
const x=await r.json();
await Promise.all(x.map(f=>new Promise(res=>{
const s=document.createElement('script');
s.src=p+f;
s.onload=res;s.onerror=res;
document.body.appendChild(s)
})));
}catch(e){}
}

let lCR=false;
async function lC(u,h=!0,a=''){
if(u===c||lCR)return;
lCR=true;
try{
const d=document.getElementById('content');
let t=ccG(u);
if(!t){
const r=await fetch(u);
if(!r.ok)throw new Error(`Error fetching ${u}: ${r.statusText}`);
t=await r.text();
ccS(u,t);
}
let html=t;
if(u.endsWith('.md'))html=`<div class="markdown-content">${md.render(t)}</div>`;
document.head.querySelectorAll('style[data-content]').forEach(s=>s.remove());
d.innerHTML=html;
d.querySelectorAll('style').forEach(s=>{s.dataset.content='1';document.head.appendChild(s);});
eS(d);
d.dispatchEvent(new CustomEvent('contentLoaded',{bubbles:true}));
c=u;
if(h){
const n=a?`${u}#${a}`:u;
window.history.pushState({p:u,a:a},'',`#${n}`)
}
if(a){
requestAnimationFrame(()=>requestAnimationFrame(()=>{
const e=document.getElementById(a);
if(e)e.scrollIntoView({behavior:'smooth',block:'start'})
}));
}
}catch(e){
document.getElementById('content').innerHTML=`<p>Error Cargando: ${e.message}</p>`
}finally{lCR=false;}
}

function pH(h){
if(!h||h==='#')return{p:'',a:''};
h=h.substring(1);
const s=h.split('#');
if(s.length>1)return{p:s[0],a:s[1]};
if(h.includes('web/'))return{p:h,a:''};
return{p:'',a:h}
}

function hH(){
const h=window.location.hash;
if(!h||h==='#'){window.location.hash=D;return}
const{p,a}=pH(h);
if(!p&&a){
requestAnimationFrame(()=>requestAnimationFrame(()=>{
const e=document.getElementById(a);
if(e)e.scrollIntoView({behavior:'smooth',block:'start'})
}));
return
}
if(p!==c){
window.scrollTo({top:0,behavior:'smooth'});
lC(p,!1,a)
}else if(a){
requestAnimationFrame(()=>requestAnimationFrame(()=>{
const e=document.getElementById(a);
if(e)e.scrollIntoView({behavior:'smooth',block:'start'})
}));
}
}

document.addEventListener("DOMContentLoaded",async()=>{
await lBG();
aBG();
const h=window.location.hash;
const{p:s,a:t}=pH(h);
const f=s||D;
window.history.replaceState({p:CP,i:0,exit:!0},'',`#${D}`);
for(let i=1;i<=5;i++){
await new Promise(r=>setTimeout(r,0));
window.history.pushState({p:D,i:i},'',`#${D}`)
}
if(f!==D){
await lC(f,!1,t);
await new Promise(r=>setTimeout(r,0));
window.history.pushState({p:f,a:t},'',`#${f}${t?'#'+t:''}`)
}else{
await lC(D,!1)
}
await lX();
window.addEventListener('hashchange',()=>{hH()});
window.addEventListener('popstate',(e)=>{
if(e.state){
if(e.state.exit){lC(CP,false);return}
const a=e.state.a||'';
if(e.state.p!==c){lC(e.state.p,!1,a)}
else if(a){const t=document.getElementById(a);if(t)t.scrollIntoView({behavior:'smooth',block:'start'})}
}else{
window.history.pushState({p:D},'',`#${D}`);
if(c!==D)lC(D,!1)
}
})
});

document.addEventListener('click',(e)=>{
const a=e.target.closest('a');
if(!a)return;
if(a.target==="_blank")return;
const h=a.getAttribute('href');
if(h&&h.startsWith('#')&&!h.includes('web/')){
e.preventDefault();
const i=h.substring(1);
const t=document.getElementById(i);
if(t){
const n=c?`${c}#${i}`:`${D}#${i}`;
window.history.pushState({p:c||D,a:i},'',`#${n}`);
t.scrollIntoView({behavior:'smooth',block:'start'})
}
return
}
const iE=a.href.startsWith('http://')||a.href.startsWith('https://');
const iS=a.href.startsWith(window.location.origin);
if(iE&&!iS)return;
const spaExt=/\.(md|html)$/i;
if(!spaExt.test(h))return;
e.preventDefault();
const url=new URL(a.href);
let u=url.pathname.startsWith('/')?url.pathname.slice(1):url.pathname;
window.scrollTo({top:0,behavior:'smooth'});
lC(u)
});
})();