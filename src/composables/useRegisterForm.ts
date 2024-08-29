// src/composables/useRegisterForm.ts

import { ref, reactive, computed } from 'vue';
import { useUserStore } from '@/stores/user';

export function useRegisterForm() {
  const userStore = useUserStore();

  const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
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

  const valid = ref(false);
  const isSubmitting = ref(false);
  const modalMessage = ref('Por favor, espera mientras procesamos tu solicitud.');
  const submissionError = ref('');

  // Computed property to check if passwords match
  const passwordsMatch = computed(() => form.password === form.confirmPassword);

  const validateForm = (): boolean => {
    return !!form.firstName && !!form.lastName && !!form.email && !!form.username &&
      !!form.password && passwordsMatch.value &&
      !!form.phoneNumber && !!form.role && !!form.birthDate && !!form.document;
  };

  const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      form.document = file;
    }
  };

  const submit = async () => {
    if (validateForm()) {
      isSubmitting.value = true;
      try {
        const formData = new FormData();

        for (const key in form) {
          if (key !== 'confirmPassword') {
            const value = form[key as keyof typeof form];
            if (value !== null) {
              formData.append(key, value as string | Blob);
            }
          }
        }

        await userStore.register(formData);

        // Clear form after successful submission
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

        for (const key in touched) {
          touched[key as keyof typeof touched] = false;
        }

        modalMessage.value = '¡Registro exitoso!';
        submissionError.value = '';
      } catch (error) {
        if (error instanceof Error) {
          modalMessage.value = 'Ocurrió un error al procesar tu solicitud.';
          submissionError.value = error.message;
        } else {
          modalMessage.value = 'Ocurrió un error desconocido.';
          submissionError.value = 'Error desconocido';
        }
      } finally {
        isSubmitting.value = false;
      }
    } else {
      console.error('Formulario no válido');
    }
  };

  return {
    form,
    touched,
    valid,
    isSubmitting,
    modalMessage,
    submissionError,
    handleFileUpload,
    submit,
    validateForm,
    passwordsMatch,
  };
}