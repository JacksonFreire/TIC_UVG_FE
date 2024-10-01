<template>
  <div>
    <!-- Título de la Página -->
    <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Recuperar Contraseña</h1>
    <p class="text-sm text-center text-gray-600 mb-6">
      Por favor ingresa tu correo electrónico para recibir un enlace de recuperación.
    </p>

    <!-- Formulario para recuperar contraseña -->
    <form @submit.prevent="submit" :aria-busy="isLoading" novalidate>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">
          Correo Electrónico <span class="text-red-500">*</span>
        </label>
        <div class="relative mt-1">
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="ejemplo@correo.com"
            :disabled="isLoading"
            required
            class="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <font-awesome-icon
            v-if="emailError"
            icon="exclamation-circle"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500"
          />
        </div>
        <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
      </div>

      <!-- Botón de Enviar -->
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <font-awesome-icon
          v-if="isLoading"
          icon="spinner"
          class="animate-spin h-5 w-5 mr-2 text-white"
        />
        <span>{{ isLoading ? 'Enviando...' : 'Enviar' }}</span>
      </button>

      <!-- Mensaje de éxito y error -->
      <p v-if="successMessage" class="text-green-500 text-sm mt-4 text-center">{{ successMessage }}</p>
      <p v-if="apiError" class="text-red-500 text-sm mt-4 text-center">{{ apiError }}</p>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import authService from '@/services/authService'; // Importa el servicio de autenticación

// Importar Font Awesome si es necesario
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const email = ref<string>('');
const emailError = ref<string>('');
const successMessage = ref<string>('');
const apiError = ref<string>('');
const isLoading = ref<boolean>(false); // Estado de carga

const submit = async () => {
  // Reiniciar mensajes de error y éxito
  emailError.value = '';
  apiError.value = '';
  successMessage.value = '';

  // Validación del correo electrónico
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value || !emailPattern.test(email.value)) {
    emailError.value = 'Por favor, introduce un correo electrónico válido.';
    return;
  }

  isLoading.value = true; // Inicia el estado de carga

  try {
    await authService.requestPasswordReset(email.value); // Llama al servicio de API
    successMessage.value = '¡Correo de recuperación enviado con éxito!';
  } catch (error: any) {
    // Manejo de errores específicos si la API proporciona códigos o mensajes
    if (error.response && error.response.status === 404) {
      apiError.value = 'El correo electrónico no está registrado.';
    } else {
      apiError.value = 'Error al enviar el correo de recuperación. Por favor, inténtalo nuevamente.';
    }
    console.error(error);
  } finally {
    isLoading.value = false; // Termina el estado de carga
  }
};
</script>

<style scoped>
/* Spinner personalizado (opcional si usas Tailwind CSS 2.1 o superior, ya incluye animate-spin) */
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>