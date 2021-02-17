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