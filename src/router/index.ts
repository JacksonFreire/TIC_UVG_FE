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
import AdminCoursesList from '@/views/admin/AdminCoursesList.vue';
import AdminEventsList from '@/views/admin/AdminEventsList.vue';
import EventEnrollments from '@/views/admin/EventEnrollments.vue';
import AddCourse from '@/views/admin/AddCourse.vue';
import UpdateCourse from '@/views/admin/UpdateCourse.vue';
import AddEvent from '@/views/admin/AddEvent.vue'; // Importar la vista para añadir eventos
import UpdateEvent from '@/views/admin/UpdateEvent.vue'; // Importar la vista para actualizar eventos
import { useAuthStore } from '@/stores/auth';
import AdminCourseDetails from "@/views/admin/AdminCourseDetails.vue";

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
    redirect: { name: 'AdminCoursesList' },
    children: [
      {
        path: 'courses',
        name: 'AdminCoursesList',
        component: AdminCoursesList,
        meta: { requiresAuth: true, role: 'ADMIN' }
      },
      {
        path: 'courses/:courseId',
        name: 'CourseEnrollments',
        component: CourseEnrollments,
        meta: { requiresAuth: true, role: 'ADMIN' }
      },
      {
        path: 'events',
        name: 'AdminEventsList',
        component: AdminEventsList,
        meta: { requiresAuth: true, role: 'ADMIN' }
      },
      {
        path: 'events/:eventId',
        name: 'EventEnrollments',
        component: EventEnrollments,
        meta: { requiresAuth: true, role: 'ADMIN' }
      },
      {
        path: 'courses/add',
        name: 'AddCourse',
        component: AddCourse,
        meta: { requiresAuth: true, role: 'ADMIN' }
      },
      {
        path: 'courses/:id/details',
        name: 'AdminCourseDetails',
        component: AdminCourseDetails,
        meta: { requiresAuth: true, role: 'ADMIN' },
        props: true,
      },
      {
        path: 'courses/edit/:id',
        name: 'UpdateCourse',
        component: UpdateCourse,
        meta: { requiresAuth: true, role: 'ADMIN' },
        props: true
      },
      {
        path: 'events/add',
        name: 'AddEvent',  // Nueva ruta para agregar evento
        component: AddEvent,
        meta: { requiresAuth: true, role: 'ADMIN' }
      },
      {
        path: 'events/:id/details',
        name: 'AdminEventDetails',
        component: () => import('@/views/admin/AdminEventDetails.vue'),
        meta: { requiresAuth: true, role: 'ADMIN' },
        props: true
      },
      {
        path: 'events/edit/:id',
        name: 'UpdateEvent',  // Nueva ruta para actualizar evento
        component: UpdateEvent,
        meta: { requiresAuth: true, role: 'ADMIN' },
        props: true
      }
    ],
  },
  // Ruta para manejar páginas no encontradas (404)
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
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
