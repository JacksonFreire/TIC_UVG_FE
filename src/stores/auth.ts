// src/stores/auth.ts

import { defineStore } from 'pinia';
import authService from '@/services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await authService.login(username, password);
        this.token = response.data.token; // Almacena el token de la respuesta
        // Guardar token en almacenamiento local o de sesión
        localStorage.setItem('token', this.token);
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});