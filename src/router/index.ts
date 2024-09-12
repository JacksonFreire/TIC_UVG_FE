// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import ForgotPassword from '@/views/ForgotPassword.vue'; 
import ResetPassword from '@/views/ResetPassword.vue'; 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  { 
    path: '/forgot-password', 
    name: 'ForgotPassword', 
    component: ForgotPassword,
},
{ path: '/reset-password', name: 'ResetPassword', component: ResetPassword },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;