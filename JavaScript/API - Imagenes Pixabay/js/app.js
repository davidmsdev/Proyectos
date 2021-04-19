const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');

const registroPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();
    
    const terminoBusqueda = document.querySelector('#termino').value;

    if(terminoBusqueda === '') {
        mostrarAlerta('Agrega un término de búsqueda');
        return;
    }

    buscarImagenes();
}

function buscarImagenes() {

    const termino = document.querySelector('#termino').value;
    console.log(termino);

    const key = '21209552-4c9217a3fdc7952a196683822';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPorPagina}&page=${paginaActual}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits);
            console.log(totalPaginas);
            mostrarImagenes(resultado.hits);
        });
}

// Generador que registra la cantidad de elementos de acuerdo a las páginas
function *crearPaginador(total) {
    for(let i = 1; i <= total; i++) {
        // Registramos los valores
        yield i;
    }
}

function calcularPaginas(total) {
    return parseInt(Math.ceil(total / registroPorPagina));
}

function mostrarImagenes(imagenes) {
    
    while(resultado.firstChild) {
        // Eliminamos cada primer elemento hasta que no quede nnguno
        resultado.removeChild(resultado.firstChild);
    }

    // Accedemos a cada imágen
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}">

                    <div class="p-4">
                    <p class="font-bold"> ${likes}<span class="font-light"> Me Gusta</span></p>
                    <p class="font-bold"> ${views}<span class="font-light"> Veces vista</span></p>

                    <a 
                        class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                        href="${largeImageURL}" target="_blank" rel="noopener noreferrer"
                    > 
                        Ver imagen 
                    </a>
                </div>
                </div>
            </div>   
        `;
    });

    // Limpiar paginador previo
    while(paginacionDiv.firstChild) {
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }

    imprimirPaginador();
}

function imprimirPaginador() {
    iterador = crearPaginador(totalPaginas);
    
    while(true) {
        const { value, done } = iterador.next();
        if(done) return;

        // Creamos un botón para cada página
        const boton = document.createElement('a');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded');

        boton.onclick = () => {
            paginaActual = value;

            // Cuando demos click lo que hacemos es volver a llamar a la API pero con la página que queremos
            // paginaActual se iguala al value del botón, es decir si clicamos en el 3 paginaActual será 3,
            // por lo que la llamada a la API será a la página 3
            buscarImagenes();
        }

        paginacionDiv.appendChild(boton);
    }
}


function mostrarAlerta(mensaje) {

    const existeAlerta = document.querySelector('.bg-red-100');

    if(!existeAlerta) {
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
        'max-w-lg', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `

        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}