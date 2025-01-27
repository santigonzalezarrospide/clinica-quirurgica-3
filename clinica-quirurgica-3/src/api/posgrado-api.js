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
export const getMaterialesPosgrado = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/materialPosgrado`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Función para crear un nuevo material
export const createMaterialPosgrado = async (data) => {
  try {
    const token = getToken();
    if (!token) return;
    const response = await axios.post(`${BASE_URL}/materialPosgrado`, data, {
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
export const updateMaterialPosgrado = async (id, materialData) => {
  try {
    const token = getToken();
    if (!token) return;
    const response = await axios.put(`${BASE_URL}/materialPosgrado/${id}`, materialData, {
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
export const deleteMaterialPosgrado = async (id) => {
  try {
    const token = getToken();
    if (!token) return;
    const response = await axios.delete(`${BASE_URL}/materialPosgrado/${id}`, {
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
export const getMaterialByIdPosgrado = async (id) => {
  try {
    const token = getToken();
    if (!token) return;

    const response = await axios.get(`${BASE_URL}/materialPosgrado/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};