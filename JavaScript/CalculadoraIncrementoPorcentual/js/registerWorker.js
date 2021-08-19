if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
        .then( register => console.log('Se instalo correctamente... ', register))
        .catch( error => console.log('Falló la instalación... ', error));
} else {
    console.log('Service Workers no soportados');
}