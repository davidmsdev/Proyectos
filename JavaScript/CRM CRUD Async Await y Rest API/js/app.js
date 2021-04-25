import { getClients} from './API.js';

(function() {

    const list = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', showClients);

    async function showClients() {
        const clients = await getClients();

        console.log(clients);
    }

})();