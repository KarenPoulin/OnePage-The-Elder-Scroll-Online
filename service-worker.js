//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

//Add list of files to cache here.
const FILES_TO_CACHE = [
    'offline.html',
    'styles/css/normalize.css',
    'styles/css/style.css',
    'images/icons/maskable_icon_x128.png',
    'images/icons/maskable_icon_x192.png',
    'images/icons/maskable_icon_x384.png',
    'images/icons/maskable_icon_x512.png',
    'images/background.jpg',
    'images/buy-crowns.png',
    'images/cards-background.jpg',
    'images/crowns-banner.jpg',
    'images/eso-logo-horizontal.webp',
    'images/favicon.png',
    'images/grid-in-game-1.jpg',
    'images/grid-in-game-2.jpg',
    'images/grid-in-game-3.jpg',
    'images/grid-in-game-4.webp',
    'images/grid-in-game-5.jpg',
    'images/grid-in-game-6.jpg',
    'images/icons8-chevron-droite-30.png',
    'images/icons8-chevron-gauche-30.png',
    'images/icons8-menu-48.png',
    'images/images-cards-blackwood.jpg',
    'images/images-cards-elsweyr.jpg',
    'images/images-cards-highisle.jpg',
    'images/images-cards-morrowind.jpg',
    'images/in-game-icons-cave.png',
    'images/in-game-icons-dragon.png',
    'images/in-game-icons-wayshrine.png',
    'images/navigation-in-game-icons-position.png',
    'images/slider-image-1.jpg',
    'images/slider-image-2.jpg',
    'images/slider-image-3.jpg',
    'images/slider-image-4.jpg',
    'images/stats.png'
];
self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');

    // Precache static resources here.
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');

    //Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});
self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    //Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                return cache.match('/Cochenille/PointNClick/offline.html' );
            });
        })
    );
});