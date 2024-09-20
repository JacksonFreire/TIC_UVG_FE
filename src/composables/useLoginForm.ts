// src/composables/useLoginForm.ts
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useRouter } from 'vue-router'; // Asegúrate de importar useRouter

export function useLoginForm() {
  const authStore = useAuthStore();
  const router = useRouter(); // Obtener el router para pasar como argumento

  const form = reactive({
    username: '',
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
        // Pasar el router como tercer argumento al llamar a login
        await authStore.login(form.username, form.password, router);
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
    v$, 
    submit,
    validateForm,
    authError,
  };
}