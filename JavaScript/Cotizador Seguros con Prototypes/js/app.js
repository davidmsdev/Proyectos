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

// Prototype que muestra un mensaje de error
UserInterface.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');

    if(tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    // Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    // Después de 3 segundos eliminamos el div
    setTimeout(() => {
        div.remove();
    }, 3000);

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
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando', 'exito');

    // Instanciar el seguro

    // Utilizar el prototype que cotizará
    
}
