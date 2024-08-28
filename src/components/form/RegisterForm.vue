<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">Registro</h2>
      <form @submit.prevent="submit">
        <!-- Campos del formulario -->
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium text-gray-700">
            Nombre <span class="text-red-500">*</span>
          </label>
          <input id="firstName" v-model="form.firstName" type="text" required
            @blur="touched.firstName = true"
            :class="{'border-red-500': touched.firstName && !form.firstName}"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="touched.firstName && !form.firstName" class="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>
        </div>

        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium text-gray-700">
            Apellido <span class="text-red-500">*</span>
          </label>
          <input id="lastName" v-model="form.lastName" type="text" required
            @blur="touched.lastName = true"
            :class="{'border-red-500': touched.lastName && !form.lastName}"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="touched.lastName && !form.lastName" class="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email <span class="text-red-500">*</span>
          </label>
          <input id="email" v-model="form.email" type="email" required
            @blur="touched.email = true"
            :class="{'border-red-500': touched.email && !form.email}"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="touched.email && !form.email" class="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>
        </div>

        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">
            Usuario <span class="text-red-500">*</span>
          </label>
          <input id="username" v-model="form.username" type="text" required
            @blur="touched.username = true"
            :class="{'border-red-500': touched.username && !form.username}"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="touched.username && !form.username" class="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Contraseña <span class="text-red-500">*</span>
          </label>
          <input id="password" v-model="form.password" type="password" required
            @blur="touched.password = true"
            :class="{'border-red-500': touched.password && !form.password}"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="touched.password && !form.password" class="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>
        </div>

        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
            Confirmar Contraseña <span class="text-red-500">*</span>
          </label>
          <input id="confirmPassword" v-model="confirmPassword" type="password" required
            @blur="touched.confirmPassword = true"
            :class="{'border-red-500': touched.confirmPassword && (!confirmPassword || form.password !== confirmPassword)}"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="touched.confirmPassword && form.password !== confirmPassword && confirmPassword !== ''" class="text-red-500 text-sm mt-2">Las contraseñas no coinciden.</p>
        </div>

        <div class="mb-4">
          <label for="phoneNumber" class="block text-sm font-medium text-gray-700">
            Número de Teléfono <span class="text-red-500">*</span>
          </label>
          <input id="phoneNumber" v-model="form.phoneNumber" type="text" required
            @blur="touched.phoneNumber = true"
            :class="{'border-red-500': touched.phoneNumber && !form.phoneNumber}"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="touched.phoneNumber && !form.phoneNumber" class="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>
        </div>

        <div class="mb-4">
          <label for="birthDate" class="block text-sm font-medium text-gray-700">
            Fecha de Nacimiento <span class="text-red-500">*</span>
          </label>
          <input id="birthDate" v-model="form.birthDate" type="date" required
            @blur="touched.birthDate = true"
            :class="{'border-red-500': touched.birthDate && !form.birthDate}"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="touched.birthDate && !form.birthDate" class="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>
        </div>

        <div class="mb-4">
          <label for="document" class="block text-sm font-medium text-gray-700">
            Documento <span class="text-red-500">*</span>
          </label>
          <input id="document" type="file" @change="handleFileUpload"
            @blur="touched.document = true"
            :class="{'border-red-500': touched.document && !form.document}"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="touched.document && !form.document" class="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>
        </div>

        <button type="submit" :disabled="!valid"
          class="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          :class="{'bg-gray-400 cursor-not-allowed': !valid, 'bg-indigo-600 hover:bg-indigo-700': valid}">
          Enviar
        </button>
      </form>
    </div>
    <!-- Modal -->
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
import { reactive, ref, watch } from 'vue';
import api from '@/services/api';

export default {
  name: 'RegisterForm',
  setup() {
    const form = reactive({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      phoneNumber: '',
      role: 'USER',
      birthDate: '',
      document: null as File | null,
      verified: false,
    });

    const touched = reactive({
      firstName: false,
      lastName: false,
      email: false,
      username: false,
      password: false,
      confirmPassword: false,
      phoneNumber: false,
      birthDate: false,
      document: false,
    });

    const confirmPassword = ref('');
    const valid = ref(false);
    const isSubmitting = ref(false);
    const modalMessage = ref('Por favor, espera mientras procesamos tu solicitud.');
    const submissionError = ref('');

    watch([form, confirmPassword], () => {
      valid.value = validateForm();
    }, { deep: true });

    const validateForm = (): boolean => {
      return !!form.firstName && !!form.lastName && !!form.email && !!form.username &&
        !!form.password && confirmPassword.value === form.password &&
        !!form.phoneNumber && !!form.role && !!form.birthDate && !!form.document;
    };

    const handleFileUpload = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        form.document = file;
      }
    };

    const submit = async () => {
      if (valid.value) {
        isSubmitting.value = true;
        try {
          const formData = new FormData();
          formData.append('firstName', form.firstName);
          formData.append('lastName', form.lastName);
          formData.append('email', form.email);
          formData.append('username', form.username);
          formData.append('password', form.password);
          formData.append('phoneNumber', form.phoneNumber);
          formData.append('role', form.role);
          formData.append('birthDate', form.birthDate);
          if (form.document) {
            formData.append('document', form.document);
          }
          formData.append('verified', 'false');

          const response = await api.register(formData);
          modalMessage.value = '¡Registro exitoso!';
          submissionError.value = '';

          // Limpiar el formulario después de un envío exitoso
          form.firstName = '';
          form.lastName = '';
          form.email = '';
          form.username = '';
          form.password = '';
          form.phoneNumber = '';
          form.role = 'USER';
          form.birthDate = '';
          form.document = null;
          confirmPassword.value = '';

          // Restablecer el estado touched
          Object.keys(touched).forEach(key => touched[key as keyof typeof touched] = false);

        } catch (error) {
          if (error instanceof Error) {
            modalMessage.value = 'Ocurrió un error al procesar tu solicitud.';
            submissionError.value = error.message;
          } else {
            modalMessage.value = 'Ocurrió un error desconocido.';
            submissionError.value = 'Error desconocido';
          }
        } finally {
          setTimeout(() => {
            isSubmitting.value = false;
          }, 2000);
        }
      } else {
        console.error('Formulario no válido');
      }
    };

    return {
      form,
      confirmPassword,
      valid,
      isSubmitting,
      modalMessage,
      submissionError,
      handleFileUpload,
      touched,
      submit,
    };
  },
};
</script>

<style scoped>
.has-error input {
  border-color: #f87171; /* Color rojo para indicar error */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active en versiones anteriores de Vue */ {
  opacity: 0;
}
</style>