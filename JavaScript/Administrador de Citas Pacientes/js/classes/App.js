import { datosCita, nuevaCita } from '../funciones.js';
import { 
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario 
} from '../selectores.js';

class App {

    constructor() {
        this.initApp();
        this.crearDB();
    }

    initApp() {
        mascotaInput.addEventListener('input', datosCita);
        propietarioInput.addEventListener('input', datosCita);
        telefonoInput.addEventListener('input', datosCita);
        fechaInput.addEventListener('input', datosCita);
        horaInput.addEventListener('input', datosCita);
        sintomasInput.addEventListener('input', datosCita);

        // Formulario para nuevas citas
        formulario.addEventListener('submit', nuevaCita);
    }

    crearDB() {

        // Crear BD en versión 1.0
        const crearDB = window.indexedDB.open('citas', 1);

        // Si hay un error
        crearDB.onerror = function() {
            console.log('Hubo un error');
        }

        // Si todo esta OK
        crearDB.onsuccess = function() {
            console.log('DB creada');

            const DB = crearDB.result;

            console.log(DB);
        }

        // Definir el Schema
        crearDB.onupgradeneeded = function(e) {
            const db = e.target.result;

            const objectStore = db.createObjectStore('citas', {
                keyPath: 'id',
                autoIncrement: true
            });

            // Definir todas las columnas
            objectStore.createIndex('mascota', 'mascota', { unique: false });
            objectStore.createIndex('propietario', 'propietario', { unique: false });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('fecha', 'fecha', { unique: false });
            objectStore.createIndex('hora', 'hora', { unique: false });
            objectStore.createIndex('sintomas', 'sintomas', { unique: false });
            objectStore.createIndex('id', 'id', { unique: true });

            console.log('DB creada y lista');
        }
    }
}

// Exportar la clase
export default App;