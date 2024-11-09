<template>
  <div class="container mx-auto py-8 px-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">
        Lista de Participantes en {{ eventStore.selectedEvent.name }}
      </h2>

      <!-- Botón de "Generar Reporte" mejorado -->
      <button
          @click="generateReport"
          class="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          title="Generar Reporte de Inscritos"
      >
        <font-awesome-icon :icon="['fas', 'file-alt']" class="mr-2" />
        <span>Generar Reporte</span>
      </button>
    </div>

    <!-- Filtros -->
    <div class="mb-4 flex flex-col md:flex-row justify-between md:items-center space-y-6 md:space-y-0">
      <!-- Campo de búsqueda mejorado -->
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar: nombre, username, teléfono"
          class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-2/3 lg:w-1/2 focus:outline-none focus:border-blue-400 focus:shadow-lg transition-shadow duration-300"
      />

      <!-- Filtro por estado mejorado -->
      <select
          v-model="statusFilter"
          class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 lg:w-1/4 focus:outline-none focus:border-blue-400 focus:shadow-lg transition-shadow duration-300"
      >
        <option value="">Todos los estados</option>
        <option value="confirmed">Confirmado</option>
        <option value="pending">Pendiente</option>
        <option value="canceled">Cancelado</option>
      </select>
    </div>

    <!-- Tabla de participantes -->
    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
      <table class="min-w-full">
        <thead class="bg-gray-800 text-white">
        <tr>
          <th class="py-3 px-6 text-left">Nombre</th>
          <th class="py-3 px-6 text-left">Username</th>
          <th class="py-3 px-6 text-left">Teléfono</th>
          <th class="py-3 px-6 text-left">Email</th>
          <th class="py-3 px-6 text-left">Estado de Inscripción</th>
          <th class="py-3 px-6 text-center">Acciones</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
        <tr v-if="isLoading" class="text-center">
          <td colspan="5" class="py-3 px-6 text-gray-500">Cargando participantes...</td>
        </tr>
        <template v-else v-for="participant in filteredParticipants" :key="participant.username">
          <tr class="hover:bg-gray-50 transition duration-200">
            <td class="py-3 px-6">{{ participant.firstName }} {{ participant.lastName }}</td>
            <td class="py-3 px-6">{{ participant.username }}</td>
            <td class="py-3 px-6">{{ participant.phoneNumber }}</td>
            <td class="py-3 px-6">{{ participant.email }}</td>
            <td class="py-3 px-6">
              <select v-model="participant.status" class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400">
                <option value="confirmed">Confirmado</option>
                <option value="pending">Pendiente</option>
                <option value="canceled">Cancelado</option>
              </select>
            </td>
            <td class="py-3 px-6 text-center relative">
              <div class="relative inline-block group">
                <button
                    @click="toggleComment(participant)"
                    class="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Agregar Comentario"
                >
                  <font-awesome-icon :icon="['fas', 'comment']" />
                </button>
                <span class="tooltip-text group-hover:opacity-100">Agregar Comentario</span>
              </div>
              <div class="relative inline-block group ml-4">
                <button
                    @click="saveChanges(participant)"
                    class="text-green-500 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                    aria-label="Guardar Cambios"
                >
                  <font-awesome-icon :icon="['fas', 'save']" />
                </button>
                <span class="tooltip-text group-hover:opacity-100">Guardar Cambios</span>
              </div>
            </td>
          </tr>
          <tr v-if="participant.showComment || participant.comments">
            <td colspan="5" class="py-3 px-6">
                <textarea
                    v-model="participant.comments"
                    placeholder="Agregar comentario..."
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
                ></textarea>
            </td>
          </tr>
        </template>
        <tr v-if="!filteredParticipants.length && !isLoading" class="text-center">
          <td colspan="5" class="py-3 px-6 text-gray-500">No hay participantes inscritos en este evento.</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Diálogo para notificaciones con diseño profesional -->
  <dialog ref="notificationDialog" class="rounded-lg shadow-xl p-6 max-w-md w-full">
    <div :class="{'bg-green-100': dialogType === 'success', 'bg-red-100': dialogType === 'error'}" class="flex items-start px-4 py-3 rounded-lg">
      <div :class="{'text-green-600': dialogType === 'success', 'text-red-600': dialogType === 'error'}" class="flex-shrink-0 mr-4">
        <font-awesome-icon :icon="dialogType === 'success' ? ['fas', 'check-circle'] : ['fas', 'exclamation-triangle']" class="text-3xl" />
      </div>
      <div>
        <h3 class="text-lg font-semibold" :class="{'text-green-700': dialogType === 'success', 'text-red-700': dialogType === 'error'}">
          {{ dialogType === 'success' ? 'Éxito' : 'Error' }}
        </h3>
        <p class="mt-2 text-gray-700">{{ dialogMessage }}</p>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <button @click="closeDialog" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2">Cerrar</button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useEventStore } from '@/stores/eventStore';
import { getEnrollmentsByEvent, saveEnrollmentChanges, downloadEventParticipantReport } from '@/services/eventService';
import { Participant } from '@/models/Participant'; // Importar el modelo Participant
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Tipar correctamente los estados
const participants = ref<Participant[]>([]); // Lista de participantes
const isLoading = ref(true); // Estado de carga
const searchQuery = ref(''); // Búsqueda por nombre, username o teléfono
const statusFilter = ref(''); // Filtro por estado
const eventStore = useEventStore(); // Obtener el store del evento

const notificationDialog = ref<HTMLDialogElement | null>(null); // Tipar correctamente el diálogo
const dialogMessage = ref('');
const dialogType = ref<'success' | 'error'>('success');

// Función para cargar los participantes al montar el componente
onMounted(async () => {
  const eventId = eventStore.selectedEvent.id; // Obtener el ID del evento desde el store

  if (!eventId) {
    console.error('No se ha seleccionado ningún evento');
    isLoading.value = false;
    return;
  }

  try {
    const enrollments = await getEnrollmentsByEvent(eventId);
    participants.value = enrollments.map((participant: Participant) => {
      return {
        ...participant,
        showComment: !!participant.comments, // Mostrar el comentario si ya existe
        comment: participant.comments || '', // Asegurar que comment esté siempre definido
      };
    });
  } catch (error) {
    console.error('Error al cargar los participantes:', error);
  } finally {
    isLoading.value = false;
  }
});

// Computed property para el filtrado de participantes
const filteredParticipants = computed(() => {
  return participants.value.filter((participant: Participant) => {
    const matchesStatus = statusFilter.value ? participant.status === statusFilter.value : true;
    const matchesSearch = [
      participant.firstName.toLowerCase(),
      participant.lastName.toLowerCase(),
      participant.username.toLowerCase(),
      participant.phoneNumber,
    ].some((field) => field.includes(searchQuery.value.toLowerCase()));

    return matchesStatus && matchesSearch;
  });
});

// Función para mostrar u ocultar comentarios
const toggleComment = (participant: Participant) => {
  participant.showComment = !participant.showComment;
};

// Función para guardar los cambios en la inscripción del participante
const saveChanges = async (participant: Participant) => {
  try {
    const enrollmentDTO = {
      userId: participant.userId,
      eventId: eventStore.selectedEvent.id,
      status: participant.status,
      comments: participant.comments || '',
    };

    if (!enrollmentDTO.userId) {
      throw new Error('Faltan datos requeridos para guardar los cambios: userId no encontrado.');
    }

    await saveEnrollmentChanges(enrollmentDTO);
    // Mostrar notificación de éxito con diálogo
    showDialog('Cambios guardados exitosamente', 'success');
  } catch (error) {
    console.error('Error al guardar los cambios:', error);
    // Mostrar notificación de error con diálogo
    showDialog('Error al guardar los cambios en la inscripción. Por favor verifica los datos e inténtalo de nuevo.', 'error');
  }
};

// Función para generar un reporte
const generateReport = async () => {
  console.log('Generando reporte de inscritos para el eventos...');
  const eventId = eventStore.selectedEvent.id;

  if (!eventId) {
    console.error('No se ha seleccionado ningún evento');
    return;
  }

  try {
    await downloadEventParticipantReport(eventId);
    showDialog('Reporte generado exitosamente', 'success');
  } catch (error) {
    showDialog('Error al generar el reporte. Intente de nuevo', 'error');
  }
};

// Función para mostrar el diálogo de notificación
const showDialog = (message: string, type: 'success' | 'error') => {
  dialogMessage.value = message;
  dialogType.value = type;
  notificationDialog.value?.showModal();
};

// Función para cerrar el diálogo
const closeDialog = () => {
  notificationDialog.value?.close();
};
</script>

<style scoped>
/* Estilos personalizados */
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
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
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

/* Estilos para el diálogo de notificación */
dialog {
  border: none;
  padding: 0;
  border-radius: 12px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
}
</style>