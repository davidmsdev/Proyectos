// Constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

/**
 * Realiza el cálcula del seguro y retorna la cantidad a pagar
 */
Seguro.prototype.cotizarSeguro = function() {

    /*
        1 = Americano -> aumento el precio 1.15
        2 = Asiatico -> aumento de 1.05
        3 = Europeo -> 1.35
    */

    let cantidad = 0;
    const base = 2000;
    const   americano = 1.15,
            asiatico = 1.05,
            europeo = 1.35;

    switch(this.marca) {
        case '1':
            cantidad = base * americano;
            break;
        case '2':
            cantidad = base * asiatico;
            break;
        case '3':
            cantidad = base * europeo;
            break;
        default:
            break;
    }

    // Reducimos el precio en funcion del año, se reduce un 3% por cada año
    const anyoActual = new Date().getFullYear();
    const diferencia = anyoActual - this.year;

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
        Si el seguro es básico se incrementa un 30%
        Si el seguro es completo se incrementa un 50%
    */

    const basico = 1.3;
    const completo = 1.5

    if(this.tipo === 'basico') {
        cantidad *= basico;
    } else {
        cantidad *= completo;
    }

    return cantidad;
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

    // Instanciar el seguro con los datos del formulario
    const seguro = new Seguro(marca, year, tipo);
    seguro.cotizarSeguro();

    // Utilizar el prototype que cotizará
    
}
