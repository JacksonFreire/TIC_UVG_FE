// src/services/api.ts
import axios from 'axios';
//const API_URL = 'http://localhost:8080';
const API_URL = 'https://uvg-sys-be-hehseyfff5cycta9.eastus-01.azurewebsites.net';
export default {
    register(userData) {
        return axios.post(`${API_URL}/api/users/register`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getUser(id) {
        return axios.get(`${API_URL}/api/users/verify/${id}`);
    },
};
