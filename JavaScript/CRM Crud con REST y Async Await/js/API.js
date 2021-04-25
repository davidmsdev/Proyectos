const url = 'http://localhost:4000/clientes';

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