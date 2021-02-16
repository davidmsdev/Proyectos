// Variables
const formulaio = document.querySelector('#id');
const listaTweets = document.querySelector('#lista-tweets');
let = tweets = [];


// Event listener
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo, obtenemos los tweets que hay en localstorage
    document.addEventListener('DOMContentLoaded', () => {
        // Si hay tweets en local storage se lo asignamos a la variable, sino, le asignamos un array vacío
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);

        crearHTML();
    });
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

            // Agregar boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.tweet;

            // Asignar el botón
            li.appendChild(btnEliminar);

            // Agregar el listado al HTML
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

/**
 * Elimina el HTML
 */
function eliminarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

/**
 * Almacena los tweets en local storage
 */
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

/**
 * Elimina un tweet
 */
function borrarTweet(id) {
    // console.log('borrando... ', id);
    // Creamos una copia del array de tweets con todos aquellos que no tienen el ID que le pasamos
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}