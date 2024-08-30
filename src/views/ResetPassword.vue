<template>
    <div class="min-h-screen flex items-center justify-center bg-white">
      <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <!-- Título de la Página -->
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Restablecer Contraseña</h2>
        
        <!-- Formulario de Restablecimiento de Contraseña -->
        <form @submit.prevent="submit">
          <!-- Campo de Nueva Contraseña -->
          <div class="mb-4">
            <label for="newPassword" class="block text-sm font-medium text-gray-700">
              Nueva Contraseña <span class="text-red-500">*</span>
            </label>
            <input 
              id="newPassword" 
              v-model="newPassword" 
              type="password" 
              @blur="touched.newPassword = true"
              :class="{'border-red-500': touched.newPassword && newPasswordError}"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p v-if="newPasswordError" class="text-red-500 text-sm mt-1">{{ newPasswordError }}</p>
          </div>
  
          <!-- Campo de Confirmar Nueva Contraseña -->
          <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirmar Nueva Contraseña <span class="text-red-500">*</span>
            </label>
            <input 
              id="confirmPassword" 
              v-model="confirmPassword" 
              type="password" 
              @blur="touched.confirmPassword = true"
              :class="{'border-red-500': touched.confirmPassword && confirmPasswordError}"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p v-if="confirmPasswordError" class="text-red-500 text-sm mt-1">{{ confirmPasswordError }}</p>
          </div>
  
          <!-- Botón de Enviar -->
          <button 
            type="submit" 
            class="w-full px-4 py-2 mt-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm hover:bg-indigo-700"
          >
            Restablecer Contraseña
          </button>
  
          <!-- Mensaje de Éxito -->
          <p v-if="successMessage" class="text-green-500 text-sm mt-4 text-center">{{ successMessage }}</p>
          <!-- Mensaje de Error -->
          <p v-if="apiError" class="text-red-500 text-sm mt-4 text-center">{{ apiError }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import authService from '@/services/authService'; // Importa el servicio de autenticación
  
  export default defineComponent({
    name: 'ResetPassword',
    setup() {
      const newPassword = ref('');
      const confirmPassword = ref('');
      const touched = ref({
        newPassword: false,
        confirmPassword: false,
      });
  
      const newPasswordError = ref('');
      const confirmPasswordError = ref('');
      const successMessage = ref('');
      const apiError = ref('');
  
      const submit = async () => {
        if (!newPassword.value) {
          newPasswordError.value = 'Por favor, ingrese una nueva contraseña.';
        } else {
          newPasswordError.value = '';
        }
  
        if (!confirmPassword.value) {
          confirmPasswordError.value = 'Por favor, confirme su nueva contraseña.';
        } else if (newPassword.value !== confirmPassword.value) {
          confirmPasswordError.value = 'Las contraseñas no coinciden.';
        } else {
          confirmPasswordError.value = '';
        }
  
        if (newPasswordError.value || confirmPasswordError.value) {
          return;
        }
  
        try {
          const token = new URLSearchParams(window.location.search).get('token');
          if (token) {
            await authService.resetPassword(token, newPassword.value);
            successMessage.value = '¡Contraseña restablecida con éxito!';
            apiError.value = '';
          } else {
            apiError.value = 'Token inválido o no proporcionado.';
          }
        } catch (error) {
          apiError.value = 'Error al restablecer la contraseña. Por favor, intente nuevamente.';
          console.error(error);
        }
      };
  
      return {
        newPassword,
        confirmPassword,
        touched,
        newPasswordError,
        confirmPasswordError,
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
  