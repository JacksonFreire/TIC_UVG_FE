import axios, { AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_APP_BASE_URL_API;
console.log('API URL:', API_URL);

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  birthDate: string;
  document: string;
  verified: boolean;
}

export default {
  register(userData: FormData): Promise<AxiosResponse<User>> {
    return axios.post(`${API_URL}/api/users/register`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getUser(id: string): Promise<AxiosResponse<User>> {
    return axios.get(`${API_URL}/api/users/verify/${id}`);
  },
};