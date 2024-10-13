<template>
  <div class="container mx-auto py-8 px-4">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">Lista de Eventos</h2>

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
            <div class="relative inline-block mx-2">
              <button
                  @click="viewEnrollments(event.id, event.name)"
                  class="text-blue-500 hover:text-blue-700"
                  aria-label="Ver Inscripciones"
              >
                <font-awesome-icon :icon="['fas', 'user']" />
              </button>
              <span class="tooltip-text">Ver Inscripciones</span>
            </div>
            <div class="relative inline-block mx-2">
              <button
                  @click="editEvent(event.id)"
                  class="text-yellow-500 hover:text-yellow-700"
                  aria-label="Editar Evento"
              >
                <font-awesome-icon :icon="['fas', 'edit']" />
              </button>
              <span class="tooltip-text">Editar Evento</span>
            </div>
            <div class="relative inline-block mx-2">
              <button
                  @click="deleteEvent(event.id)"
                  class="text-red-500 hover:text-red-700"
                  aria-label="Eliminar Evento"
              >
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
              <span class="tooltip-text">Eliminar Evento</span>
            </div>
            <div class="relative inline-block mx-2">
              <button
                  @click="viewDetails(event.id)"
                  class="text-green-500 hover:text-green-700"
                  aria-label="Ver Detalles"
              >
                <font-awesome-icon :icon="['fas', 'eye']" />
              </button>
              <span class="tooltip-text">Ver Detalles</span>
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

const events = ref([]);   // Almacena la lista de eventos
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
const viewEnrollments = (eventId: string, eventName: string) => {
  eventStore.setSelectedEvent(eventId, eventName);  // Guardamos el evento seleccionado en el store
  router.push({ name: 'EventEnrollments', params: { eventId: eventId } }); // Navegar a la vista de inscripciones
};

// Ver detalles del evento (Placeholder)
const viewDetails = (eventId: string) => {
  console.log('Ver detalles del evento:', eventId);
};

// Editar evento (Placeholder)
const editEvent = (eventId: string) => {
  console.log('Editar evento:', eventId);
};

// Eliminar evento (Placeholder)
const deleteEvent = (eventId: string) => {
  console.log('Eliminar evento:', eventId);
};

// Formatear la fecha de los eventos
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
};
</script>

<style scoped>
/* Estilos para tooltips mejorados */
.tooltip-text {
  visibility: hidden;
  width: auto;
  background-color: #4a4a4a;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 8px;
  position: absolute;
  z-index: 10;
  bottom: 140%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.4s, transform 0.4s;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.relative:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
  transform: translateX(-50%) translateY(-5px);
}

.relative button {
  transition: transform 0.2s;
}

.relative:hover button {
  transform: scale(1.1);
}
</style>
