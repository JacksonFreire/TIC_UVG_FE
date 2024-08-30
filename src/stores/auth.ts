import { defineStore } from 'pinia';
import authService from '@/services/authService';

interface AuthState {
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null, // Inicializamos el estado con token como null
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await authService.login(username, password);
        this.token = response.data.token; // Asignamos el token obtenido de la respuesta

        // Asegurarnos de que el valor almacenado en localStorage siempre sea una cadena
        localStorage.setItem('token', this.token ?? ''); // Utiliza una cadena vacía si el token es null
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error; // Re-lanzamos el error para que pueda ser manejado en otro lugar
      }
    },
    logout() {
      this.token = null; // Reseteamos el token al cerrar sesión
      localStorage.removeItem('token'); // Removemos el token del localStorage
    },
  },
});