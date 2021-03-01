// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// user Interface
const formulario = document.querySelector('#nueva-cita');
const contenderoCitas = document.querySelector('#citas');

class Citas {

    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];

        console.log(this.citas);
    }
}

class UI {

    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        if(tipo === 'Error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar alerta
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    // Aplicamos destructurin para obtener las citas del objeto
    imprimirCitas({citas}) {
        
        this.limpiarHTML();
        
        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario:</span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono:</span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha:</span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora:</span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
            `;

            // Agregar los párrafos al div
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

            // Agregar las citas al HTML
            contenderoCitas.appendChild(divCita);
        });
    }

    limpiarHTML() {
        while(contenderoCitas.firstChild) {
            contenderoCitas.removeChild(contenderoCitas.firstChild);
        }
    }
}

// Instanciamos las clases
const ui = new UI();
const administarCitas = new Citas();

eventListeners();

/**
 * Registra los eventos
 */
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

// Objeto de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

/**
 * Agrega datos al objeto cita
 * @param {} e 
 */
function datosCita(e) {
    // El atributo HTML name de los campos tienen el mismo nombre que la propiedad del objeto por lo que podemos
    // asignarle en tiempo real lo que el usuario esta escribiendo a nuestro objeto
    citaObj[e.target.name] = e.target.value;
}

/**
 * Crea una nueva cita
 */
function nuevaCita(e) {

    e.preventDefault();
    
    // Extraer la info del objeto cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'Error');
    }

    // Generar ID único
    citaObj.id = Date.now();

    // Le pasamo una copia del objeto, para que no se sobrescriba siempre la misma cita, si no lo hacemos siempre almacena la misma cita
    // Le pasamos una copia sin la referencia del objeto global
    administarCitas.agregarCita({...citaObj});

    reinicarObjeto();

    formulario.reset();

    // Mostrar en el HTML las citas
    ui.imprimirCitas(administarCitas);
}

/**
 * Borra todos los campos del objeto de citas
 */
function reinicarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}