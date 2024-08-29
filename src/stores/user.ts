// src/stores/user.ts

import { defineStore } from 'pinia';
import api from '@/services/api';

export interface User {
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
    async register(userData: FormData): Promise<User> {
      try {
        const response = await api.register(userData);
        this.user = response.data;
        return this.user;
      } catch (error) {
        console.error('Error en el registro:', error);
        throw error;
      }
    },
    async fetchUser(id: string): Promise<User> {
      try {
        const response = await api.getUser(id);
        this.user = response.data;
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