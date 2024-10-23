<template>
  <div class="container mx-auto py-8 px-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Lista de Eventos</h2>
      <button
          class="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          @click="addEvent"
      >
        <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
        <span>Añadir Evento</span>
      </button>
    </div>

    <!-- Lista de Eventos -->
    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
      <table class="min-w-full">
        <thead class="bg-gray-800 text-white">
        <tr>
          <th class="py-3 px-6 text-left">Nombre del Evento</th>
          <th class="py-3 px-6 text-left">Fecha de Inicio</th>
          <th class="py-3 px-6 text-center">Acciones</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
        <tr v-if="isLoading" class="text-center">
          <td colspan="3" class="py-3 px-6 text-gray-500">Cargando eventos...</td>
        </tr>
        <tr v-else v-for="event in events" :key="event.id" class="hover:bg-gray-50 transition duration-200">
          <td class="py-3 px-6">{{ event.name }}</td>
          <td class="py-3 px-6">{{ formatDate(event.startDate) }}</td>
          <td class="py-3 px-6 text-center">
            <!-- Botones de acciones con tooltips usando CSS mejorado -->
            <div class="relative inline-block group mx-2">
              <button
                  @click="viewEnrollments(event.id, event.name)"
                  class="text-blue-500 hover:text-blue-700"
                  aria-label="Ver Inscripciones"
              >
                <font-awesome-icon :icon="['fas', 'user']" />
              </button>
              <span class="tooltip-text group-hover:opacity-100">Ver Inscripciones</span>
            </div>
            <div class="relative inline-block group mx-2">
              <button
                  @click="editEvent(event.id)"
                  class="text-yellow-500 hover:text-yellow-700"
                  aria-label="Editar Evento"
              >
                <font-awesome-icon :icon="['fas', 'edit']" />
              </button>
              <span class="tooltip-text group-hover:opacity-100">Editar Evento</span>
            </div>
            <div class="relative inline-block group mx-2">
              <button
                  @click="deleteEvent(event.id)"
                  class="text-red-500 hover:text-red-700"
                  aria-label="Eliminar Evento"
              >
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
              <span class="tooltip-text group-hover:opacity-100">Eliminar Evento</span>
            </div>
            <div class="relative inline-block group mx-2">
              <button
                  @click="viewDetails(event.id)"
                  class="text-green-500 hover:text-green-700"
                  aria-label="Ver Detalles"
              >
                <font-awesome-icon :icon="['fas', 'eye']" />
              </button>
              <span class="tooltip-text group-hover:opacity-100">Ver Detalles</span>
            </div>
          </td>
        </tr>
        <tr v-if="!events.length && !isLoading" class="text-center">
          <td colspan="3" class="py-3 px-6 text-gray-500">No hay eventos disponibles.</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEventStore } from '@/stores/eventStore'; // Importar el store de eventos
import { getAllEvents } from '@/services/eventService'; // Servicio para obtener la lista de eventos
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Event } from '@/models/Event';

const events = ref<Event[]>([]);   // Almacena la lista de eventos tipada
const isLoading = ref(true); // Estado de carga de los datos
const router = useRouter();
const eventStore = useEventStore(); // Usar el store de eventos

onMounted(async () => {
  try {
    // Llamada al servicio para obtener los eventos
    const response = await getAllEvents(0, 10); // Paginación opcional (0 = página, 10 = tamaño)
    events.value = response.content;
  } catch (error) {
    console.error('Error al cargar los eventos:', error);
  } finally {
    isLoading.value = false; // Finaliza la carga
  }
});

// Navegar a la vista de inscripciones
const viewEnrollments = (eventId: number, eventName: string) => {
  eventStore.setSelectedEvent(String(eventId), eventName);  // Guardamos el evento seleccionado en el store
  router.push({ name: 'EventEnrollments', params: { eventId } }); // Navegar a la vista de inscripciones
};

// Ver detalles del evento (Placeholder)
const viewDetails = (eventId: number) => {
  console.log('Ver detalles del evento:', eventId);
};

// Editar evento (Placeholder)
const editEvent = (eventId: number) => {
  console.log('Editar evento:', eventId);
};

// Eliminar evento (Placeholder)
const deleteEvent = (eventId: number) => {
  console.log('Eliminar evento:', eventId);
};

// Añadir un evento
const addEvent = () => {
  console.log('Añadir nuevo evento');
};

// Formatear la fecha de los eventos
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
};
</script>
