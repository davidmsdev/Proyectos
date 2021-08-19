// Cuando se instala el service worker
self.addEventListener('install', e => {
    console.log('Instalado el Service Worker');
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