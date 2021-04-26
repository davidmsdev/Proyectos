import { getClients, deleteClient } from './API.js';

(function() {

    const list = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', showClients);

    list.addEventListener('click', deleteConfirm);

    async function showClients() {
        const clients = await getClients();

        clients.forEach(client => {
            const { name, email, phone, bussines, id } = client;

            const row = document.createElement('tr');

            row.innerHTML += `
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${name} </p>
                    <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                    <p class="text-gray-700">${phone}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                    <p class="text-gray-600">${bussines}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                </td>
            `;

            list.appendChild(row);
        });
    }

    function deleteConfirm(e) {
        // Usamos delegation para comprobar si el elemento que hemos clicado tiene la clase eliminar
        if(e.target.classList.contains('eliminar')) {
            const clientID = parseInt(e.target.dataset.cliente);

            const confirmDelete = confirm('Deseas elimnar este registro?');

            if(confirmDelete) {
                deleteClient(clientID);
            }
        }
    }

})();