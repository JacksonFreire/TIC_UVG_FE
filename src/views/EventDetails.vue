<template>
    <div class="container mx-auto py-8 px-4">
      <!-- Botón para volver a la lista -->
      <button @click="goBack" class="mb-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
        &larr; Volver a la lista de eventos
      </button>
  
      <!-- Mostrar un mensaje de carga mientras se obtienen los datos del evento -->
      <div v-if="!event" class="text-center text-gray-500">Cargando detalles del evento...</div>
  
      <!-- Detalles del Evento -->
      <div v-else class="bg-white shadow-lg rounded-lg overflow-hidden">
        <!-- Imagen del evento -->
        <div class="relative">
          <img :src="'data:image/jpeg;base64,' + event.image" alt="Event Image" class="w-full h-64 object-cover">
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
          <button @click="registerForEventHandler" class="mt-4 bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300">
            Inscribirse al Evento
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getEventById, registerForEvent } from '@/services/eventService';
  
  interface Event {
    id: number;
    name: string;
    description: string;
    location: string;
    price: number;
    image: string;
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
      const event = ref<Event | null>(null); // Inicializa como null
  
      const fetchEventDetails = async () => {
        const id = route.params.id as string;
        try {
          const response = await getEventById(id);
          event.value = response;
        } catch (error) {
          console.error('Error al obtener detalles del evento:', error);
        }
      };
  
      const goBack = () => {
        router.push({ name: 'EventsList' });
      };
  
      const formatDate = (date: string): string => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(date).toLocaleDateString('es-ES', options);
      };
  
      const registerForEventHandler = async () => {
        if (event.value) {
          try {
            await registerForEvent(event.value.id); // Ahora la función toma el argumento correctamente
            alert('Te has inscrito con éxito al evento.');
          } catch (error) {
            console.error('Error al inscribirse al evento:', error);
            alert('Hubo un problema al intentar inscribirse. Por favor, intenta nuevamente.');
          }
        }
      };
  
      onMounted(fetchEventDetails);
  
      return {
        event,
        goBack,
        formatDate,
        registerForEventHandler, // Mapeo el nombre para evitar conflictos
      };
    },
  });
  </script>  