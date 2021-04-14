(function(){

    let DB;
    const listadoClientes = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();

        if(window.indexedDB.open('crm', 1)) {
            obtenerClientes();
        }

        listadoClientes.addEventListener('click', eliminarRegistro);
    });

    function eliminarRegistro(e) {
        if(e.target.classList.contains('eliminar')) {
            const idEliminar = Number(e.target.dataset.cliente);

            const confirmar = confirm('Deseas elminar el cliente?');

            if(confirmar) {
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idEliminar);

                transaction.oncomplete = function() {
                    // Navegamos hasta el TR que contiene el cliente para eliminarlo
                    e.target.parentElement.parentElement.remove();
                }

                transaction.onerror = function() {
                    console.log('Hubo un error');
                }
            }

            console.log(idEliminar);
        }
    }

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

    function obtenerClientes() {
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function() {
            console.log('hubo un error');
        }

        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');

            objectStore.openCursor().onsuccess = function(e) {
                const cursor = e.target.result;

                if(cursor) {
                    const { nombre, empresa, email, telefono, id } = cursor.value;

                    const listadoClientes = document.querySelector('#listado-clientes');
                    listadoClientes.innerHTML += ` <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700">${telefono}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                <p class="text-gray-600">${empresa}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                            </td>
                        </tr>
                    `;

                    cursor.continue();
                } else {
                    console.log('No hay más registros...');
                }
            }
        }
    }
})();