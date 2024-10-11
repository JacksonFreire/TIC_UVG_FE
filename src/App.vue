<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar existente -->
    <Navbar v-if="!isInAdminDashboard" />

    <!-- Contenido Principal -->
    <div :class="contentClass">
      <router-view />
    </div>

    <!-- Footer -->
    <Footer v-if="!isInAdminDashboard" />
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

    const isInAdminDashboard = computed(() => {
      return route.path.includes('/dashboard') && (authStore.userRole === 'ADMIN' || authStore.userRole === 'INSTR');
    });

    const contentClass = computed(() => {
      return isInAdminDashboard.value
          ? 'flex-grow' // Dashboard no necesita padding top
          : 'flex-grow pt-16 container mx-auto px-4'; // Otras páginas compensan el espacio del navbar
    });

    return {
      isInAdminDashboard,
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
