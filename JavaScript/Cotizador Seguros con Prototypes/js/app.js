// Constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UserInterface() {}

// Rellenar las opciones del campo de años a través de un prototype
UserInterface.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max - 20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// Instanciamos userInterface
const ui = new UserInterface();
console.log(ui);


document.addEventListener('DOMContentLoaded', () => {

    // Una vez esta cargado el documento llenamos las opciones del select
    ui.llenarOpciones();
})

eventListeners();

function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    // Leer marca
    const marca = document.querySelector('#marca').value;

    // Leer año seleccionado
    const year = document.querySelector('#year').value;

    // Leer tipo de cobertura, a partir del input que este checkado
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    // Comprobamos si hay campos vacíos
    if(marca === '' || year === '' || tipo === '') {

    } else {
        
    }

    console.log('Cotizando...');
    
}
