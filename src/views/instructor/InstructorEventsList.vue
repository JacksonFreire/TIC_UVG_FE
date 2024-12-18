<template>
  <div class="w-full mx-auto py-8 px-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Lista de Eventos</h2>
    </div>

    <!-- Lista de Eventos -->
    <div class="overflow-x-auto bg-white shadow-md rounded-lg w-full">
      <table class="min-w-full table-auto">
        <thead class="bg-gray-800 text-white">
        <tr>
          <th class="py-3 px-6 text-left">Nombre del Evento</th>
          <th class="py-3 px-6 text-left">Fecha de Inicio</th>
          <th class="py-3 px-6 text-left">Fecha de Terminación</th>
          <th class="py-3 px-6 text-center">Acciones</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
        <!-- Mostrar un mensaje mientras se cargan los datos -->
        <tr v-if="isLoading" class="text-center">
          <td colspan="4" class="py-3 px-6 text-gray-500">Cargando eventos...</td>
        </tr>
        <!-- Mostrar la lista de eventos -->
        <tr
            v-else
            v-for="event in events"
            :key="event.id"
            class="hover:bg-gray-50 transition duration-200"
        >
          <td class="py-3 px-6">{{ event.name }}</td>
          <td class="py-3 px-6">{{ formatDate(event.startDate) }}</td>
          <td class="py-3 px-6">{{ formatDate(event.endDate) }}</td>
          <td class="py-3 px-6 text-center">
            <button
                @click="viewParticipants(event.id, event.name)"
                class="text-blue-500 hover:text-blue-700"
                aria-label="Ver Participantes"
            >
              <font-awesome-icon :icon="['fas', 'user']" />
              <span class="ml-2 text-gray-600">Ver Participantes</span>
            </button>
          </td>
        </tr>
        <!-- Mostrar un mensaje si no hay eventos -->
        <tr v-if="!events.length && !isLoading" class="text-center">
          <td colspan="4" class="py-3 px-6 text-gray-500">No tienes eventos asignados.</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { getEventsByInstructorId } from '@/services/eventService';
import { useEventStore } from '@/stores/eventStore';

const events = ref([]); // Lista de eventos
const isLoading = ref(true);
const error = ref(false);

const router = useRouter();
const authStore = useAuthStore();
const eventStore = useEventStore();
const instructorId = authStore.getInstructorId; // Obtener el ID del instructor autenticado

// Función para formatear fechas
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
};

// Obtener los eventos asignados al instructor
const fetchEvents = async () => {
  isLoading.value = true;
  error.value = false;

  if (!instructorId) {
    console.error('ID de instructor no disponible');
    error.value = true;
    isLoading.value = false;
    return;
  }

  try {
    events.value = await getEventsByInstructorId(instructorId);
  } catch (err) {
    console.error('Error al obtener los eventos:', err);
    error.value = true;
  } finally {
    isLoading.value = false;
  }
};

// Navegar a la lista de participantes del evento
const viewParticipants = (eventId: number, eventName: string) => {
  eventStore.setSelectedEvent(eventId, eventName); // Reutiliza la lógica de selección
  router.push({ name: 'InstructorEventParticipants', params: { id: eventId } });
};

// Llamar a la función al montar el componente
onMounted(fetchEvents);
</script>

<style scoped>
.w-full {
  width: 100%;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 16px;
}

th {
  background-color: #2d3748;
  color: white;
  text-align: left;
}

tr:hover {
  background-color: #f8f9fa;
}

.text-center {
  text-align: center;
}

.text-gray-500 {
  color: #6b7280;
}

.text-blue-500:hover {
  color: #2563eb;
}

.text-gray-600 {
  color: #4b5563;
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

.transition {
  transition: all 0.2s ease-in-out;
}

.duration-200 {
  transition-duration: 200ms;
}
</style>
