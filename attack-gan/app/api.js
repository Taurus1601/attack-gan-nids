import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Replace with your Flask backend URL

export const GenerateAttack = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/attackGan`);
        return response.data;
    } catch (error) {
        console.error('Error calling joblib prediction API:', error);
        throw error;
    }
};

// export const predictWithH5 = async (features) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/predict_h5`, { features });
//         return response.data;
//     } catch (error) {
//         console.error('Error calling TensorFlow prediction API:', error);
//         throw error;
//     }
// };