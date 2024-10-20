<template>
  <form @submit.prevent="submitFormEvent" class="space-y-4">
    <!-- Campos del formulario -->
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Nombre del Evento</label>
      <input
          type="text"
          id="name"
          v-model="form.name"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
      />
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
      <textarea
          id="description"
          v-model="form.description"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
      ></textarea>
    </div>

    <div>
      <label for="startDate" class="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
      <input
          type="datetime-local"
          id="startDate"
          v-model="form.startDate"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
      />
    </div>

    <div>
      <label for="endDate" class="block text-sm font-medium text-gray-700">Fecha de Finalización</label>
      <input
          type="datetime-local"
          id="endDate"
          v-model="form.endDate"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
      />
    </div>

    <div>
      <label for="location" class="block text-sm font-medium text-gray-700">Lugar del Evento</label>
      <input
          type="text"
          id="location"
          v-model="form.location"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
      />
    </div>

    <div>
      <label for="price" class="block text-sm font-medium text-gray-700">Precio</label>
      <input
          type="number"
          id="price"
          v-model="form.price"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
      />
    </div>

    <div>
      <label for="category" class="block text-sm font-medium text-gray-700">Categoría</label>
      <input
          type="text"
          id="category"
          v-model="form.category"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
      />
    </div>

    <!-- Imagen -->
    <div>
      <label for="image" class="block text-sm font-medium text-gray-700">Imagen</label>
      <input type="file" id="image" @change="onFileChange" accept="image/*" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      <!-- Vista previa de la imagen si está disponible -->
      <div v-if="previewImage" class="mt-4">
        <img :src="previewImage" alt="Vista previa de la imagen" class="max-h-40 object-cover rounded-lg" />
      </div>
    </div>

    <div>
      <label for="additionalDetails" class="block text-sm font-medium text-gray-700">Detalles Adicionales</label>
      <textarea
          id="additionalDetails"
          v-model="form.additionalDetails"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
      ></textarea>
    </div>

    <div>
      <button type="submit" class="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              :disabled="isSubmittingLocal">
        <font-awesome-icon v-if="!isSubmittingLocal" :icon="['fas', 'save']" />
        <font-awesome-icon v-else :icon="['fas', 'spinner']" class="fa-spin" />
        <span v-if="!isSubmittingLocal">Guardar Evento</span>
        <span v-else>Guardando...</span>
      </button>
    </div>
  </form>

  <dialog ref="notificationDialog" class="rounded-lg shadow-xl p-6 max-w-md w-full">
    <div class="flex items-start px-4 py-3 rounded-lg" :class="dialogClass">
      <div class="flex-shrink-0 mr-4">
        <font-awesome-icon :icon="dialogIcon" class="text-3xl" />
      </div>
      <div>
        <h3 class="text-lg font-semibold" :class="dialogTitleClass">{{ dialogTitle }}</h3>
        <p class="mt-2 text-gray-700">{{ dialogMessage }}</p>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <button @click="closeDialog" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2">
        Cerrar
      </button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { createEvent, updateEvent } from '@/services/eventService';
import { useRouter } from 'vue-router';

const props = defineProps({
  existingEvent: {
    type: Object,
    default: () => ({
      id: null,
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      price: 0.0,
      category: '',
      image: null,
      additionalDetails: '',
    }),
  },
  isEditing: {
    type: Boolean,
    default: false,
  }
});

const form = ref({ ...props.existingEvent });
const isSubmittingLocal = ref(false);
const router = useRouter();
const previewImage = ref(form.value.image ? `data:image/jpeg;base64,${form.value.image}` : null);
const notificationDialog = ref(null);
const dialogMessage = ref('');
const dialogTitle = ref('');
const dialogClass = ref('');
const dialogIcon = ref(['fas', 'check-circle']);
const dialogTitleClass = ref('');

// Manejar la carga de imágenes
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input?.files?.length) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      form.value.image = reader.result as string;
      previewImage.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};

// Mostrar el diálogo de éxito o error
const showDialog = (message: string, type: 'success' | 'error') => {
  dialogMessage.value = message;
  if (type === 'success') {
    dialogTitle.value = 'Éxito';
    dialogClass.value = 'bg-green-100';
    dialogIcon.value = ['fas', 'check-circle'];
    dialogTitleClass.value = 'text-green-700';
  } else {
    dialogTitle.value = 'Error';
    dialogClass.value = 'bg-red-100';
    dialogIcon.value = ['fas', 'triangle-exclamation'];
    dialogTitleClass.value = 'text-red-700';
  }
  notificationDialog.value?.showModal();
};

// Cerrar el diálogo
const closeDialog = () => {
  notificationDialog.value?.close();
};

// Enviar el formulario para crear o actualizar el evento
const submitFormEvent = async () => {
  if (isSubmittingLocal.value) return;

  isSubmittingLocal.value = true;

  try {
    const payload = { ...form.value };
    payload.startDate = new Date(payload.startDate).toISOString();
    payload.endDate = new Date(payload.endDate).toISOString();

    if (props.isEditing) {
      await updateEvent(form.value.id, payload);
      showDialog('Evento actualizado exitosamente', 'success');
      await router.push({ name: 'AdminEventsList' }); // Redirigir a la lista de eventos
    } else {
      await createEvent(payload);
      showDialog('Evento creado exitosamente', 'success');
      await router.push({ name: 'AdminEventsList' }); // Redirigir a la lista de eventos
    }
  } catch (error) {
    console.error('Error al guardar el evento:', error);
    showDialog('Error al guardar el evento. Por favor, inténtelo de nuevo', 'error');
  } finally {
    isSubmittingLocal.value = false;
  }
};

// Actualizar el formulario cuando cambie el evento existente
watch(
    () => props.existingEvent,
    (newEvent) => {
      form.value = { ...newEvent };
      previewImage.value = newEvent.image ? `data:image/jpeg;base64,${newEvent.image}` : null;
    },
    { immediate: true }
);
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
