// Variables
const formulaio = document.querySelector('#id');
const listaTweets = document.querySelector('#lista-tweets');
let = tweets = [];


// Event listener
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
}

// Funciones

/**
 * Obtiene el valor de un tweet y lo agrega
 * @param {} e 
 */
function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación
    if(tweet === '') {
        mostrarError('No puede ir vacio');
        return; // Evita que se ejecuten más lineas de código
    }

    // Creamos un objeto de tweet para almacenar cuando se publicó
    const tweetObj = {
        id: Date.now(),
        tweet // Es lo mismo que poner tweet: tweet
    }

    // Añadir al array de tweets
    tweets = [...tweets, tweetObj];

    // Crear html
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();

}

/**
 * Muestra un mensaje de error y lo borra pasados 3 segundos
 * @param {*} error 
 */
function mostrarError(error) {

    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Pasado tres segundo se elimina el mensaje
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

/**
 * Crea el listado de tweets en el div de lista tweets
 */
function crearHTML() {

    // Limpiamos el HTML
    eliminarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {

            const li = document.createElement('li');
            li.innerText = tweet.tweet;

            // Agregar el listado al HTML
            listaTweets.appendChild(li);
        })
    }
}

/**
 * Elimina el HTML
 */
function eliminarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}