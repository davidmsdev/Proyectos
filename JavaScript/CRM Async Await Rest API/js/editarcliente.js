import { getClient } from './API.js';

(function() {

    // Campos del formulario
    const nameInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const phoneInput = document.querySelector('#telefono');
    const bussinesInput = document.querySelector('#empresa');
    const idInput = document.querySelector('#id');

    document.addEventListener('DOMContentLoaded', async () => {
        // Obtenemos los parámteros de la URL para saber que registro tenemos que editar
        const URLparams = new URLSearchParams(window.location.search);

        // Obtenemos el ID de los parámetros y lo transformamos a INT
        const clientID = parseInt(URLparams.get('id'));

        const client = await getClient(clientID);

        showClient(client);
    });

    function showClient(client) {
        const { name, bussines, email, phone, id } = client;

        // Rellenmos los campos del formulario con los valores actuales del registro
        nameInput.value = name;
        emailInput.value = email;
        phoneInput.value = phone;
        bussinesInput.value = bussines;
        idInput.value = id;
    }

})();