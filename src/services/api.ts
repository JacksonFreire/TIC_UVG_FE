// src/services/api.ts

import axios, { AxiosResponse } from 'axios';
import { User } from '@/stores/user';

const API_URL_BE = import.meta.env.VITE_APP_BASE_URL_API;

export default {
  register(userData: FormData): Promise<AxiosResponse<User>> {
    return axios.post(`${API_URL_BE}/api/users/register`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getUser(id: string): Promise<AxiosResponse<User>> {
    return axios.get(`${API_URL_BE}/api/users/verify/${id}`);
  },
};
