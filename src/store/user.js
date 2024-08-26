var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// src/store/user.ts
import { defineStore } from 'pinia';
import api from '@/services/api';
export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: {
        register(userData) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield api.register(userData);
                    this.user = response.data;
                    return this.user;
                }
                catch (error) {
                    console.error('Error en el registro:', error);
                    throw error;
                }
            });
        },
        fetchUser(id) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield api.getUser(id);
                    this.user = response.data;
                    return this.user;
                }
                catch (error) {
                    console.error('Error al obtener el usuario:', error);
                    throw error;
                }
            });
        },
        logout() {
            this.user = null;
        },
    },
});
