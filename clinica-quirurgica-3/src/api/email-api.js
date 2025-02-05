import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

/**
 * Envía los datos del formulario al backend para enviar un correo electrónico.
 * @param {Object} formData - Los datos del formulario.
 * @returns {Promise} - La respuesta del servidor.
 */
export const sendEmail = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/send-email`, formData);
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};
