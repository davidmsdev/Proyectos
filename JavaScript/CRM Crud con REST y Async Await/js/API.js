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

// Obtener todos los clientes
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