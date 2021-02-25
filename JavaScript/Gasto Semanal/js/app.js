// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
let presupuesto;



// Eventos
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}


// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        // Agregamos el nuevo gasto despues de hacer una copia del actual
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante() {
        // Itera sobre todos los valores del array y los va sumando, inica en 0
        const dineroGastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0 );
        this.restante = this.presupuesto - dineroGastado;
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        console.log(this.gastos);
        this.calcularRestante();
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        // Extraer valores
        const { presupuesto, restante } = cantidad;

        // Insertar en HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mesnaje de error
        divMensaje.textContent = mensaje;

        // Insertar en HTML
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // Quitar HTML
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarGastos(gastos) {
        
        this.limpiarHTML();

        // Iterar sobre los gastos
        gastos.forEach( gasto => {
            
            const { cantidad, nombre, id } = gasto;

            // Crear un li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id; // Agrega el atributo data-id
            console.log(nuevoGasto);

            // Agregar HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> ${cantidad}€</span>`;

            // Botón para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times;';
            
            // Cuando clicamos borramos el elemento
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }

            nuevoGasto.appendChild(btnBorrar);

            // Inerta el HTML
            gastoListado.appendChild(nuevoGasto);
        })
    }

    limpiarHTML() {
        // Iteramos mientras gastoListado tenga elementos HTML y los va borrando
        while(gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    // Imprimer por pantalla el restante actualizado
    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }


    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj;

        const restanteDiv = document.querySelector('.restante');

        // Comprobar 75%
        if((presupuesto / 4) > restante ) {
            // Hemos gastado más del 75%
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        } else if ((presupuesto / 2 ) > restante) {
            // Hemos gastado más del 50%
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        } else {
            restanteDiv.classList.remove('alert-danger', 'alert-warning'); 
            restanteDiv.classList.add('alert-success');
        }

        // Si el total es 0 o menor
        if(restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');

            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
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

    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
    e.preventDefault();
    
    // Leer datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    // Validar
    if(nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no válida', 'error');
        return;
    }

    // Generar objeto Gasto
    const gasto = { nombre, cantidad, id: Date.now() } // Contrario al destructuring

    // Añade un nuevo gasto al presupuesto
    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta('Gasto agregado');

    // Imprimir los gastos y el restante, los extraemos de presupuesto
    const { gastos, restante } = presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);

    // Comrpobamos el presupuesto
    ui.comprobarPresupuesto(presupuesto);

    formulario.reset();
}

function eliminarGasto(id) {
    presupuesto.eliminarGasto(id);
    const { gastos, restante } = presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}