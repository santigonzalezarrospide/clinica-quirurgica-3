import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const userLogin = async (usuario) => {
    try {
        let response = await axios.post(`${BASE_URL}/api/singin`, usuario);
        console.log('Inicio de sesión exitoso');
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
};
