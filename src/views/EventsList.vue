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
      <font-awesome-icon
          icon="search"
          class="absolute left-4 top-4 h-6 w-6 text-gray-400 pointer-events-none"
      />
    </div>

    <!-- Skeleton Loaders mientras se carga -->
    <div v-if="isLoading" class="space-y-6 mb-6">
      <div class="animate-pulse bg-gray-200 rounded-lg p-4 h-64"></div>
      <div class="animate-pulse bg-gray-200 rounded-lg p-4 h-64"></div>
      <div class="animate-pulse bg-gray-200 rounded-lg p-4 h-64"></div>
    </div>

    <!-- Lista de eventos -->
    <div v-else>
      <div class="space-y-6">
        <div
            v-for="event in filteredEvents"
            :key="event.id"
            class="event-item bg-white rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer flex flex-col lg:flex-row h-auto lg:h-64 overflow-hidden"
            @click="navigateToDetails(event.id)"
        >
          <!-- Información del Evento -->
          <div class="w-full lg:w-2/3 p-6 flex flex-col order-2 lg:order-1">
            <h2 class="text-2xl font-bold mb-2 line-clamp-1">{{ event.name }}</h2>
            <!-- Limitar la descripción a 3 líneas -->
            <p class="text-gray-700 mb-4 overflow-hidden line-clamp-3 flex-grow">
              {{ event.description }}
            </p>
            <!-- Ubicación y Precio -->
            <div class="mt-2 text-gray-600">
              <p class="flex items-center">
                <font-awesome-icon icon="map-marker-alt" class="h-5 w-5 text-blue-600 mr-2" />
                {{ event.location }}
              </p>
              <p class="flex items-center mt-1">
                <font-awesome-icon icon="tag" class="h-5 w-5 text-green-600 mr-2" />
                {{ formatPrice(event.price) }}
              </p>
            </div>
            <!-- Fecha -->
            <p class="mt-4 text-gray-800 font-medium">
              <font-awesome-icon icon="calendar-alt" class="h-5 w-5 text-red-600 inline-block mr-2" />
              {{ formatDateRange(event.startDate, event.endDate) }}
            </p>
          </div>
          <!-- Imagen del Evento -->
          <div class="w-full lg:w-1/3 flex-shrink-0 flex items-center justify-center bg-gray-100 order-1 lg:order-2">
            <img
                :src="`data:image/jpeg;base64,${event.image}`"
                alt="Imagen del evento"
                class="event-image w-full h-48 lg:h-full object-cover transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Paginación Mejorada -->
    <div
        v-if="!isLoading"
        class="flex flex-col items-center mt-8 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-2"
    >
      <button
          @click="loadPreviousPage"
          :disabled="currentPage === 0"
          class="px-4 py-2 mx-1 text-sm font-medium text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        &larr; Anterior
      </button>
      <span class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-full shadow-sm">
        Página {{ currentPage + 1 }} de {{ totalPagesEvents }}
      </span>
      <button
          @click="loadNextPage"
          :disabled="currentPage >= totalPagesEvents - 1"
          class="px-4 py-2 mx-1 text-sm font-medium text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Siguiente &rarr;
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/useDataStore'; // Importa la store de Pinia

const dataStore = useDataStore();
const router = useRouter();

const searchQuery = ref<string>(''); // Búsqueda del usuario
const currentPage = ref<number>(0); // Página actual

// Funciones para cargar las páginas anteriores y siguientes
const loadPreviousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1;
    dataStore.fetchEvents(currentPage.value);
  }
};

const loadNextPage = () => {
  if (currentPage.value < dataStore.totalPagesEvents - 1) {
    currentPage.value += 1;
    dataStore.fetchEvents(currentPage.value);
  }
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

// Función para formatear el rango de fechas
const formatDateRange = (start: string, end: string): string => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  if (start === end) {
    return startDate.toLocaleDateString('es-ES', options);
  } else {
    return `${startDate.toLocaleDateString('es-ES', options)} - ${endDate.toLocaleDateString('es-ES', options)}`;
  }
};

// Función para formatear el precio
const formatPrice = (amount: number): string => {
  if (amount === 0) {
    return 'Gratis';
  }
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
};

// Cargamos los eventos al montar el componente
onMounted(() => dataStore.fetchEvents(currentPage.value));

// Acceso al estado de carga y totalPages desde la store
const { isLoading, totalPagesEvents } = dataStore;
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

.event-item:hover .event-image {
  transform: scale(1.05);
}

.event-item:hover .event-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
