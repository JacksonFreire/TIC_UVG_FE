<template>
  <!-- Formulario centrado horizontalmente con mx-auto -->
  <div class="w-full max-w-md mt-36 p-8 bg-white rounded-lg shadow-lg mx-auto">
    <!-- Componente de Formulario de Inicio de Sesión -->
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from '@/components/auth/LoginForm.vue';

export default defineComponent({
  name: 'Login',
  components: {
    LoginForm,
  },
});
</script>

<style scoped>
/* No hay estilos adicionales necesarios por ahora */
</style>
