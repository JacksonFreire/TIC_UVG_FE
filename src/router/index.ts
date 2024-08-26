// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Register from '@/views/Register.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  // Otras rutas aquí
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;