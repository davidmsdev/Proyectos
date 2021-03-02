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

let editando;

class Citas {

    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];

        console.log(this.citas);
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
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

            // Botón para eliminar la cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            
            btnEliminar.onclick = () => eliminarCita(id);

            // Botón para editar la cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info', 'mr-2');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = () => cargarEdicion(cita);

            // Agregar los párrafos al div
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

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
        return;
    }

    if(editando) {

        // Mensaje de agregado correctamente
        ui.imprimirAlerta('Editada correctamente');

        // Pasar el objeto de la dita a edición

        // Cambiar el texto del botón
        formulario.querySelector('button[type="submit]').textContent = 'Crear Cita';

        editando = false;

    } else {
        // Generar ID único
        citaObj.id = Date.now();

        // Le pasamo una copia del objeto, para que no se sobrescriba siempre la misma cita, si no lo hacemos siempre almacena la misma cita
        // Le pasamos una copia sin la referencia del objeto global
        administarCitas.agregarCita({...citaObj});

        // Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agregó la cita correctamente');
    }

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

function eliminarCita(id) {
    
    // Eliminar la cita
    administarCitas.eliminarCita(id);

    // Mostrar un mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    // Refrescar las citas
    ui.imprimirCitas(administarCitas);
}

function cargarEdicion(cita) {

    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenar los inputs con los valores de la cita que queremos editar
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambiar el texto del botón
    formulario.querySelector('button[type="submit]').textContent = 'Guardar Cambios';

    editando = true;
}