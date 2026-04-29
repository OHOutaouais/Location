const CACHE_NAME = 'oh-outaouais-v1';

// Fichiers à mettre en cache pour fonctionner hors ligne
const FILES_TO_CACHE = [
  '/Location/',
  '/Location/index.html',
  '/Location/data.js',
  '/Location/logo.png',
  '/Location/manifest.json'
];

// Installation : mise en cache des fichiers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation : nettoyage des vieux caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch : réseau d'abord, cache en fallback si hors ligne
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Mettre à jour le cache avec la nouvelle version
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => {
        // Hors ligne : retourner la version en cache
        return caches.match(event.request);
      })
  );
});
