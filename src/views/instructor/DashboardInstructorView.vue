<template>
  <div class="flex h-screen">
    <!-- Barra lateral personalizada para instructores -->
    <InstructorSidebar class="w-64 bg-gray-800 text-white" />

    <!-- Contenido principal -->
    <div class="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-auto">
      <!-- Encabezado reutilizado -->
      <AdminHeader />

      <!-- Área principal del dashboard -->
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
// Reutilizamos el encabezado del administrador
import AdminHeader from '@/components/layout/AdminHeader.vue';

// Importamos la barra lateral personalizada para instructores
import InstructorSidebar from '@/components/layout/InstructorSidebar.vue';
</script>

<style scoped>
/* Asegurar que el layout ocupe toda la pantalla */
html, body, #app {
  height: 100%;
  margin: 0;
}
.flex-1 {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
