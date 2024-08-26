var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
export function useRegister(form) {
    const userStore = useUserStore();
    const valid = ref(false);
    const submit = () => __awaiter(this, void 0, void 0, function* () {
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
            yield userStore.register(formData); // Se pasa el FormData en lugar del objeto Form
            // Aquí puedes agregar lógica para redirigir o mostrar un mensaje de éxito
        }
        catch (error) {
            console.error('Error en el registro:', error);
        }
    });
    return {
        valid,
        submit,
    };
}
