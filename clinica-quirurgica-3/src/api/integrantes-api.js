import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const getIntegrantes = async () => {
    try {
        let response = await axios.get(`${BASE_URL}/integrantes`);
        console.log('Integrantes:', response.data);
        return response;
    } catch (error) {
        console.error("Error fetching integrantes:", error);
        throw error;
    }
};

export const createIntegrante = async (data) => {
    try {
        const token = localStorage.getItem('token');
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

export const updateIntegrante = async (id, integranteData) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.put(`${BASE_URL}/integrantes/${id}`, integranteData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
      console.log('Integrante updated:', response.data); // Optional: Log the updated data
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Error updating integrante:', error);
      throw error; // Re-throw the error for handling in the component
    }
  };