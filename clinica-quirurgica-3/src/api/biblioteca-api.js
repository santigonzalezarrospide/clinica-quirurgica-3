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

// Función para obtener toda la biblioteca
export const getBiblioteca = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/biblioteca`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Función para crear un nuevo libro
export const createLibro = async (data) => {
  try {
    const token = getToken();
    if (!token) return;
    const response = await axios.post(`${BASE_URL}/biblioteca`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para actualizar un libro existente
export const updateLibro = async (id, libroData) => {
  try {
    const token = getToken();
    if (!token) return;
    const response = await axios.put(`${BASE_URL}/biblioteca/${id}`, libroData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para eliminar un libro
export const deleteLibro = async (id) => {
  try {
    const token = getToken();
    if (!token) return;
    const response = await axios.delete(`${BASE_URL}/biblioteca/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener un libro por su ID
export const getLibroById = async (id) => {
  try {
    const token = getToken();
    if (!token) return;

    const response = await axios.get(`${BASE_URL}/biblioteca/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};