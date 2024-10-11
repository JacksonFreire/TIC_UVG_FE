<template>
  <header class="flex justify-between items-center bg-gray-100 dark:bg-gray-900 p-4 shadow-md w-full">
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
    <div class="flex space-x-4">
      <!-- Botón de Tema Oscuro -->
      <button @click="toggleTheme" class="bg-gray-200 dark:bg-gray-700 p-2 rounded focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-600">
        <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
      </button>
      <!-- Botón de Alto Contraste -->
      <button @click="toggleContrast" class="bg-gray-200 dark:bg-gray-700 p-2 rounded focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-600">
        <i class="fas fa-adjust"></i>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Modo oscuro y contraste alto
const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

const toggleContrast = () => {
  document.documentElement.classList.toggle('high-contrast');
};
</script>

<style scoped>
.high-contrast {
  filter: contrast(150%);
}
</style>
