// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Mejoramos la comprobación con expresiones regulares https://emailregex.com/
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    // Enviar el email
    formulario.addEventListener('submit', enviarEmail);

    // Resetear el formulario
    btnReset.addEventListener('click', resetearFormulario);
}


// Funciones

/**
 * Inicia toda la APP
 */
function iniciarApp() {

    // De inicio deshabilitamso el botón de enviar y le añadimos una clase de Tailwind para darle estilo
    btnEnviar.disabled = true;
    // Cambiamos el cursor al apsar por encima y la opacidad
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}


/**
 * Valida los campos del formulario en tiempo real
 */
function validarFormulario(e) {

    const elemento = e.target;
    console.log(elemento);

    // Acceder a los que el usuario escribe en el input
    if(elemento.value.length > 0) { 

        // Elimina los errores
        eliminarErrores()
        
        // En caso de que todo este OK, le quitamos (si la tiene) la clase del borde rojo
        elemento.classList.remove('border', 'border-red-500');
        elemento.classList.add('border', 'border-green-500'); 

    } else {

        // Añadimos estilos si el campo esta vacío con Tailwind
        elemento.classList.remove('border', 'border-green-500');
        elemento.classList.add('border', 'border-red-500');

        // Mostramos un error
        mostrarError('Todos los campos son obligatorios');
    }

    // Validamos el campo de email
    if(elemento.type === 'email') {
        // Buscamos que almenos hay un carácter que es @, devuelve -1 si no la encuentra
        // const resultado = elemento.value.indexOf('@');

        // El método test() ejecuta la búsqueda de una ocurrencia entre una expresión regular y una cadena especificada. Devuelve true o false.
        if(er.test(elemento.value)) {
            eliminarErrores();
            elemento.classList.remove('border', 'border-red-500');
            elemento.classList.add('border', 'border-green-500');

        } else {
            // Añadimos estilos si el campo esta vacío con Tailwind
            elemento.classList.remove('border', 'border-green-500');
            elemento.classList.add('border', 'border-red-500');
            mostrarError('El campo email no es válido');
        }
    }

    // Comprobamos que pasa todas las validaciones
    if( er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== '') {
        console.log('Validacion completa');

        // Habilitamos el botón de enviar
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}


/**
 * Muestra un mensaje de error si los campos estan vacios
 * @param {*} mensaje Mensaje a mostrar
 */
function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    // Revisamos si ya hay algun elemento con esta clase para evitar repetir el mensaje de error
    const errores = document.querySelectorAll('.error');

    if(errores.length === 0) {
        // Agregamos el mensaje al final del formulario
        formulario.appendChild(mensajeError);
    }
}

/**
 * Elimina los mensajes de errores
 */
function eliminarErrores() {
    const error = document.querySelector('p.error');
    if(error) {
        error.remove();
    } 
}

/**
 * Envia el email
 */
function enviarEmail(e) {

    // Prevenimos el comportamiento por defecto
    e.preventDefault();

    // Mostrando un spinner mientras se envia el email, https://tobiasahlin.com/spinkit/
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Ocultamos el spinner al pasar 3 segundos y mostramos un mensaje
    setTimeout( () => {
        spinner.style.display = 'none';

        // Mensaje
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envío completamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        // Insertamos el mensaje antes del elemento
        formulario.insertBefore(parrafo, spinner);

        // Después de 5 segundos queremos eliminar el parrafo y reiniciar el formulario
        setTimeout( () => {
            parrafo.remove();
            resetearFormulario();
        }, 5000 );

    }, 3000 );
    
}

/**
 * Reseta el formulario
 */
function resetearFormulario() {
    formulario.reset();

    iniciarApp();
}