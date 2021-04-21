const criptosSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const monedaSelect = document.querySelector('#moneda');

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
}

function mostrarAlerta(msg) {
    console.log(msg);
}