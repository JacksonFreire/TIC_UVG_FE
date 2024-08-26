import { ref, Ref } from 'vue';
import { useUserStore } from '@/store/user';

export function useRegister(form: Ref<any>) {
  const userStore = useUserStore();
  const valid = ref(false);

  const submit = async () => {
    // Validar que las contraseñas coincidan
    if (form.value.password !== form.value.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      // Crear un objeto FormData para enviar los datos
      const formData = new FormData();
      formData.append('firstName', form.value.firstName);
      formData.append('lastName', form.value.lastName);
      formData.append('email', form.value.email);
      formData.append('username', form.value.username);
      formData.append('password', form.value.password);
      formData.append('phoneNumber', form.value.phoneNumber);
      formData.append('role', form.value.role);
      formData.append('birthDate', form.value.birthDate);
      
      // Solo agregar el documento si está presente
      if (form.value.document) {
        formData.append('document', form.value.document);
      }

      await userStore.register(formData); // Se pasa el FormData en lugar del objeto Form

      // Aquí puedes agregar lógica para redirigir o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return {
    valid,
    submit,
  };
}