const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = ['/', '/main.ts', '/icons/hlogo.svg', '/data/doctors.json'];

self.addEventListener('install', async (event: ExtendableEvent) => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Error en la instalación', error);
      })
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service Worker activado');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return caches.open(CACHE_NAME).then((cache) => {
          console.log('Opened cache in activate');
          return cache.addAll(urlsToCache);
        });
      })
      .catch((error) => {
        console.log('Error en la activación', error);
      })
  );
});

// Estrategia Stale-While-Revalidate
//
// Muestra la versión en caché primero (si existe).
// Luego, busca una versión más actualizada en la red.
self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});
