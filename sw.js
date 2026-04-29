// Service Worker para Boti Dival PWA
const CACHE_NAME = 'boti-dival-v4';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js'
];

// Instalar service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE).catch(() => {
                // Continuar incluso si falla el precaching
            });
        })
    );
    self.skipWaiting();
});

// Activar service worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Estrategia de caché: Network First para APIs, Cache First para assets
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignorar requests de chrome extensions y otros
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return;
    }

    // Para WhatsApp, dejar pasar
    if (url.hostname.includes('whatsapp')) {
        return;
    }

    // Cache First para assets estáticos
    if (request.method === 'GET' && 
        (request.destination === 'style' || 
         request.destination === 'script' || 
         request.destination === 'image')) {
        event.respondWith(
            caches.match(request).then(response => {
                return response || fetch(request).then(response => {
                    const clonedResponse = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, clonedResponse);
                    });
                    return response;
                });
            }).catch(() => {
                return new Response('Recurso no disponible offline', {
                    status: 404,
                    statusText: 'Not Found'
                });
            })
        );
    }

    // Network First para todo lo demás
    event.respondWith(
        fetch(request).catch(() => {
            return caches.match(request);
        })
    );
});
