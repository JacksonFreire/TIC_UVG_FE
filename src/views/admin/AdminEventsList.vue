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
            <!-- Botón para ver detalles del evento -->
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
            <div class="relative inline-block group mx-2">
              <button
                  @click="confirmDelete(event.id)"
                  class="text-red-500 hover:text-red-700"
                  aria-label="Eliminar Evento"
              >
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
              <span class="tooltip-text group-hover:opacity-100">Eliminar Evento</span>
            </div>
            <!--
            <div class="relative inline-block group mx-2">
              <button
                  @click="viewDetails(event.id)"
                  class="text-green-500 hover:text-green-700"
                  aria-label="Ver Detalles"
              >
                <font-awesome-icon :icon="['fas', 'eye']" />
              </button>
              <span class="tooltip-text group-hover:opacity-100">Ver Detalles</span>
            </div> -->
          </td>
        </tr>
        <tr v-if="!events.length && !isLoading" class="text-center">
          <td colspan="3" class="py-3 px-6 text-gray-500">No hay eventos disponibles.</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Diálogo de confirmación de eliminación -->
    <dialog ref="deleteDialog" class="rounded-lg shadow-xl p-6 max-w-md w-full">
      <div class="flex items-start px-4 py-3 rounded-lg bg-red-100">
        <div class="flex-shrink-0 mr-4">
          <font-awesome-icon :icon="['fas', 'triangle-exclamation']" class="text-3xl text-red-600" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-red-700">Confirmar Eliminación</h3>
          <p class="mt-2 text-gray-700">¿Estás seguro de que deseas eliminar este evento?</p>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="closeDialog" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all">
          Cancelar
        </button>
        <button @click="deleteEvent" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all ml-4" :disabled="isDeleting">
          <font-awesome-icon v-if="!isDeleting" :icon="['fas', 'trash']" />
          <font-awesome-icon v-else :icon="['fas', 'spinner']" class="fa-spin" />
          <span v-if="!isDeleting">Eliminar</span>
          <span v-else>Eliminando...</span>
        </button>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEventStore } from '@/stores/eventStore';
import { getAllEvents, deleteEvent as deleteEventService } from '@/services/eventService';
import { Event } from '@/models/Event'; // Importar el modelo Event

const events = ref<Event[]>([]);   // Lista de eventos tipada con el modelo Event
const isLoading = ref(true); // Estado de carga de los datos
const router = useRouter();
const eventStore = useEventStore();
const deleteDialog = ref<HTMLDialogElement | null>(null); // Referencia al diálogo de eliminación
const eventIdToDelete = ref<number | null>(null); // ID del evento que se va a eliminar (numérico)
const isDeleting = ref(false); // Estado del proceso de eliminación

onMounted(async () => {
  try {
    const response = await getAllEvents(0, 10); // Paginación opcional (0 = página, 10 = tamaño)
    events.value = response.content;
  } catch (error) {
    console.error('Error al cargar los eventos:', error);
  } finally {
    isLoading.value = false;
  }
});

// Confirmar eliminación de un evento
const confirmDelete = (eventId: number) => {
  eventIdToDelete.value = eventId;
  deleteDialog.value?.showModal();
};

// Cerrar el diálogo de confirmación
const closeDialog = () => {
  deleteDialog.value?.close();
  eventIdToDelete.value = null;
};

// Eliminar un evento con loader
const deleteEvent = async () => {
  if (!eventIdToDelete.value || isDeleting.value) return;

  isDeleting.value = true; // Mostrar loader

  try {
    await deleteEventService(eventIdToDelete.value);
    events.value = events.value.filter(event => event.id !== eventIdToDelete.value);
    closeDialog(); // Cerrar el diálogo después de eliminar
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
  } finally {
    isDeleting.value = false; // Ocultar loader
  }
};

// Navegar a la vista de inscripciones
const viewEnrollments = (eventId: number, eventName: string) => { // Ahora eventId es número
  eventStore.setSelectedEvent(eventId, eventName);
  router.push({ name: 'EventEnrollments', params: { eventId } });
};

// Navegar a la vista de edición de eventos
const editEvent = (eventId: number) => { // Ahora eventId es número
  router.push({ name: 'UpdateEvent', params: { id: eventId } });
};

// Navegar a la vista de detalles del evento
const viewDetails = (eventId: number) => {
  router.push({ name: 'AdminEventDetails', params: { id: eventId } });
};

// Añadir un evento
const addEvent = () => {
  router.push({ name: 'AddEvent' });
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
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.4s, transform 0.4s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.group:hover .tooltip-text {
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
