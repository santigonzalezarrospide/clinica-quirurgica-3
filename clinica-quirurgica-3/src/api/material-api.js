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

// Función para obtener todos los materiales
export const getMateriales = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/materiales`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Función para crear un nuevo material
export const createMaterial = async (data) => {
  try {
    const token = getToken();
    if (!token) return;
    const response = await axios.post(`${BASE_URL}/materiales`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para actualizar un material existente
export const updateMaterial = async (id, materialData) => {
  try {
    const token = getToken();
    if (!token) return;
    const response = await axios.put(`${BASE_URL}/materiales/${id}`, materialData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para eliminar un material
export const deleteMaterial = async (id) => {
  try {
    const token = getToken();
    if (!token) return;
    const response = await axios.delete(`${BASE_URL}/materiales/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener un material por su ID
export const getMaterialById = async (id) => {
  try {
    const token = getToken();
    if (!token) return;

    const response = await axios.get(`${BASE_URL}/materiales/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};