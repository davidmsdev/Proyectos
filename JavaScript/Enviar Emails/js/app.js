// Variables
const btnEnviar = document.querySelector('#enviar');

eventListeners();

/**
 * Carga los eventos
 */
function eventListeners() {

    // Cuando el documento esta listo iniciamos nuestra APP
    document.addEventListener('DOMContentLoades', iniciarApp);
}


// Funciones

/**
 * Inicia toda la APP
 */
function iniciarApp() {

    // De inicio deshabilitamso el botón de enviar y le añadimos una clase de Tailwind para darle estilo
    btnEnviar.disabled = ture;
    // Cambiamos el cursor al apsar por encima y la opacidad
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}