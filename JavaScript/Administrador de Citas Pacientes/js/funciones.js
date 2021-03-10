// Instanciamos las clases
const ui = new UI();
const administarCitas = new Citas();

let editando = false;

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
 export function datosCita(e) {
    // El atributo HTML name de los campos tienen el mismo nombre que la propiedad del objeto por lo que podemos
    // asignarle en tiempo real lo que el usuario esta escribiendo a nuestro objeto
    citaObj[e.target.name] = e.target.value;
}

/**
 * Crea una nueva cita
 */
 export function nuevaCita(e) {

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
        administarCitas.editarCita({...citaObj});

        // Cambiar el texto del botón
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

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
 export function reinicarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    
    // Eliminar la cita
    administarCitas.eliminarCita(id);

    // Mostrar un mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    // Refrescar las citas
    ui.imprimirCitas(administarCitas);
}

export function cargarEdicion(cita) {

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
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}

