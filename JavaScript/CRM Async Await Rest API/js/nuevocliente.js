import { showAlert } from './funciones.js';
import { newClient } from './API.js';

// Protegemos las varaibles para que sean locales
(function() {
    const form = document.querySelector('#formulario');
    formulario.addEventListener('submit', validateClient);

    function validateClient(e) {
        e.preventDefault();
        
        const name = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const phone = document.querySelector('#telefono').value;
        const bussines = document.querySelector('#empresa').value;

        const client = {
            name,
            email,
            phone,
            bussines,
        };

        if(validate(client)) {
            showAlert('Todos los campos son obligatorios');
            return;
        }

        // Si pasamos la validación
        newClient(client);
        
    }

    function validate(obj) {
        // Comporbamos por cada atributo del objeto si almenos hay un input vacio, retornamos True o False
        return !Object.values(obj).every( input => input !== '');
    }


})();