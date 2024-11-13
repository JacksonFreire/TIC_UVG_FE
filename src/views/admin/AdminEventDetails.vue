<template>
  <div v-if="event" class="h-full w-full flex justify-center items-start p-8 bg-gray-100 dark:bg-gray-900 overflow-auto">
    <div class="space-y-8 w-full max-w-4xl bg-white p-10 rounded-lg shadow-xl">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        <font-awesome-icon icon="calendar-alt" class="text-indigo-500 mr-2" />
        Detalles del Evento
      </h2>

      <!-- Información general del evento -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Nombre del Evento</label>
          <p class="mt-1 text-gray-900 font-semibold">{{ event.name }}</p>
        </div>
        <!-- Descripción ocupando una fila completa -->
        <div class="col-span-2">
          <label class="block text-base font-bold text-indigo-600 uppercase">Descripción</label>
          <p class="mt-1 text-gray-900">{{ event.description }}</p>
        </div>
      </div>

      <!-- Fechas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Fecha de Inicio</label>
          <p class="mt-1 text-gray-900">{{ formatDate(event.startDate) }}</p>
        </div>
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Fecha de Finalización</label>
          <p class="mt-1 text-gray-900">{{ formatDate(event.endDate) }}</p>
        </div>
      </div>

      <!-- Lugar del Evento -->
      <div class="mt-6">
        <label class="block text-base font-bold text-indigo-600 uppercase">Lugar del Evento</label>
        <p class="mt-1 text-gray-900">{{ event.location }}</p>
      </div>

      <!-- Precio y Categoría -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Precio</label>
          <p class="mt-1 text-gray-900">{{ formatCurrency(event.price) }}</p>
        </div>
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Categoría</label>
          <p class="mt-1 text-gray-900">{{ event.category }}</p>
        </div>
      </div>

      <!-- Imagen del Evento -->
      <div v-if="event.imageUrl" class="mt-8">
        <label class="block text-base font-bold text-indigo-600 uppercase">Imagen del Evento</label>
        <img :src="event.imageUrl" alt="Imagen del Evento" class="mt-4 max-h-60 object-cover rounded-lg shadow-sm" />
      </div>

      <!-- Detalles Adicionales -->
      <div class="mt-6">
        <label class="block text-base font-bold text-indigo-600 uppercase">Detalles Adicionales</label>
        <p class="mt-1 text-gray-900">{{ event.additionalDetails || 'N/A' }}</p>
      </div>
    </div>
  </div>
  <p v-else class="text-center text-gray-500">Cargando detalles del evento...</p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getEventById } from '@/services/eventService';
import { Event } from '@/models/Event';

const event = ref<Event | null>(null);
const route = useRoute();

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
};

onMounted(async () => {
  try {
    const eventId = route.params.id as string;
    event.value = await getEventById(eventId);
  } catch (error) {
    console.error('Error al cargar los detalles del evento:', error);
  }
});
</script>

<style scoped>
label {
  color: #4a5568;
}
</style>
