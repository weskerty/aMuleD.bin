const V='v1';
const PRE=[
'index.html',
'web/es.html',
'web/estilo.css',
'web/search.html',
'web/fondo.json',
'web/favicon.ico',
'web/ICON.png',
'web/404.html',
'web/otros/Archivos/Imagenes/pexels-eberhardgross-2098428.jpg',
'web/otros/Archivos/Fuentes/OpenDyslexic/OpenDyslexic-Regular.woff2',
'web/scripts/SwiperGallerys.js',
'web/scripts/list.json',
'web/scripts/Otros/core.js'
];

const DJ=/\/data\.json(\?|$)/;
const DJ_URL='web/Dinamico/data.json';
const DJ_CK='__dj_snap';
const TS_CK='__chk_ts';
const CHK_INT=36000000;

self.addEventListener('install',e=>{
e.waitUntil(
caches.open(V).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting())
);
});

self.addEventListener('activate',e=>{
e.waitUntil(
caches.keys().then(ks=>Promise.all(
ks.filter(k=>k!==V).map(k=>caches.delete(k))
)).then(()=>self.clients.claim())
);
});

async function chkDJ(){
try{
const r=await fetch(DJ_URL+'?_='+Date.now());
if(!r||!r.ok)return;
const txt=await r.text();
const c=await caches.open(V);
const prev=await c.match(DJ_CK);
const prevTxt=prev?await prev.text():null;
await c.put(DJ_CK,new Response(txt));
await c.put(TS_CK,new Response(String(Date.now())));
if(prevTxt===null)return;
if(txt!==prevTxt){
await self.registration.showNotification('🛍️ Yo Gano PY',{
body:'¡Hay Novedades 🤗!',
icon:'web/ICON.png',
badge:'web/ICON.png',
data:{url:self.location.origin}
});
}
}catch(e){}
}

async function maybeCHK(){
try{
const c=await caches.open(V);
const last=await c.match(TS_CK);
const ts=last?parseInt(await last.text()):0;
if(Date.now()-ts<CHK_INT)return;
await chkDJ();
}catch(e){}
}

self.addEventListener('fetch',e=>{
const u=e.request.url;
if(e.request.method!=='GET')return;
if(DJ.test(u)){
e.respondWith(
fetch(e.request).catch(()=>caches.match(e.request))
);
return;
}
e.waitUntil(maybeCHK());
e.respondWith(
caches.match(e.request).then(h=>{
if(h)return h;
return fetch(e.request).then(r=>{
if(!r||r.status!==200||r.type==='opaque')return r;
const rc=r.clone();
caches.open(V).then(c=>c.put(e.request,rc));
return r;
}).catch(()=>caches.match(new URL('web/404.html',self.location).href));
})
);
});

self.addEventListener('push',e=>{
let d={title:'🛍️ Yo Gano PY',body:'Hay Novedades! 🤗',icon:'web/ICON.png'};
try{d={...d,...e.data.json()};}catch(err){}
e.waitUntil(
self.registration.showNotification(d.title,{
body:d.body,
icon:d.icon||'web/ICON.png',
badge:'web/ICON.png',
data:{url:self.location.origin}
})
);
});

self.addEventListener('notificationclick',e=>{
e.notification.close();
e.waitUntil(
clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
const c=cs.find(x=>x.url.startsWith(self.location.origin)&&'focus' in x);
if(c)return c.focus();
return clients.openWindow(self.location.origin);
})
);
});

self.addEventListener('message',e=>{
if(e.data==='CHECK_DJ')e.waitUntil(chkDJ());
});
