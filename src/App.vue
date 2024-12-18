<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar existente -->
    <Navbar v-if="!isInDashboard" />

    <!-- Contenido Principal -->
    <div :class="contentClass">
      <router-view />
    </div>

    <!-- Footer -->
    <Footer v-if="!isInDashboard" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Navbar from '@/components/layout/Navbar.vue'; // Usa tu Navbar existente
import Footer from '@/components/layout/Footer.vue'; // Footer existente
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'App',
  components: {
    Navbar, // Usamos el Navbar que ya tienes
    Footer,
  },
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();

    // Determinar si el usuario está en cualquier tipo de dashboard
    const isInDashboard = computed(() => {
      return (
          route.path.includes('/dashboard') || route.path.includes('/instructor-dashboard')
      );
    });

    // Clase dinámica para el contenedor principal
    const contentClass = computed(() => {
      return isInDashboard.value
          ? 'flex-grow' // Dashboard ocupa toda la pantalla
          : 'flex-grow pt-16 container mx-auto px-4'; // Espaciado para páginas públicas
    });

    return {
      isInDashboard,
      contentClass,
    };
  },
});
</script>

<style scoped>
/* Estilos generales para estructura de la aplicación */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Clase general para permitir que el contenido crezca */
.flex-grow {
  flex-grow: 1;
}
</style>
