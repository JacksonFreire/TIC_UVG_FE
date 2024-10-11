<template>
  <div class="container mx-auto py-8 px-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">
        Lista de Participantes en {{ courseStore.selectedCourse.name }}
      </h2>

      <!-- Botón de "Generar Reporte" mejorado -->
      <button
          @click="generateReport"
          class="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          title="Generar Reporte de Inscritos"
      >
        <i class="fas fa-file-alt mr-2"></i>
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
          class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-2/3 lg:w-1/2"
      />

      <!-- Filtro por estado mejorado -->
      <select
          v-model="statusFilter"
          class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 lg:w-1/4"
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
          <th class="py-3 px-6 text-left">Estado de Inscripción</th>
          <th class="py-3 px-6 text-center">Acciones</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
        <tr v-if="isLoading" class="text-center">
          <td colspan="5" class="py-3 px-6 text-gray-500">Cargando participantes...</td>
        </tr>
        <tr v-else v-for="participant in filteredParticipants" :key="participant.username" class="hover:bg-gray-50 transition duration-200">
          <td class="py-3 px-6">{{ participant.firstName }} {{ participant.lastName }}</td>
          <td class="py-3 px-6">{{ participant.username }}</td>
          <td class="py-3 px-6">{{ participant.phoneNumber }}</td>
          <td class="py-3 px-6">
              <span
                  :class="{
                  'text-green-600 font-bold': participant.status === 'confirmed',
                  'text-yellow-600 font-bold': participant.status === 'pending',
                  'text-red-600 font-bold': participant.status === 'canceled',
                }"
              >
                {{ formatStatus(participant.status) }}
              </span>
          </td>
          <td class="py-3 px-6 text-center">
            <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              Ver Detalles
            </button>
          </td>
        </tr>
        <tr v-if="!filteredParticipants.length && !isLoading" class="text-center">
          <td colspan="5" class="py-3 px-6 text-gray-500">No hay participantes inscritos en este curso.</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCourseStore } from '@/stores/courseStore';
import { getEnrollmentsByCourse } from '@/services/coursesService'; // Servicio para obtener los participantes

const participants = ref([]); // Lista de participantes
const isLoading = ref(true); // Estado de carga
const searchQuery = ref(''); // Búsqueda por nombre, username o teléfono
const statusFilter = ref(''); // Filtro por estado
const courseStore = useCourseStore(); // Obtener el store del curso

onMounted(async () => {
  const courseId = courseStore.selectedCourse.id; // Obtener el ID del curso desde el store

  if (!courseId) {
    console.error('No se ha seleccionado ningún curso');
    isLoading.value = false;
    return;
  }

  try {
    participants.value = await getEnrollmentsByCourse(courseId);
  } catch (error) {
    console.error('Error al cargar los participantes:', error);
  } finally {
    isLoading.value = false;
  }
});

// Computed property para el filtrado
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

// Formatear el estado de inscripción
const formatStatus = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmado';
    case 'pending':
      return 'Pendiente';
    case 'canceled':
      return 'Cancelado';
    default:
      return status;
  }
};

// Placeholder para generar el reporte
const generateReport = () => {
  console.log('Generando reporte de inscritos...');
  // Aquí puedes implementar la lógica para generar un reporte
};
</script>

<style scoped>
/* Estilos personalizados */
</style>
