<template>
  <!-- Contenedor del formulario con fondo blanco y sombra -->
  <div class="w-full max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg">
    <!-- Componente de Formulario de Inicio de Sesión -->
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from '@/components/auth/LoginForm.vue'; // Importa el componente de formulario

export default defineComponent({
  name: 'Login',
  components: {
    LoginForm,
  },
});
</script>
