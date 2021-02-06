// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

/**
 * Carga todos los eventos
 */
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
}

/**
 * Agrega un curso al carrito
 * @param {*} e 
 */
function agregarCurso(e) {

    // Prevenir que al clicar se mueva la página hasta el inicio
    e.preventDefault();
    
    // Evitamos que se dispare el evento si se clica en todo el div, solo queremos en el botón
    if( e.target.classList.contains('agregar-carrito') ) {

        // Tenemso seleccionado el boton, pero los elementos estan más arriba, por lo que seleccionamos el padre del boton
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

/**
 * Lee el contenido del HTML al que le damos click y extrae la info del curso
 * @param {*} curso Elemento CARD que contiene toda la info del curso
 */
function leerDatosCurso(curso) {

    // Crear un obeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si el elemento ya existe en el carrito a partir de su ID
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        // Actualizamos el carrito
        const cursos = articulosCarrito.map( curso => {
            // Iteramos por cada elemento del carrito y si este curso existe actualizamos la cantidad
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                // Retorna el objeto actualizado
                return curso;
            } else {
                // Retorna los objetos que no son los duplicados
                return curso;
            }
        });

        articulosCarrito = [...cursos];
        
    } else {
        // Agrega los elementos al array del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    // Llamamos a la función que crea el HTML
    carritoHTML();
    
}

/**
 * Crea el HTML del carrito
 */
function carritoHTML() {
    
    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {

        // Obtenemos los datos con destructuring
        const {imagen, titulo, precio, cantidad, id } = curso;

        // Creamos una fila en la tabla por cada curso del carrito
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data_id="${id}"> X </a></td>
        `;

        // Agrega el HTML del carrito en el TBDOY
        contenedorCarrito.appendChild(row);
    });

}

/**
 * Limpia el HTML del carrito para evitar la duplicación de elementos
 */
function limpiarHTML() {
    
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    // Forma correcta, elimina a cada vuelta el primer hijo del html creado
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}