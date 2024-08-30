<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <Navbar />

    <!-- Espacio para el Contenido Principal -->
    <div class="flex-grow pt-16"> <!-- Ajusta el margen superior para no ocultar el contenido detrás del navbar -->
      <router-view />
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
});
</script>

<style scoped>
/* Asegura que el contenido esté siempre visible entre el navbar y el footer */
</style>