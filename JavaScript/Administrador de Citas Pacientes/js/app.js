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