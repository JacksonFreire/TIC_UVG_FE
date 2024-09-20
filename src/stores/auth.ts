// src/stores/auth.ts
import { defineStore } from 'pinia';
import authService from '@/services/authService';
import { Router } from 'vue-router'; // Importa Router correctamente

interface AuthState {
  token: string | null;
  userDetails: { username: string; userId: number } | null;
  redirectUrl: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    userDetails: null,
    redirectUrl: '',
  }),
  actions: {
    async login(username: string, password: string, router: Router) {
      // Asegúrate de que router sea pasado al llamar a esta función
      try {
        const response = await authService.login(username, password);
        this.token = response.data.token;
        localStorage.setItem('token', this.token ?? '');

        // Extraer los detalles del usuario del token
        if (this.token) {
          const tokenPayload = JSON.parse(atob(this.token.split('.')[1]));
          this.userDetails = {
            username: tokenPayload.sub,
            userId: parseInt(tokenPayload.userId, 10),
          };
        }

        // Redirigir a la URL guardada después del login
        if (this.redirectUrl) {
          const urlToRedirect = this.redirectUrl;
          this.setRedirectUrl('');
          router.push(urlToRedirect); // Ahora router está correctamente pasado y usado
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
      }
    },
    logout(router: Router) {
      // Ahora se requiere pasar el router al logout también
      this.token = null;
      this.userDetails = null;
      this.redirectUrl = '';
      localStorage.removeItem('token');
      router.push('/login'); // Redirige al login tras el logout
    },
    setRedirectUrl(url: string) {
      this.redirectUrl = url;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
});