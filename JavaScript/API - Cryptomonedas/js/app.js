const criptosSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const monedaSelect = document.querySelector('#moneda');
const resultado = document.querySelector('#resultado');

// Objeto de busqueda, ponemos los names de los campos select como claves para poder igualarlos
const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

// Crear un Promise
const obtenerCryptos = criptos => new Promise(resolve => {
    resolve(criptos)
});

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptos();

    formulario.addEventListener('submit', submitFormulario);

    criptosSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
})

function consultarCriptos() {

    // Obtenemos las 20 principales cryptomonedas
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCryptos(resultado.Data))
        .then(criptos => selectCryptos(criptos))
}

function selectCryptos(criptos) {
    criptos.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptosSelect.appendChild(option);
    })
}

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
    e.preventDefault();
    
    // Validar
    const { moneda, criptomoneda } = objBusqueda;

    if(moneda === '' || criptomoneda === '') {
        mostrarAlerta('Ambos campos con obligatorios');
        return;
    }

    consultarAPI();
}

function mostrarAlerta(msg) {

    const existeError = document.querySelector('.error');

    if(!existeError) {
        const divMensaje = document.createElement('div');

        divMensaje.classList.add('error');
        divMensaje.textContent = msg;

        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}

function consultarAPI() {

    const { moneda, criptomoneda } = objBusqueda;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( cotizacion => {
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
        })
}

function mostrarCotizacionHTML(cotizacion) {

    limpiarHTML();
    
    // Extraemos los datos que queremos 
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El Precio es: <span>${PRICE}</span>`;

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `El Precio más alto ha sido: <span>${HIGHDAY}</span>`;

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `El Precio más bajo ha sido: <span>${LOWDAY}</span>`;

    const ultimasHoras = document.createElement('p');
    ultimasHoras.innerHTML = `Variacion últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span>`;

    const ultimaActualizacion = document.createElement('p');
    ultimaActualizacion.innerHTML = `Ultima actualización: <span>${LASTUPDATE}</span>`;

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(ultimaActualizacion);
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}