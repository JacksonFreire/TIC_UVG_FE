// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import CoursesList from '@/views/CoursesList.vue';
import CourseDetails from '@/views/CourseDetails.vue';
import EventsList from '@/views/EventsList.vue';
import EventDetails from '@/views/EventDetails.vue';
import Profile from '@/views/Profile.vue';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
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
  {
    path: '/courses', 
    name: 'CoursesList',
    component: CoursesList,
  },
  {
    path: '/courses/:id', 
    name: 'CourseDetails',
    component: CourseDetails,
  },
  {
    path: '/events',
    name: 'EventsList',
    component: EventsList,
  },
  {
    path: '/events/:id',
    name: 'EventDetails',
    component: EventDetails,
    props: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;