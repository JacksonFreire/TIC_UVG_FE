// src/composables/useRegister.ts
import { ref, Ref } from 'vue';
import { useUserStore } from '@/store/user';
import { Form } from '@/models/request/form'; // Importa la interfaz Form

export function useRegister(form: Ref<Form>) {
  const userStore = useUserStore();
  const valid = ref(false);

  const submit = async () => {
    if (form.value.password !== form.value.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await userStore.register(form.value); // Se pasa un objeto de tipo Form
      // Redirigir o mostrar mensaje de éxito
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return {
    valid,
    submit,
  };
}