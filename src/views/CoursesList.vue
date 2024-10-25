<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Buscador -->
    <div class="relative mb-6">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar cursos..."
          class="w-full p-4 pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />
      <font-awesome-icon
          icon="search"
          class="absolute left-4 top-4 h-6 w-6 text-gray-400 pointer-events-none"
      />
    </div>

    <!-- Skeleton Loaders mientras se carga -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div class="animate-pulse bg-gray-200 rounded-lg p-4 h-48"></div>
      <div class="animate-pulse bg-gray-200 rounded-lg p-4 h-48"></div>
      <div class="animate-pulse bg-gray-200 rounded-lg p-4 h-48"></div>
    </div>

    <!-- Lista de cursos -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="course in filteredCourses"
          :key="course.id"
          class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
      >
        <!-- Imagen del curso con precio encima -->
        <div class="relative">
          <img
              :src="'data:image/jpeg;base64,' + course.image"
              alt="Imagen del curso"
              class="w-full h-40 object-cover"
          />
          <!-- Precio encima de la imagen -->
          <div class="absolute top-2 left-2 bg-white text-gray-800 text-sm font-bold px-2 py-1 rounded shadow-md">
            {{ course.price > 0 ? '$' + course.price.toFixed(2) : 'Gratis' }}
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ course.name }}</h3>
          <p class="text-sm text-gray-500 mb-2">
            <span class="font-semibold">Fecha:</span> {{ formatDate(course.startDate) }} - {{ formatDate(course.endDate) }}
          </p>
          <p class="text-sm text-gray-500 mb-4">
            <span class="font-semibold">Instructor:</span> {{ course.instructorName || 'No asignado' }}
          </p>
          <button
              @click="navigateToDetails(course.id)"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-300"
          >
            Ver más
          </button>
        </div>
      </div>
    </div>

    <!-- Paginación Mejorada -->
    <div v-if="!isLoading" class="flex justify-center mt-8 space-x-2">
      <button
          @click="loadPreviousPage"
          :disabled="currentPage === 0"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        &larr; Anterior
      </button>
      <span class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-full shadow-sm">
        Página {{ currentPage + 1 }} de {{ totalPagesCourses }}
      </span>
      <button
          @click="loadNextPage"
          :disabled="currentPage >= totalPagesCourses - 1"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
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

// Computed para filtrar los cursos según la búsqueda
const filteredCourses = computed(() => {
  if (!searchQuery.value) return dataStore.courses;
  return dataStore.courses.filter(course =>
      course.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Funciones de navegación para las páginas
const loadPreviousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1;
    dataStore.fetchCourses(currentPage.value);
  }
};

const loadNextPage = () => {
  if (currentPage.value < dataStore.totalPagesCourses - 1) {
    currentPage.value += 1;
    dataStore.fetchCourses(currentPage.value);
  }
};

// Función para navegar a los detalles del curso
const navigateToDetails = (id: number) => {
  router.push({ name: 'CourseDetails', params: { id: id.toString() } });
};

// Función para formatear fechas
const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
};

// Cargar cursos al montar el componente
onMounted(() => {
  dataStore.fetchCourses(currentPage.value);
});

// Acceso al estado de carga y totalPages desde la store
const { isLoading, totalPagesCourses } = dataStore;
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
