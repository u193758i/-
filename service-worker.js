const CACHE_NAME = 'calc-pwa-cache-v1';
const FILES = [
  '.',
  'index.html',
  'style.css',
  'app.js',
  'manifest.json'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener('activate', evt => evt.waitUntil(self.clients.claim()));

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});
