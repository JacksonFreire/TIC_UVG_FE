// src/store/user.ts
import { defineStore } from 'pinia';
import api from '@/services/api';
import { Form } from '@/models/request/form'; // Importa la interfaz Form
// create function for sum two 

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

interface UserState {
  user: User | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
  }),
  actions: {
    async register(userData: Form): Promise<User> { // Acepta un objeto de tipo Form
      try {
        const response = await api.register(userData);
        this.user = response.data as User;
        return this.user;
      } catch (error) {
        console.error('Error en el registro:', error);
        throw error;
      }
    },
    async fetchUser(id: string): Promise<User> {
      try {
        const response = await api.getUser(id);
        this.user = response.data as User;
        return this.user;
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error;
      }
    },
    logout() {
      this.user = null;
    },
  },
});
