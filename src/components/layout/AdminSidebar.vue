<template>
  <nav class="bg-gray-800 text-white w-64 min-h-screen p-4">
    <ul class="space-y-4">
      <li>
        <router-link to="/dashboard/courses" class="flex items-center p-2 rounded-lg hover:bg-gray-700">
          <i class="fas fa-graduation-cap"></i>
          <span class="ml-2">Inscripciones a Cursos</span>
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/events" class="flex items-center p-2 rounded-lg hover:bg-gray-700">
          <i class="fas fa-calendar-alt"></i>
          <span class="ml-2">Inscripciones a Eventos</span>
        </router-link>
      </li>
      <!--
      <li>
        <router-link to="/dashboard/statistics" class="flex items-center p-2 rounded-lg hover:bg-gray-700">
          <i class="fas fa-chart-bar"></i>
          <span class="ml-2">Estadísticas</span>
        </router-link>
      </li> -->
      <li>
        <button @click="logout" class="flex items-center p-2 w-full text-left rounded-lg hover:bg-gray-700 focus:outline-none">
          <i class="fas fa-sign-out-alt"></i>
          <span class="ml-2">Cerrar Sesión</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  // Lógica para cerrar sesión, eliminar el token y limpiar la información del usuario
  localStorage.removeItem('authToken');
  authStore.$reset(); // Reiniciar el estado del store de autenticación
  router.push('/login'); // Redirigir a la página de inicio de sesión
};
</script>

<style scoped>
nav {
  font-family: 'Inter', sans-serif;
}

nav ul li a:hover {
  background-color: #4b5563; /* Color de fondo al pasar el ratón */
}

nav ul li a {
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.min-h-screen {
  min-height: 100vh;
}
</style>