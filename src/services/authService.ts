// src/services/authService.ts

import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_BASE_URL_API;

export default {
  async login(username: string, password: string) {
    return axios.post(`${API_URL}/api/auth/login`, { username, password });
  },
  async resetPassword(token: string, newPassword: string) {
    return axios.post(`${API_URL}/api/auth/reset-password?token=${token}`, { newPassword });
  },
  async requestPasswordReset(email: string) {
    // Llama al endpoint correcto para solicitar el restablecimiento de contraseña
    return axios.post(`${API_URL}/api/auth/request-password-reset`, { email });
  },
};