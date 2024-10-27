<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Botón para volver a la lista -->
    <button @click="goBack" class="mb-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
      &larr; Volver a la lista de eventos
    </button>

    <!-- Mostrar un mensaje de carga mientras se obtienen los datos del evento -->
    <div v-if="isLoading" class="text-center text-gray-500">Cargando detalles del evento...</div>

    <!-- Detalles del Evento -->
    <div v-else-if="event" class="bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Imagen del evento -->
      <div class="relative">
        <img :src="event.imageUrl" alt="Event Image" class="w-full h-64 object-cover">
        <div class="absolute bottom-2 left-2 bg-white text-gray-800 text-sm font-bold px-2 py-1 rounded shadow-md">
          {{ event.price > 0 ? '$' + event.price.toFixed(2) : 'Gratis' }}
        </div>
      </div>

      <div class="p-6">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ event.name }}</h2>
        <p class="text-gray-500 mb-4">{{ formatDate(event.startDate) }} - {{ formatDate(event.endDate) }}</p>
        <p class="text-sm text-gray-600 mb-4"><span class="font-semibold">Ubicación:</span> {{ event.location }}</p>
        <p class="text-gray-700 mb-4">{{ event.description }}</p>
        <p class="text-sm text-gray-600 mb-2"><span class="font-semibold">Categoría:</span> {{ event.category }}</p>

        <!-- Campo adicional para detalles del evento -->
        <p class="text-sm text-gray-600 mb-4"><span class="font-semibold">Detalles adicionales:</span> {{ event.additionalDetails }}</p>

        <!-- Botón para inscribirse al evento -->
        <button
            @click="registerForEventHandler"
            :disabled="isRegistered || isLoading"
            class="mt-4 bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          Inscribirse al Evento
        </button>
      </div>
    </div>

    <!-- Mensaje de error si no se pudo cargar el evento -->
    <div v-else class="text-center text-red-500">Error al cargar los detalles del evento.</div>

    <!-- Modal para mensajes -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <p class="text-lg text-gray-700">{{ modalMessage }}</p>
        <button @click="closeModal" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getEventById, registerForEvent, checkEventRegistration } from '@/services/eventService';
import { useAuthStore } from '@/stores/auth';

interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  price: number;
  imageUrl: string; // Cambio de image a imageUrl
  startDate: string;
  endDate: string;
  category: string;
  additionalDetails: string; // Campo para detalles adicionales del evento
}

export default defineComponent({
  name: 'EventDetails',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();
    const event = ref<Event | null>(null);
    const isLoading = ref(true);
    const isRegistered = ref(false);
    const showModal = ref(false);
    const modalMessage = ref('');

    const fetchEventDetails = async () => {
      const id = route.params.id as string;
      try {
        const response = await getEventById(id);
        event.value = response;

        // Verificar si el usuario ya está inscrito en el evento
        if (authStore.userDetails?.userId) {
          const registered = await checkEventRegistration(id, authStore.userDetails.userId);
          isRegistered.value = registered;
        }
      } catch (error) {
        console.error('Error al obtener detalles del evento:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const registerForEventHandler = async () => {
      if (!authStore.isLoggedIn) {
        // Guarda la URL actual para redirigir después del login
        localStorage.setItem('redirectUrl', router.currentRoute.value.fullPath);
        router.push({ name: 'Login' });
        return;
      }

      if (!event.value || !authStore.userDetails?.userId) {
        modalMessage.value = 'Información insuficiente para la inscripción.';
        showModal.value = true;
        return;
      }

      try {
        modalMessage.value = 'Procesando tu inscripción...';
        showModal.value = true;

        // Realiza la inscripción
        await registerForEvent(event.value.id, authStore.userDetails.userId);

        // Marcar como inscrito
        isRegistered.value = true;
        modalMessage.value = 'Te has inscrito con éxito al evento.';
        setTimeout(closeModal, 3000); // Cierra el modal después de 3 segundos
      } catch (error) {
        modalMessage.value = 'Hubo un problema al intentar inscribirse. Por favor, intenta nuevamente.';
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const goBack = () => {
      router.push({ name: 'EventsList' });
    };

    const formatDate = (date: string): string => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleDateString('es-ES', options);
    };

    onMounted(fetchEventDetails);

    return {
      event,
      isLoading,
      isRegistered,
      showModal,
      modalMessage,
      registerForEventHandler,
      closeModal,
      goBack,
      formatDate,
    };
  },
});
</script>

<style scoped>
/* Estilos para la modal y otros elementos */
</style>
