<template>
  <!-- Formulario de Inicio de Sesión -->
  <div>
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
    <form @submit.prevent="submit">
      <!-- Campo de Usuario -->
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700">
          Usuario <span class="text-red-500">*</span>
        </label>
        <input 
          id="username" 
          v-model="form.username" 
          type="text" 
          @blur="touched.username = true"
          :class="{'border-red-500': touched.username && v$.username.$invalid}"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
        />
        <p v-if="touched.username && v$.username.$invalid" class="text-red-500 text-sm mt-1">El usuario no puede estar vacío.</p>
      </div>

      <!-- Campo de Contraseña -->
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">
          Contraseña <span class="text-red-500">*</span>
        </label>
        <input 
          id="password" 
          v-model="form.password" 
          type="password" 
          @blur="touched.password = true"
          :class="{'border-red-500': touched.password && v$.password.$invalid}"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
        />
        <p v-if="touched.password && v$.password.$invalid" class="text-red-500 text-sm mt-1">La contraseña no puede estar vacía.</p>
      </div>

      <!-- Botón de Enviar -->
      <button 
        type="submit" 
        :disabled="!validateForm() || isSubmitting"
        class="w-full px-4 py-2 mt-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm hover:bg-indigo-700"
      >
        Enviar
      </button>

      <!-- Enlaces de Recuperar Contraseña y Crear Nuevo Usuario -->
      <div class="mt-4 flex justify-between">
        <router-link to="/forgot-password" class="text-sm text-indigo-600 hover:underline">
          ¿Olvidaste tu contraseña?
        </router-link>
        <router-link to="/register" class="text-sm text-indigo-600 hover:underline">
          Crear nuevo usuario
        </router-link>
      </div>

      <!-- Mensaje de Error de Autenticación -->
      <p v-if="authError" class="text-red-500 text-sm mt-4 text-center">{{ authError }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLoginForm } from '@/composables/useLoginForm';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const { form, touched, isSubmitting, v$, submit, validateForm, authError } = useLoginForm();

    return {
      form,
      touched,
      isSubmitting,
      v$, // Uso correcto del objeto de validación
      submit,
      validateForm,
      authError,
    };
  },
});
</script>

<style scoped>
.has-error input {
  border-color: #f87171;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>