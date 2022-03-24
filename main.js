// Make sure Service Worker supports
if('serviceWorker' in navigator) {
    console.log('Service Worker: Supports')
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw_cached_site.js')
            .then((reg) => console.log('Service Worker: Registered'))
            .catch((err) => console.log(`Service Worker: Error: ${err}`));
    });
}