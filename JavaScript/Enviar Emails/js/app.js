// Variables
const btnEnviar = document.querySelector('#enviar');

// Variables campos formularios
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

eventListeners();

/**
 * Carga los eventos
 */
function eventListeners() {

    // Cuando el documento esta listo iniciamos nuestra APP
    document.addEventListener('DOMContentLoades', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
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

/**
 * Valida los campos del formulario en tiempo real
 */
function validarFormulario(e) {

    const elemento = e.target;

    // Acceder a los que el usuario escribe en el input
    console.log(elemento.value);

    if(elemento.value.lenght > 0) {
        
    } else {
        // Añadimos estilos si el campo esta vacío con Tailwind
        elemento.classList.add('border', 'border-red-500');
    }
}