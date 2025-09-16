const CACHE = 'darbna-v2';   // bump this on each change

const ASSETS = [
  'index.html',
  'manifest.json',
  // include icons that the manifest references (good for offline install prompt)
  'icons/icon-192x192.jpg',
  'icons/icon-512x512.jpg',
  // your extra images
  'Kambla.jpg',
  'Kambla2.jpg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    for (const url of ASSETS) {
      try {
        await cache.add(new Request(url, { cache: 'reload' }));
      } catch (err) {
        console.warn('[SW] Failed to cache:', url, err);
      }
    }
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    return cached || fetch(event.request);
  })());
});