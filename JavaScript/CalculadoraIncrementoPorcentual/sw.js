const cacheName = 'cip-v1';

// Cachear archivos
const archives = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/registerWorker.js',
];

// Cuando se instala el service worker
self.addEventListener('install', e => {
    console.log('Instalado el Service Worker');

    // Cargamso el sevice worker y esperamos a que se descarguen todos los archivos que queremos
    e.waitUntil(
        caches.open(cacheName)
            .then( cache => {
                console.log('Cacheando...');
                cache.addAll(archives);
            })
    )
    
});

// Activar el Service Worker
self.addEventListener('activate', e => {
    console.log('Service Worker activado');

    console.log(e);
});

// Evento FETCH para descargar archivos estáticos
self.addEventListener('fetch', e => {
    console.log('Fetch... ', e);
});