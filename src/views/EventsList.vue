<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Buscador -->
    <div class="relative mb-6">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar eventos..."
        class="w-full p-4 pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />
      <svg class="absolute left-4 top-4 h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M21 21l-4.35-4.35a8 8 0 1 0-1.65 1.65L21 21zM4 10a6 6 0 1 1 12 0A6 6 0 0 1 4 10z"
        />
      </svg>
    </div>

    <!-- Skeleton Loaders mientras se carga -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="animate-pulse bg-gray-200 rounded-lg p-4 h-48"></div>
      <div class="animate-pulse bg-gray-200 rounded-lg p-4 h-48"></div>
      <div class="animate-pulse bg-gray-200 rounded-lg p-4 h-48"></div>
    </div>

    <!-- Lista de eventos -->
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EventItem
          v-for="event in filteredEvents"
          :key="event.id"
          :event="event"
          @click="navigateToDetails(event.id)"
          class="cursor-pointer hover:bg-gray-50 transition duration-200 p-4 rounded-lg shadow hover:shadow-lg"
        />
      </div>
    </div>

    <!-- Paginación Mejorada -->
    <div v-if="!isLoading" class="flex flex-col items-center mt-8 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-2">
      <button
        @click="loadPreviousPage"
        :disabled="currentPage === 0"
        class="px-4 py-2 mx-1 text-sm font-medium text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        &larr; Anterior
      </button>
      <span class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-full shadow-sm">
        Página {{ currentPage + 1 }} de {{ totalPages }}
      </span>
      <button
        @click="loadNextPage"
        :disabled="currentPage >= totalPages - 1"
        class="px-4 py-2 mx-1 text-sm font-medium text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Siguiente &rarr;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/useDataStore'; // Importar la store de Pinia
import EventItem from '@/components/events/EventItem.vue';

const dataStore = useDataStore();
const router = useRouter();

const searchQuery = ref<string>('');
const currentPage = ref<number>(0);

// Funciones para cargar las páginas anteriores y siguientes
const loadPreviousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1;
    dataStore.fetchEvents(currentPage.value);
  }
};

const loadNextPage = () => {
  currentPage.value += 1;
  dataStore.fetchEvents(currentPage.value);
};

// Computed para filtrar los eventos según la búsqueda
const filteredEvents = computed(() => {
  if (!searchQuery.value) return dataStore.events;
  return dataStore.events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Función para navegar a los detalles del evento
const navigateToDetails = (id: number) => {
  router.push({ name: 'EventDetails', params: { id: id.toString() } });
};

// Cargamos los eventos al montar el componente
onMounted(() => dataStore.fetchEvents(currentPage.value));

// Acceso a los datos y al estado de carga desde la store
const { isLoading, totalPages } = dataStore;
</script>

<style scoped>
.container {
  max-width: 1200px;
}

input:focus {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

button:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

button:hover {
  transform: translateY(-2px);
}

button {
  transition: transform 0.2s, box-shadow 0.2s;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
}
</style>