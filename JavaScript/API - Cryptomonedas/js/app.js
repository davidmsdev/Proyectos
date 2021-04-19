const criptosSelect = document.querySelector('#criptomonedas');

// Crear un Promise
const obtenerCryptos = criptos => new Promise(resolve => {
    resolve(criptos)
});

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptos();
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