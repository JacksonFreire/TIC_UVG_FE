import { defineStore } from 'pinia';
import authService from '@/services/authService';
import { Router } from 'vue-router';

interface AuthState {
  token: string | null;
  userDetails: { username: string; userId: number } | null;
  userRole: string | null; // Rol del usuario, como 'ADMIN' o 'INSTR'
  instructorId: number | null;
  redirectUrl: string; // URL a la que redirigir tras el inicio de sesión
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    userDetails: null,
    userRole: null,
    redirectUrl: '',
  }),

  actions: {
    async login(username: string, password: string, router: Router) {
      try {
        // Llamada al servicio de autenticación para obtener el token
        const response = await authService.login(username, password);
        this.token = response.data.token;
        localStorage.setItem('token', this.token ?? '');

        // Extraer los detalles del usuario y el rol desde el token
        if (this.token) {
          const tokenPayload = JSON.parse(atob(this.token.split('.')[1]));
          this.userDetails = {
            username: tokenPayload.sub,
            userId: parseInt(tokenPayload.userId, 10),
          };
          this.userRole = tokenPayload.role || null; // Asignar el rol del usuario
          this.instructorId = tokenPayload.instructorId ? parseInt(tokenPayload.instructorId, 10) : null;
        }

        // Redirigir a la URL guardada después del inicio de sesión
        if (this.redirectUrl) {
          const urlToRedirect = this.redirectUrl;
          this.setRedirectUrl('');
          router.push(urlToRedirect);
        } else if (this.userRole === 'ADMIN') {
          // Redirigir al dashboard de ADMIN
          router.push('/dashboard');
        } else if (this.userRole === 'INSTR') {
          // Redirigir al dashboard de INSTRUCTOR
          router.push('/instructor-dashboard');
        } else {
          // Redirigir a la página de inicio si el usuario tiene otro rol
          router.push('/');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
      }
    },

    logout(router: Router) {
      // Limpiar el estado de autenticación
      this.token = null;
      this.userDetails = null;
      this.userRole = null;
      this.instructorId = null;
      this.redirectUrl = '';
      localStorage.removeItem('token');

      // Redirigir a la página de inicio de sesión
      router.push('/login');
    },

    setRedirectUrl(url: string) {
      // Guardar la URL a la que redirigir después del inicio de sesión
      this.redirectUrl = url;
    },
  },

  getters: {
    // Getter para verificar si el usuario está autenticado
    isLoggedIn: (state) => !!state.token,

    // Getter para verificar si el usuario es ADMIN
    isAdmin: (state) => state.userRole === 'ADMIN',

    // Getter para verificar si el usuario es INSTRUCTOR
    isInstructor: (state) => state.userRole === 'INSTR',

    getInstructorId: (state) => state.instructorId,
  },
});
