<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6 ">Registro</h2>
      <form @submit.prevent="submitForm" :class="{ 'opacity-50 pointer-events-none': isSubmitting }">
        <div v-for="(field, key) in formFields" :key="key" class="mb-4">
          <label :for="key" class="block text-sm font-medium text-gray-700">
            {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
          </label>
          <input v-if="field.type !== 'file'"
                 :id="key"
                 v-model="form[key as keyof typeof form]"
                 :type="field.type"
                 @blur="touched[key as keyof typeof touched] = true"
                 :disabled="isSubmitting"
                 :class="{'border-red-500': touched[key as keyof typeof touched] && (!form[key as keyof typeof form] || (key === 'confirmPassword' && !passwordsMatch))}"
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <input v-else
                 :id="key"
                 :key="fileInputKey"
                 @change="handleFileUpload"
                 @blur="touched[key as keyof typeof touched] = true"
                 :disabled="isSubmitting"
                 :class="{'border-red-500': touched[key as keyof typeof touched] && !form[key as keyof typeof form]}"
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 type="file"
          />
          <!-- Validación de la contraseña -->
          <p v-if="key === 'password' && touched.password && !isValidPassword(form.password)" class="text-red-500 text-sm mt-1">
            La contraseña debe contener al menos una mayúscula y un número.
          </p>
          <!-- Validación de la confirmación de contraseña -->
          <p v-if="key === 'confirmPassword' && touched.confirmPassword && !passwordsMatch" class="text-red-500 text-sm mt-1">Las contraseñas no coinciden.</p>
          <p v-else-if="touched[key as keyof typeof touched] && !form[key as keyof typeof form]" class="text-red-500 text-sm mt-1">{{ field.error }}</p>
        </div>

        <button type="submit" :disabled="!validateForm() || isSubmitting"
                class="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                :class="{'bg-gray-400 cursor-not-allowed': !validateForm() || isSubmitting, 'bg-blue-600 hover:bg-blue-700': validateForm() && !isSubmitting}">
          Enviar
        </button>
      </form>
    </div>

    <!-- Modal de resultado -->
    <transition name="fade">
      <div v-if="showResultDialog" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="bg-white rounded-lg p-6 max-w-sm w-full">
          <div class="flex justify-center">
            <i v-if="submissionError" class="fas fa-exclamation-circle text-red-500 text-4xl"></i>
            <i v-else class="fas fa-check-circle text-green-500 text-4xl"></i>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 text-center mt-4">
            {{ submissionError ? '¡Algo salió mal!' : '¡Registro Exitoso!' }}
          </h3>
          <p class="text-center text-gray-600 mt-2">
            {{ submissionError ? userFriendlyError : 'Tu registro se completó correctamente. Revisa tu correo para verificar tu cuenta.' }}
          </p>
          <button @click="closeResultDialog"
                  class="mt-4 w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
            Cerrar
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRegisterForm } from '@/composables/useRegisterForm';

export default defineComponent({
  name: 'RegisterForm',
  setup() {
    const {
      form,
      touched,
      isSubmitting,
      submissionError,
      handleFileUpload,
      submit,
      validateForm,
      passwordsMatch,
      isValidPassword
    } = useRegisterForm();

    const showResultDialog = ref(false);
    const fileInputKey = ref(0); // Clave dinámica para el input de archivo
    const userFriendlyError = ref('');

    const submitForm = async () => {
      isSubmitting.value = true;
      showResultDialog.value = false;

      try {
        await submit();
        showResultDialog.value = true;

        if (!submissionError.value) {
          form.firstName = '';
          form.lastName = '';
          form.email = '';
          form.username = '';
          form.password = '';
          form.confirmPassword = '';
          form.phoneNumber = '';
          form.role = 'USER';
          form.birthDate = '';
          form.document = null;
          fileInputKey.value++;

          for (const key in touched) {
            touched[key as keyof typeof touched] = false;
          }
        }
      } catch (error: any) {
        console.error('Detalles completos del error:', error);

        if (error.response && error.response.data && typeof error.response.data === 'string') {
          submissionError.value = error.response.data;
        } else if (error.response && error.response.data && error.response.data.message) {
          submissionError.value = error.response.data.message;
        } else {
          submissionError.value = 'No se pudo completar la solicitud. Verifica los datos e inténtalo nuevamente.';
        }

        userFriendlyError.value = handleUserErrorMessage(error);
        showResultDialog.value = true;
      } finally {
        isSubmitting.value = false;
      }
    };

    const handleUserErrorMessage = (error: any): string => {
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          return error.response.data.message;
        }
        switch (error.response.status) {
          case 400:
            return 'Algunos datos ingresados no son válidos. Verifica la información y vuelve a intentarlo.';
          case 403:
            return 'Este correo electrónico ya está registrado. Si no has verificado tu cuenta, revisa tu correo para verificarla o usa otro correo electrónico.';
          case 500:
            return 'Hubo un problema en nuestro servidor. Por favor, inténtalo de nuevo más tarde.';
          default:
            return `Error inesperado (${error.response.status}). Por favor, inténtalo de nuevo.`;
        }
      } else if (error.request) {
        return 'No pudimos conectar con el servidor. Verifica tu conexión a Internet e inténtalo de nuevo.';
      } else {
        return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.';
      }
    };

    const closeResultDialog = () => {
      showResultDialog.value = false;
      submissionError.value = '';
      userFriendlyError.value = '';
    };

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
      submissionError,
      handleFileUpload,
      submitForm,
      validateForm,
      passwordsMatch,
      showResultDialog,
      closeResultDialog,
      fileInputKey,
      userFriendlyError,
      formFields,
      isValidPassword,
    };
  },
});
</script>

<style scoped>
.has-error input {
  border-color: #f87171;
}
</style>
