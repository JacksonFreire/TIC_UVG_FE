<template>
  <div class="flex h-screen">
    <!-- Barra lateral de administración -->
    <AdminSidebar class="w-64 bg-gray-800 text-white" />

    <!-- Contenido principal -->
    <div class="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-auto">
      <!-- Encabezado de administración -->
      <AdminHeader />

      <!-- Área principal del dashboard -->
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminSidebar from '@/components/layout/AdminSidebar.vue';
import AdminHeader from '@/components/layout/AdminHeader.vue';
</script>

<style scoped>
/* Ajustes para asegurar que el contenido ocupe toda la pantalla */
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