<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Buscador -->
    <div class="relative mb-6">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar eventos..."
        class="w-full p-4 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />
      <svg class="absolute left-3 top-3 h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M21 21l-4.35-4.35a8 8 0 1 0-1.65 1.65L21 21zM4 10a6 6 0 1 1 12 0A6 6 0 0 1 4 10z"
        />
      </svg>
    </div>

    <!-- Lista de eventos -->
    <div class="divide-y divide-gray-200">
      <EventItem
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        @click="navigateToDetails(event.id)"
        class="cursor-pointer hover:bg-gray-100 transition duration-200 p-4"
      />
    </div>

    <!-- Paginación Mejorada -->
    <div class="flex justify-center mt-8">
      <button
        @click="fetchEvents(currentPage - 1)"
        :disabled="currentPage === 0"
        class="px-4 py-2 mx-1 text-sm font-medium text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        &larr; Anterior
      </button>
      <span class="px-4 py-2 text-sm font-medium text-gray-700">
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
    const size = 4; 

    const fetchEvents = async (page: number) => {
      try {
        const response = await getAllEvents(page, size);
        events.value = response.content;
        totalPages.value = response.totalPages;
        currentPage.value = response.number;
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
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

    const formatDate = (date: string): string => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleDateString('es-ES', options);
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
      formatDate,
    };
  },
});
</script>