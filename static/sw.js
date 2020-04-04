const cacheName = 'cache-v2';
const filesToCache = ['/', '/bundle.css', '/bundle.js', 'favicon.png'];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches
      .match(event.request, {
        ignoreSearch: true,
      })
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    // delete old caches
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (foundCacheName) {
          if (foundCacheName !== cacheName) {
            return caches.delete(foundCacheName);
          }
        })
      );
    })
  );
});
