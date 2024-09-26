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

    <!-- Mostrar indicador de carga mientras se esperan los eventos -->
    <div v-if="isLoading" class="flex justify-center items-center my-10">
      <div class="flex items-center space-x-2">
        <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8c0 4.42-3.58 8-8 8a8 8 0 01-8-8z"></path>
        </svg>
        <span class="text-gray-700 font-medium text-lg">Cargando eventos...</span>
      </div>
    </div>

    <!-- Lista de eventos -->
    <div v-else class="divide-y divide-gray-200">
      <EventItem
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        @click="navigateToDetails(event.id)"
        class="cursor-pointer hover:bg-gray-50 transition duration-200 p-4 rounded-lg shadow hover:shadow-lg"
      />
    </div>

    <!-- Paginación Mejorada -->
    <div v-if="!isLoading" class="flex justify-center mt-8 space-x-2">
      <button
        @click="fetchEvents(currentPage - 1)"
        :disabled="currentPage === 0"
        class="px-4 py-2 mx-1 text-sm font-medium text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        &larr; Anterior
      </button>
      <span class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-full shadow-sm">
        Página {{ currentPage + 1 }} de {{ totalPages }}
      </span>
      <button
        @click="fetchEvents(currentPage + 1)"
        :disabled="currentPage >= totalPages - 1"
        class="px-4 py-2 mx-1 text-sm font-medium text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Siguiente &rarr;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllEvents } from '@/services/eventService';
import EventItem from '@/components/events/EventItem.vue';

interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  price: number;
  image: string;
  startDate: string;
  endDate: string;
  category: string;
}

export default defineComponent({
  name: 'EventsList',
  components: {
    EventItem,
  },
  setup() {
    const router = useRouter();
    const events = ref<Event[]>([]);
    const searchQuery = ref<string>('');
    const currentPage = ref<number>(0);
    const totalPages = ref<number>(0);
    const size = 4; // Tamaño de la página, 4 eventos por página
    const isLoading = ref<boolean>(true);

    const fetchEvents = async (page: number) => {
      isLoading.value = true;
      try {
        const response = await getAllEvents(page, size);
        events.value = response.content;
        totalPages.value = response.totalPages;
        currentPage.value = response.number;
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const filteredEvents = computed(() => {
      if (!searchQuery.value) return events.value;
      return events.value.filter(event =>
        event.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const navigateToDetails = (id: number) => {
      router.push({ name: 'EventDetails', params: { id: id.toString() } });
    };

    onMounted(() => fetchEvents(currentPage.value));

    return {
      events,
      searchQuery,
      filteredEvents,
      currentPage,
      totalPages,
      fetchEvents,
      navigateToDetails,
      isLoading,
    };
  },
});
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
