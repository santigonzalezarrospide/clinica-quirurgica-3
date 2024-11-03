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


// Función para obtener todos los integrantes
export const getIntegrantes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/integrantes`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Función para crear un nuevo integrante
export const createIntegrante = async (data) => {
  try {
    const token = getToken();
    if (!token) return;
    const response = await axios.post(`${BASE_URL}/integrantes`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para actualizar un integrante existente
export const updateIntegrante = async (id, integranteData) => {
  try {
    const token = getToken();
    if (!token) return;
    const response = await axios.put(`${BASE_URL}/integrantes/${id}`, integranteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para eliminar un integrante
export const deleteIntegrante = async (id) => {
  try {
    const token = getToken();
    if (!token) return; 
    const response = await axios.delete(`${BASE_URL}/integrantes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};
