// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
let presupuesto;



// Eventos
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}


// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI {

}

// Instanciar UI
const ui = new UI();


// Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('Cual es tu presupuesto: ');

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    // Instanciomos presupuesto
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);
}