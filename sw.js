self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("first-app").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./app.css",
        "./app.js"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== "first-app") {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", evt => {
  console.log("[ServiceWorker] Fetch", evt.request.url);

  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.open('first-app').then(cache => {
        return cache.match(evt.request).then(cache => {
          return cache;
        });
      });
    })
  );
});
