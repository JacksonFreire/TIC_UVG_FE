<template>
    <div class="w-full max-w-md mx-auto mt-36 p-8 bg-white rounded-lg shadow-lg">
      <!-- Componente de Formulario de Recuperación de Contraseña -->
      <ForgotPasswordForm />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue'; // Importa el componente de formulario
  
  export default defineComponent({
    name: 'ForgotPassword',
    components: {
      ForgotPasswordForm,
    },
  });
  </script>
  
  <style scoped>
  /* Estilos adicionales si es necesario */
  </style>
  