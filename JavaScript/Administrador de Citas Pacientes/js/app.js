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
        }, 5000)
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
    citaObj[e.target.name] = e.target.value;;

    console.log(citaObj);
}

function nuevaCita(e) {

    e.preventDefault();
    
    // Extraer la info del objeto cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'Error');
    }
}