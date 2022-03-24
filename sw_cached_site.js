const cacheName = "v2";

// Installing Service Worker
self.addEventListener('install', (e) => {
    console.log("Service Worker: Installed");
});

// Activate Service Worker
self.addEventListener('activate', (e) => {
    console.log("Service Worker: Activated");
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map((eachCache) => {
                    if(eachCache != cacheName) {
                        console.log("Service Worker: Clear unwanter Caches");
                        return caches.delete(eachCache);
                    }
                })
            )
        })
    )
});

self.addEventListener('fetch', (e) => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            const resClone = res.clone();
            caches.open(cacheName)
            .then(cache => {
                cache.put(e.request, resClone);
            })
            return res;
        })
        .catch(() => caches.match(e.request).then(res => res))
    );
});