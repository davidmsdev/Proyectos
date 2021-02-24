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

    agregarGastoListado(gastos) {
        
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
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> ${cantidad}</span>`;

            // Botón para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times;';
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

    // Imprimir los gastos, los extraemos de presupuesto
    const { gastos } = presupuesto;
    ui.agregarGastoListado(gastos);

    formulario.reset();
}