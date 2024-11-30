import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// Función para obtener el token de autenticación
const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        const userToken = prompt("Por favor ingrese su token de autenticación:");
        if (userToken) {
            localStorage.setItem('token', userToken);
            return userToken;
        } else {
            return null;
        }
    }
    return token;
};

// Función para obtener todos los usuarios
export const getUsuarios = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/usuarios`);
        return response;
    } catch (error) {
        throw error;
    }
};

// Función para crear un nuevo usuario
export const createUsuario = async (data) => {
    try {
        const token = getToken();
        if (!token) return;
        const response = await axios.post(`${BASE_URL}/signup`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Función para obtener un usuario por ID
export const getUsuarioById = async (id) => {
    try {
        const token = getToken();
        const response = await axios.get(`${BASE_URL}/usuarios/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
};

// Función para actualizar un usuario existente
export const updateUsuario = async (id, usuarioData) => {
    try {
        const token = getToken();
        if (!token) return;
        const response = await axios.put(`${BASE_URL}/usuarios/${id}`, usuarioData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Función para eliminar un usuario
export const deleteUsuario = async (id) => {
    try {
        const token = getToken();
        if (!token) return;
        const response = await axios.delete(`${BASE_URL}/usuarios/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        await axios.post(`${BASE_URL}/logout`);
        localStorage.removeItem('token');
        window.location.href = '/login';
    } catch (error) {
        console.error("Error durante el logout:", error);
    }
};

export const resetPassword = async (id, currentPassword, newPassword) => {
    try {
        const token = getToken(); // Obtenemos el token
        if (!token) return;

        const response = await axios.post(`${BASE_URL}/usuarios/${id}/reset-password`, {
            currentPassword,
            newPassword,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        // Manejo de errores
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Error en la solicitud');
        }
        throw new Error('Error al conectar con el servidor');
    }
};
