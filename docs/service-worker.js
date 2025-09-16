const CACHE = 'pwa-demo-v1'; // bump to v2 for the update demo
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './Kambla.jpg',
  './Kambla2.jpg'
];

self.addEventListener('install', (e) => {
  // make new SW active ASAP
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  // claim clients so updates are immediate
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});