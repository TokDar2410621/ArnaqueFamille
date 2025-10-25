// simple service worker pour fournir le shell PWA
const CACHE_NAME = 'demo-pwa-v2';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/transactions.html',
  '/profil.html',
  '/style.css',
  '/app.js',
  '/dashboard.js',
  '/transactions.js',
  '/profil.js',
  '/manifest.json',
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((resp) => resp || fetch(evt.request))
  );
});
