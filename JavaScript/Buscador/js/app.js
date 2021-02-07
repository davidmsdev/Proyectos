// Variables
const selectMarca = document.querySelector('#marca');
const selectYear = document.querySelector('#year');
const selectMinimo = document.querySelector('#minimo');
const selectMaximo = document.querySelector('#maximo');
const selectPuertas = document.querySelector('#puertas');
const selectTransimison = document.querySelector('#transmision');
const selectColor = document.querySelector('#color');

// Array con los selectores
const selectArray = [
    selectMarca,
    selectYear,
    selectMinimo,
    selectMaximo,
    selectPuertas,
    selectTransimison,
    selectColor
];

console.log(selectArray);
console.log('Lo que hay en select marca' + selectMarca);

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

// Los años van desde el actual y 10 hacia atrás
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

// Generar objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

console.log('app.js');

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    
    console.log('eventos');

    // Muestras los autos al cargar
    mostrarAutos();

    // Llena el select de años con los años disponibles
    llenarSelect();

});

// // Creamos un evento para cada uno de los selects para guardar los datos
// selectArray.forEach( select => {
//     console.log('Esto es lo que hay en select' + select.id);
//     select.addEventListener('change', (e) => {
//         let id = select.id
//         datosBusqueda.id = e.target.value;
    
//         console.log(datosBusqueda);
//     });
// });

// Eventos para los select
selectMarca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

selectYear.addEventListener('change', (e) => {
    datosBusqueda.year = e.target.value;
    filtrarAuto();
});

selectMinimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});

selectMaximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});

selectPuertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
});

selectTransimison.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

selectColor.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
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

/**
 * Filtra los autos
 */
function filtrarAuto() {

    // Usamos fucnioens de alto nivel, filter llama a otra función a la cual se le pasa el auto
    const resultado = autos.filter( filtrarMarca )

    console.log(resultado);
}

/**
 * Filtra por marca
 */
function filtrarMarca(auto) {

    const { marca } = datosBusqueda;
    if(marca) {
        return auto.marca === marca;
    } else {
        return auto;
    }
}