<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenido Principal -->
    <div class="flex-grow pt-16 flex flex-col justify-center items-center">
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
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}
</style>