// Variables
const resultado = document.querySelector('#resultado');
const selectYear = document.querySelector('#year');

// Los años van desde el actual y 10 hacia atrás
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

console.log('app.js');

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    
    console.log('eventos');

    // Muestras los autos al cargar
    mostrarAutos();

    // Llena el select de años con los años disponibles
    llenarSelect();


});

/**
 * Muestra todos los coches
 */
function mostrarAutos() {

    // Recorremos todos los autos para mostrarlos
    autos.forEach( auto => {

        // Obtenemos los datos con destructuring
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            ${marca} - ${modelo} -${year} -${puertas} puertas - Transmisión: ${transmision} - Precio: 
            ${precio} - Color: ${color}
        `;

        // Insertar el auto en el HTML
        resultado.appendChild(autoHTML);
    });
}

/**
 * Llena los años del select
 */
function llenarSelect() {

    for( let i = maxYear; i >= minYear; i-- ) {
        
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        selectYear.appendChild(opcion);
    }
}