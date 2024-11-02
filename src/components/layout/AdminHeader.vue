<template>
  <header class="flex justify-between items-center bg-gray-100 dark:bg-gray-900 p-4 shadow-md w-full">
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
    <div class="flex items-center space-x-4">
      <!-- Botón de Tema Oscuro -->
      <button @click="toggleTheme" class="p-2 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none transition rounded-md">
        <i :class="isDarkMode ? 'fas fa-sun text-yellow-400' : 'fas fa-moon text-blue-400'"></i>
      </button>

      <!-- Información del usuario -->
      <div class="flex items-center bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 px-4 py-2 rounded-lg shadow-md">
        <i class="fas fa-user-circle text-gray-600 dark:text-gray-300 text-xl"></i>
        <span class="ml-2 text-gray-900 dark:text-gray-100 font-semibold text-base">{{ authStore.userDetails?.username || 'Usuario' }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

// Modo oscuro y manejo del tema
const isDarkMode = ref(false);
const authStore = useAuthStore(); // Acceso al nombre del usuario desde authStore

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};
</script>

<style scoped>
header {
  transition: background-color 0.3s;
}
button {
  background: none;
  border: none;
}
</style>
