<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">Registro</h2>
      <form @submit.prevent="submit">
        <div v-for="(field, key) in formFields" :key="key" class="mb-4">
          <label :for="key" class="block text-sm font-medium text-gray-700">
            {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
          </label>
          <input v-if="field.type !== 'file'"
                 :id="key"
                 v-model="form[key]"
                 :type="field.type"
                 @blur="touched[key] = true"
                 :class="{'border-red-500': touched[key] && (!form[key] || (key === 'confirmPassword' && !passwordsMatch))}"
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <input v-else
                 :id="key"
                 @change="handleFileUpload"
                 @blur="touched[key] = true"
                 :class="{'border-red-500': touched[key] && !form[key]}"
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 type="file"
          />
          
          <p v-if="key === 'confirmPassword' && touched.confirmPassword && !passwordsMatch" class="text-red-500 text-sm mt-1">Las contraseñas no coinciden.</p>
          <p v-else-if="touched[key] && !form[key]" class="text-red-500 text-sm mt-1">{{ field.error }}</p>
        </div>

        <button type="submit" :disabled="!validateForm()"
                class="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                :class="{'bg-gray-400 cursor-not-allowed': !validateForm(), 'bg-blue-600 hover:bg-blue-700': validateForm()}">
          Enviar
        </button>
      </form>
    </div>
    <transition name="fade">
      <div v-if="isSubmitting" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="bg-white rounded-lg p-6 max-w-sm w-full">
          <h3 class="text-lg font-semibold text-gray-800 text-center">Procesando...</h3>
          <p class="text-center text-gray-600 mt-2">{{ modalMessage }}</p>
          <div v-if="submissionError" class="text-red-500 text-sm text-center mt-4">{{ submissionError }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRegisterForm } from '@/composables/useRegisterForm';

export default defineComponent({
  name: 'RegisterForm',
  setup() {
    const { form, touched, valid, isSubmitting, modalMessage, submissionError, handleFileUpload, submit, validateForm, passwordsMatch } = useRegisterForm();

    const formFields = {
      firstName: { label: 'Nombre', type: 'text', required: true, error: 'Este campo es obligatorio.' },
      lastName: { label: 'Apellido', type: 'text', required: true, error: 'Este campo es obligatorio.' },
      email: { label: 'Email', type: 'email', required: true, error: 'Email inválido.' },
      username: { label: 'Usuario', type: 'text', required: true, error: 'Este campo es obligatorio.' },
      password: { label: 'Contraseña', type: 'password', required: true, error: 'La contraseña debe tener al menos 6 caracteres.' },
      confirmPassword: { label: 'Confirmar Contraseña', type: 'password', required: true, error: 'Las contraseñas no coinciden.' },
      phoneNumber: { label: 'Número de Teléfono', type: 'text', required: true, error: 'Este campo es obligatorio.' },
      birthDate: { label: 'Fecha de Nacimiento', type: 'date', required: true, error: 'Este campo es obligatorio.' },
      document: { label: 'Documento', type: 'file', required: true, error: 'Este campo es obligatorio.' },
    };

    return {
      form,
      touched,
      isSubmitting,
      modalMessage,
      submissionError,
      handleFileUpload,
      submit,
      validateForm,
      formFields,
      passwordsMatch,
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