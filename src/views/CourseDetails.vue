<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Botón para volver a la lista de cursos -->
    <button @click="goBack" class="mb-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
      &larr; Volver a la lista de cursos
    </button>

    <div v-if="course" class="bg-white shadow-md rounded-lg p-6">
      <!-- Encabezado del curso usando Flexbox para alinear el texto y la imagen -->
      <div class="flex flex-col md:flex-row items-start mb-6 space-y-4 md:space-y-0 md:space-x-6">
        <div class="flex-1">
          <h1 class="text-4xl font-bold text-gray-800 mb-2">{{ course.name }}</h1>
          <p class="text-lg text-gray-600 mb-2">{{ course.description }}</p>
          <p class="text-sm text-gray-500 mb-1">
            <span class="font-semibold">Fecha:</span> {{ formatDate(course.startDate) }} - {{ formatDate(course.endDate) }}
          </p>
          <p class="text-sm text-gray-500">
            <span class="font-semibold">Lugar:</span> {{ course.eventPlace }}
          </p>
        </div>
        <div class="w-48 flex-shrink-0">
          <img :src="'data:image/jpeg;base64,' + course.image" alt="Imagen del curso" class="rounded-lg shadow-md w-full h-48 object-cover">
        </div>
      </div>

      <!-- Información del Instructor -->
      <div v-if="course.instructor" class="flex items-center mb-6 border-t pt-4">
        <div class="w-16 h-16 mr-4">
          <img :src="'data:image/jpeg;base64,' + course.instructor.profileImage" alt="Instructor Image" class="rounded-full w-full h-full object-cover shadow-md">
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-700">{{ course.instructor.name }}</h3>
          <p class="text-sm text-gray-500">{{ course.instructor.bio }}</p>
        </div>
      </div>

      <!-- Currículo del curso -->
      <div class="bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
        <h2 class="text-2xl font-bold text-gray-700 mb-4">Currículo del Curso</h2>
        <ul>
          <li v-for="curriculum in course.curriculums" :key="curriculum.id" class="mb-4">
            <div class="p-4 bg-white shadow rounded-lg">
              <h3 class="text-xl font-semibold text-blue-600">{{ curriculum.sectionName }} - {{ curriculum.lessonName }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ curriculum.content }}</p>
              <p class="text-xs text-gray-500"><span class="font-semibold">Duración:</span> {{ curriculum.duration }}</p>
              <p class="text-xs text-gray-500"><span class="font-semibold">Tipo:</span> {{ curriculum.type }}</p>
              <a v-if="curriculum.resourceLink" :href="curriculum.resourceLink" target="_blank" class="text-blue-500 hover:underline text-sm">Ver recurso</a>
            </div>
          </li>
        </ul>
      </div>

      <!-- Botón de Inscripción -->
      <div class="text-center">
        <button class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
          Inscribirme
        </button>
      </div>
    </div>

    <!-- Mensaje de carga o error -->
    <div v-else>
      <p v-if="isLoading" class="text-center text-gray-500">Cargando detalles del curso...</p>
      <p v-else class="text-center text-red-500">Error al cargar los detalles del curso.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCourseById } from '@/services/coursesService';

interface Course {
  id: number;
  name: string;
  description: string;
  category: string | null;
  lessonsCount: number;
  studentsCount: number;
  price: number;
  duration: string | null;
  level: string | null;
  eventPlace: string;
  image: string; // Imagen en base64
  startDate: string;
  endDate: string;
  instructor: Instructor | null;
  curriculums: Curriculum[];
}

interface Instructor {
  id: number;
  name: string;
  bio: string;
  profileImage: string; // Imagen en base64
}

interface Curriculum {
  id: number;
  sectionName: string;
  lessonName: string;
  content: string;
  order: number | null;
  duration: string | null;
  type: string | null;
  resourceLink: string | null;
  isMandatory: boolean;
}

export default defineComponent({
  name: 'CourseDetails',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const course = ref<Course | null>(null);
    const isLoading = ref(true);
    const error = ref<string | null>(null);

    const fetchCourseDetails = async () => {
      try {
        const courseId = route.params.id as string;
        const courseData = await getCourseById(courseId);
        
        // Ordenar el currículo por el campo "order"
        courseData.curriculums.sort((a: Curriculum, b: Curriculum) => (a.order ?? 0) - (b.order ?? 0));
        
        course.value = courseData;
      } catch (err) {
        error.value = 'Error al cargar los detalles del curso.';
      } finally {
        isLoading.value = false;
      }
    };

    const goBack = () => {
      router.push({ name: 'CoursesList' });
    };

    const formatDate = (date: string): string => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('es-ES', options);
    };

    onMounted(fetchCourseDetails);

    return {
      course,
      isLoading,
      error,
      formatDate,
      goBack, // Agregar función de regreso
    };
  },
});
</script>