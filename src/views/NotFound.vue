<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center">
    <h1 class="text-6xl font-bold text-blue-600 mb-4">404</h1>
    <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Página no encontrada</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      Lo sentimos, la página que estás buscando no existe.
    </p>
    <router-link
        to="/"
        class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
    >
      Volver al Inicio
    </router-link>
  </div>
</template>

<script setup>
// No se requiere lógica compleja para esta página.
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
