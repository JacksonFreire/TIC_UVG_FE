// src/composables/useLoginForm.ts

import { ref, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export function useLoginForm() {
  const authStore = useAuthStore();

  const form = reactive({
    username: '', // Cambiado a 'username' en lugar de 'email'
    password: '',
  });

  const touched = reactive({
    username: false,
    password: false,
  });

  const isSubmitting = ref(false);
  const authError = ref('');

  // Definir las reglas de validación
  const rules = reactive({
    username: { required },
    password: { required },
  });

  // Uso correcto de Vuelidate con TypeScript
  const v$ = useVuelidate(rules, form);

  const validateForm = (): boolean => {
    v$.value.$touch(); // Asegurar que se verifiquen todos los campos
    return !v$.value.$invalid; // Cambiar a v$.value para asegurar el uso correcto
  };

  const submit = async () => {
    if (validateForm()) {
      isSubmitting.value = true;
      authError.value = '';
      try {
        await authStore.login(form.username, form.password); // Cambiado a 'username'
      } catch (error) {
        authError.value = 'Credenciales incorrectas o error al iniciar sesión.';
      } finally {
        isSubmitting.value = false;
      }
    }
  };

  return {
    form,
    touched,
    isSubmitting,
    v$, // Cambiado de 'validations' a 'v$'
    submit,
    validateForm,
    authError,
  };
}