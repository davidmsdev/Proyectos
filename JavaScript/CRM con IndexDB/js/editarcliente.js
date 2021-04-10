(function() {

    let DB;

    const nombreInput = document.querySelector('#nombre');

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        // Verficiar el ID de la URL, window.location.search -> devuelve todo el contenido de la URL sin el dominio, es decir
        // lo que tenemos despues del .html
        const parametrosUrl = new URLSearchParams(window.location.search);

        const idCliente = parametrosUrl.get('id');

        if(idCliente) {
            // Retardamos un poco la consulta para que de tiempo a cargarse la BD
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 200);   
        }

    });

    function obtenerCliente(id) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        

        const cliente = objectStore.openCursor();

        cliente.onsuccess = function(e) {
            const cursor = e.target.result;

            if(cursor) {
                
                // Leemos el ID desde la URL
                if(cursor.value.id === Number(id)) {
                    llenarFormulario(cursor.value);
                }

                cursor.continue();
            }
        }

        console.log(objectStore);
    }

    function llenarFormulario(datosCliente) {
        const { nombre } = datosCliente;

        nombreInput.value = nombre;
    }

    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function() {
            console.log("Hubo un error");
        };

        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;
        }
    }

})();