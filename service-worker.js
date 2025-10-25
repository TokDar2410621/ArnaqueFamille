// simple service worker pour fournir le shell PWA
const CACHE_NAME = 'demo-pwa-v4';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/transactions.html',
  '/documents.html',
  '/profil.html',
  '/style.css',
  '/app.js',
  '/dashboard.js',
  '/transactions.js',
  '/documents.js',
  '/profil.js',
  '/manifest.json',
  '/icone.png',
  '/faux_entreprises_simulation.pdf',
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
