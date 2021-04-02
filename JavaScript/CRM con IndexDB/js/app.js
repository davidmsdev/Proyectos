(function(){

    let DB;

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();
    });

    // Crea la base de datos
    function crearDB() {

        // Abrimos una conexión con indexDB y creamos la BD
        const crearDB = window.indexedDB.open('crm', 1);

        // Mostramos un error en caso de que la BD no se haya creado
        crearDB.onerror = function() {
            console.log('Hubo un error');
        };

        // Si la DB se crea correctamente la asignamos a la variable
        crearDB.onsuccess = function() {
            DB = crearDB.result;
        };

        // Creamos las tablas, este código solo se ejecuta una vez
        crearDB.onupgradeneeded = function(e) {
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true});

            // Creamos la columnas
            objectStore.createIndex('nombre', 'nombre', { unique: false});
            objectStore.createIndex('email', 'email', { unique: true});
            objectStore.createIndex('telefono', 'telefono', { unique: false});
            objectStore.createIndex('empresa', 'empresa', { unique: false});
            objectStore.createIndex('id', 'id', { unique: true});

            // Mostramos mensaje de que todo ha ido OK
            console.log('DB lista y creada');
        }
    }
})();