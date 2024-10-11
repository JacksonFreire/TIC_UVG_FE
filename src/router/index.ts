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
import Home from '@/views/HomePage.vue';
import AboutPage from '@/views/AboutPage.vue';
import ContactPage from '@/views/ContactPage.vue';
import DashboardAdminView from '@/views/admin/DashboardAdminView.vue';
import CourseEnrollments from '@/views/admin/CourseEnrollments.vue';
import AdminCoursesList from '@/views/admin/AdminCoursesList.vue'; // Nueva vista para la lista de cursos
import { useAuthStore } from '@/stores/auth';

// Definición de rutas
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },
  { path: '/courses', name: 'CoursesList', component: CoursesList },
  { path: '/courses/:id', name: 'CourseDetails', component: CourseDetails },
  { path: '/events', name: 'EventsList', component: EventsList },
  { path: '/events/:id', name: 'EventDetails', component: EventDetails, props: true },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/profile', name: 'Profile', component: Profile },
  {
    path: '/dashboard',
    name: 'AdminDashboard',
    component: DashboardAdminView,
    meta: { requiresAuth: true, role: 'ADMIN' },
    redirect: { name: 'AdminCoursesList' }, // Redirigir automáticamente a la lista de cursos
    children: [
      {
        path: 'courses',
        name: 'AdminCoursesList', // Ruta para ver la lista de cursos
        component: AdminCoursesList,
        meta: { requiresAuth: true, role: 'ADMIN' }
      },
      {
        path: 'courses/:courseId',  // Ruta para ver inscripciones de un curso específico
        name: 'CourseEnrollments',
        component: CourseEnrollments,
        meta: { requiresAuth: true, role: 'ADMIN' }
      },
    ],
  },
  // Ruta para manejar páginas no encontradas (404)
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'), // Ruta a la vista de página no encontrada
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware de autenticación y roles
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isLoggedIn;
  const userRole = authStore.userRole;

  // Verificación de autenticación
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Si no está autenticado, redirigir al login
    authStore.setRedirectUrl(to.fullPath);
    next({ name: 'Login' });
  } else if (to.meta.role && to.meta.role !== userRole) {
    // Si no tiene el rol adecuado, redirigir a la página de inicio
    next({ name: 'Home' });
  } else {
    // Permitir el acceso si cumple con los requisitos
    next();
  }
});

export default router;