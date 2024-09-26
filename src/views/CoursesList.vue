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
      <svg class="absolute left-4 top-4 h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M21 21l-4.35-4.35a8 8 0 1 0-1.65 1.65L21 21zM4 10a6 6 0 1 1 12 0A6 6 0 0 1 4 10z"
        />
      </svg>
    </div>

    <!-- Indicador de carga -->
    <div v-if="isLoading" class="flex justify-center items-center my-10">
      <div class="flex items-center space-x-2">
        <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8c0 4.42-3.58 8-8 8a8 8 0 01-8-8z"></path>
        </svg>
        <span class="text-gray-700 font-medium text-lg">Cargando cursos...</span>
      </div>
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
            <span class="font-semibold">Instructor:</span> {{ course.instructor?.name || 'No asignado' }}
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
        @click="fetchCourses(currentPage - 1)"
        :disabled="currentPage === 0"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        &larr; Anterior
      </button>
      <span class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-full shadow-sm">
        Página {{ currentPage + 1 }} de {{ totalPages }}
      </span>
      <button
        @click="fetchCourses(currentPage + 1)"
        :disabled="currentPage >= totalPages - 1"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Siguiente &rarr;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllCourses } from '@/services/coursesService';

interface Course {
  id: number;
  name: string;
  image: string; // Imagen en base64
  startDate: string;
  endDate: string;
  instructor: Instructor | null;
  price: number; // Añadido el campo de precio
}

interface Instructor {
  id: number;
  name: string;
  bio: string;
  profileImage: string; // Imagen en base64
}

export default defineComponent({
  name: 'CoursesList',
  setup() {
    const router = useRouter();
    const courses = ref<Course[]>([]);
    const searchQuery = ref<string>('');
    const isLoading = ref<boolean>(true);
    const currentPage = ref<number>(0);
    const totalPages = ref<number>(0);
    const size = 6; // Tamaño de la página, 6 cursos por página

    const fetchCourses = async (page: number) => {
      isLoading.value = true;
      try {
        const response = await getAllCourses(page, size);
        courses.value = response.content;
        totalPages.value = response.totalPages;
        currentPage.value = response.number;
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const filteredCourses = computed(() => {
      if (!searchQuery.value) return courses.value;
      return courses.value.filter(course =>
        course.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const navigateToDetails = (id: number) => {
      router.push({ name: 'CourseDetails', params: { id: id.toString() } });
    };

    const formatDate = (date: string): string => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('es-ES', options);
    };

    onMounted(() => fetchCourses(currentPage.value));

    return {
      courses,
      searchQuery,
      filteredCourses,
      navigateToDetails,
      formatDate,
      isLoading,
      currentPage,
      totalPages,
      fetchCourses,
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
