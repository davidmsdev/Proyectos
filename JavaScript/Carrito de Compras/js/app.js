// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

cargarEventListeners();

function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
}

// Funciones
function agregarCurso(e) {

    // Prevenir que al clicar se mueva la página hasta el inicio
    e.preventDefault();
    
    // Evitamos que se dispare el evento si se clica en todo el div, solo queremos en el botón
    if( e.target.classList.contains('agregar-carrito') ) {
        console.log('Agregando al carrito');
    }
    
}