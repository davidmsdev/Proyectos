const url = 'http://localhost:4000/clientes';

// Cuando se crea un nuevo cliente
export const newClient = async client => {
    try {
        await fetch(url, {
            method: 'POST',
            // Se envia como String o como OBJ
            body: JSON.stringify(client), // Convertimos a STRING
            // Información sobre que tipo de datos enviamos
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Redireccionamos a index
        window.location.href = 'index.html';

    } catch (error) {
        
    }
};

// Obtener todos los clientes https://github.com/typicode/json-server
export const getClients = async () => {
    try {
        // Por defecto FETCH envia petición GET
        const result = await fetch(url);
        const clients = await result.json();
        return clients;

    } catch (error) {
        console.log(error);
    }
}

// Elimina un cliente, tenemos que pasar la url DELETE /posts/1 https://github.com/typicode/json-server
export const deleteClient = async id => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
}

// Obtener un cliente a partir de su ID https://github.com/typicode/json-server
export const getClient = async id => {
    try {
        const result = await fetch(`${url}/${id}`);
        const client = await result.json();
        return client;

    } catch (error) {
        console.log(error);
    }
}