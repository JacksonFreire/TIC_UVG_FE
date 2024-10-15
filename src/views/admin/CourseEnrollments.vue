<template>
  <div class="container mx-auto py-8 px-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">
        Lista de Participantes en {{ courseStore.selectedCourse.name }}
      </h2>

      <!-- Botón de "Generar Reporte" -->
      <button
          @click="generateReport"
          class="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          title="Generar Reporte de Inscritos"
      >
        <font-awesome-icon :icon="['fas', 'file-alt']" class="mr-2" />
        <span>Generar Reporte</span>
      </button>
    </div>

    <!-- Filtros de Búsqueda -->
    <div class="mb-4 flex flex-col md:flex-row justify-between md:items-center space-y-6 md:space-y-0">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar: nombre, username, teléfono"
          class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-2/3 lg:w-1/2 focus:outline-none focus:border-blue-400"
      />

      <select
          v-model="statusFilter"
          class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 lg:w-1/4 focus:outline-none focus:border-blue-400"
      >
        <option value="">Todos los Estados</option>
        <option value="confirmed">Confirmado</option>
        <option value="pending">Pendiente</option>
        <option value="canceled">Cancelado</option>
      </select>
    </div>

    <!-- Tabla de Participantes -->
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
          <td colspan="6" class="py-3 px-6 text-gray-500">Cargando participantes...</td>
        </tr>
        <template v-else v-for="participant in filteredParticipants" :key="participant.userId">
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
            <td class="py-3 px-6 text-center">
              <div class="relative inline-block mx-2">
                <button
                    @click="toggleComment(participant)"
                    class="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Agregar Comentario"
                >
                  <font-awesome-icon :icon="['fas', 'comment']" />
                </button>
                <span class="tooltip-text">Agregar Comentario</span>
              </div>
              <div class="relative inline-block mx-2">
                <button
                    @click="saveChanges(participant)"
                    class="text-green-500 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                    aria-label="Guardar Cambios"
                >
                  <font-awesome-icon :icon="['fas', 'save']" />
                </button>
                <span class="tooltip-text">Guardar Cambios</span>
              </div>
            </td>
          </tr>
          <tr v-if="participant.showComment || participant.comments">
            <td colspan="6" class="py-3 px-6">
                <textarea
                    v-model="participant.comments"
                    placeholder="Agregar comentario..."
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
                ></textarea>
            </td>
          </tr>
        </template>
        <tr v-if="!filteredParticipants.length && !isLoading" class="text-center">
          <td colspan="6" class="py-3 px-6 text-gray-500">No hay participantes inscritos en este curso.</td>
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
import { useCourseStore } from '@/stores/courseStore';
import { getEnrollmentsByCourse, saveEnrollmentChanges } from '@/services/coursesService';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const participants = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const statusFilter = ref('');
const courseStore = useCourseStore();

const notificationDialog = ref(null);
const dialogMessage = ref('');
const dialogType = ref('');

onMounted(async () => {
  const courseId = courseStore.selectedCourse.id;

  if (!courseId) {
    console.error('No se ha seleccionado ningún curso');
    isLoading.value = false;
    return;
  }

  try {
    participants.value = await getEnrollmentsByCourse(courseId);
    // Asegurar que los comentarios se muestren si existen
    participants.value.forEach((participant) => {
      if (participant.comments) {
        participant.showComment = true;
      }
    });
  } catch (error) {
    console.error('Error al cargar los participantes:', error);
  } finally {
    isLoading.value = false;
  }
});

const filteredParticipants = computed(() => {
  return participants.value.filter((participant) => {
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

const toggleComment = (participant) => {
  participant.showComment = !participant.showComment;
};

const saveChanges = async (participant) => {
  try {
    await saveEnrollmentChanges(participant);
    // Mostrar notificación de éxito con diálogo
    showDialog('Cambios guardados exitosamente', 'success');
  } catch (error) {
    // Mostrar notificación de error con diálogo
    showDialog('Error al guardar los cambios. Por favor, inténtelo de nuevo', 'error');
  }
};

const generateReport = () => {
  console.log('Generando reporte de inscritos para el curso...');
  // Aquí puedes implementar la lógica para generar un reporte
};

// Función para mostrar el diálogo de notificación
const showDialog = (message, type) => {
  dialogMessage.value = message;
  dialogType.value = type;
  if (notificationDialog.value) {
    notificationDialog.value.showModal();
  }
};

// Función para cerrar el diálogo
const closeDialog = () => {
  if (notificationDialog.value) {
    notificationDialog.value.close();
  }
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
  bottom: 120%;
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

/* Estilos para el diálogo de notificación */
dialog {
  border: none;
  padding: 0;
  border-radius: 12px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
}
</style>