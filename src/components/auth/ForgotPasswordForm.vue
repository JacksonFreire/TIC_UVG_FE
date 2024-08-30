<template>
    <div>
      <!-- Título de la Página -->
      <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Recuperar Contraseña</h1>
      <p class="text-sm text-center text-gray-600 mb-6">
        Por favor ingresa tu correo electrónico para recibir un enlace de recuperación.
      </p>
  
      <!-- Formulario para recuperar contraseña -->
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Correo Electrónico <span class="text-red-500">*</span>
          </label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            placeholder="ejemplo@correo.com"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
          />
          <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
        </div>
  
        <!-- Botón de Enviar -->
        <button 
          type="submit" 
          class="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm hover:bg-blue-700"
        >
          Enviar
        </button>
  
        <!-- Mensaje de éxito y error -->
        <p v-if="successMessage" class="text-green-500 text-sm mt-4 text-center">{{ successMessage }}</p>
        <p v-if="apiError" class="text-red-500 text-sm mt-4 text-center">{{ apiError }}</p>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import authService from '@/services/authService'; // Importa el servicio de autenticación
  
  export default defineComponent({
    name: 'ForgotPasswordForm',
    setup() {
      const email = ref('');
      const emailError = ref('');
      const successMessage = ref('');
      const apiError = ref('');
  
      const submit = async () => {
        if (!email.value) {
          emailError.value = 'Por favor, introduce un correo electrónico válido.';
          return;
        }
  
        try {
          await authService.requestPasswordReset(email.value); // Llama al servicio de API
          successMessage.value = '¡Correo de recuperación enviado con éxito!';
          emailError.value = '';
          apiError.value = '';
        } catch (error) {
          apiError.value = 'Error al enviar el correo de recuperación. Por favor, intente nuevamente.';
          console.error(error);
        }
      };
  
      return {
        email,
        emailError,
        successMessage,
        apiError,
        submit,
      };
    },
  });
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>  