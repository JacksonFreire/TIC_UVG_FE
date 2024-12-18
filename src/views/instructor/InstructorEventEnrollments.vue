<template>
  <div class="w-full mx-auto py-8 px-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">
        Lista de Participantes en {{ eventStore.selectedEvent.name }}
      </h2>
    </div>

    <!-- Filtros de Búsqueda -->
    <div class="mb-4 flex flex-col md:flex-row justify-between md:items-center space-y-6 md:space-y-0">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar: nombre, username, teléfono"
          class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-2/3 lg:w-1/2 focus:outline-none focus:border-blue-400"
      />
    </div>

    <!-- Tabla de Participantes -->
    <div class="overflow-x-auto bg-white shadow-md rounded-lg w-full">
      <table class="min-w-full">
        <thead class="bg-gray-800 text-white">
        <tr>
          <th class="py-3 px-6 text-left">Nombre</th>
          <th class="py-3 px-6 text-left">Username</th>
          <th class="py-3 px-6 text-left">Teléfono</th>
          <th class="py-3 px-6 text-left">Email</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
        <!-- Mostrar un mensaje mientras se cargan los datos -->
        <tr v-if="isLoading" class="text-center">
          <td colspan="4" class="py-3 px-6 text-gray-500">Cargando participantes...</td>
        </tr>
        <!-- Mostrar la lista de participantes -->
        <template v-else v-for="participant in filteredParticipants" :key="participant.userId">
          <tr class="hover:bg-gray-50 transition duration-200">
            <td class="py-3 px-6">{{ participant.firstName }} {{ participant.lastName }}</td>
            <td class="py-3 px-6">{{ participant.username }}</td>
            <td class="py-3 px-6">{{ participant.phoneNumber }}</td>
            <td class="py-3 px-6">{{ participant.email }}</td>
          </tr>
        </template>
        <tr v-if="!filteredParticipants.length && !isLoading" class="text-center">
          <td colspan="4" class="py-3 px-6 text-gray-500">No hay participantes confirmados para este evento.</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useEventStore } from '@/stores/eventStore';
import { getEnrollmentsByEvent } from '@/services/eventService';
import { Participant } from '@/models/Participant'; // Importar el modelo

// Estado
const participants = ref<Participant[]>([]);
const isLoading = ref(true);
const searchQuery = ref('');
const eventStore = useEventStore();

// Cargar los participantes confirmados al montar
onMounted(async () => {
  const eventId = eventStore.selectedEvent.id;
  if (!eventId) {
    console.error('No se ha seleccionado ningún evento');
    isLoading.value = false;
    return;
  }

  try {
    console.log(eventId);
    participants.value = await getEnrollmentsByEvent(eventId);
  } catch (error) {
    console.error('Error al cargar los participantes:', error);
  } finally {
    isLoading.value = false;
  }
});

// Filtrar participantes según la búsqueda
const filteredParticipants = computed(() => {
  return participants.value.filter((participant) => {
    const matchesSearch = [
      participant.firstName.toLowerCase(),
      participant.lastName.toLowerCase(),
      participant.username.toLowerCase(),
      participant.phoneNumber,
    ].some((field) => field.includes(searchQuery.value.toLowerCase()));

    return matchesSearch;
  });
});
</script>

<style scoped>
.container {
  max-width: 1200px;
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

input {
  transition: border-color 0.2s ease-in-out;
}

input:focus {
  border-color: #3182ce;
}

.text-center {
  text-align: center;
}
</style>
