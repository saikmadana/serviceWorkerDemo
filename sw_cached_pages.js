const cacheName = "v1";
const cacheAssets = [
    'index.html',
    'about.html',
    '/css/styles.css',
    'main.js'
];

// Installing Service Worker
self.addEventListener('install', (e) => {
    console.log("Service Worker: Installed");

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log("Service Worker: Caching Files")
                return cache.addAll(cacheAssets)
            })
            .then(() => self.skipWaiting())
    );
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
        .catch(() => caches.match(e.request))
    );
});