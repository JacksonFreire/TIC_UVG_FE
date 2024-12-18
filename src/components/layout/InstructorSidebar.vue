<template>
  <nav class="bg-gray-800 text-white w-64 min-h-screen p-4">
    <ul class="space-y-4">
      <!-- Cursos -->
      <li>
        <router-link to="/instructor-dashboard/courses" class="flex items-center p-2 rounded-lg hover:bg-gray-700">
          <i class="fas fa-graduation-cap"></i>
          <span class="ml-2">Mis Cursos</span>
        </router-link>
      </li>

      <!-- Eventos -->
      <li>
        <router-link to="/instructor-dashboard/events" class="flex items-center p-2 rounded-lg hover:bg-gray-700">
          <i class="fas fa-calendar-alt"></i>
          <span class="ml-2">Mis Eventos</span>
        </router-link>
      </li>

      <!-- Cerrar Sesión -->
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
  // Lógica para cerrar sesión
  localStorage.removeItem('authToken');
  authStore.$reset(); // Reiniciar el estado del store
  router.push('/login'); // Redirigir al login
};
</script>

<style scoped>
nav {
  font-family: 'Inter', sans-serif;
}

nav ul li a:hover {
  background-color: #4b5563; /* Fondo al pasar el ratón */
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
