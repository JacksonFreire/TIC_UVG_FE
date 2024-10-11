<template>
  <div class="container mx-auto py-8 px-4">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">Lista de Cursos</h2>

    <!-- Lista de Cursos -->
    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
      <table class="min-w-full">
        <thead class="bg-gray-800 text-white">
        <tr>
          <th class="py-3 px-6 text-left">Nombre del Curso</th>
          <th class="py-3 px-6 text-left">Fecha de Inicio</th>
          <th class="py-3 px-6 text-center">Acciones</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
        <tr v-if="isLoading" class="text-center">
          <td colspan="3" class="py-3 px-6 text-gray-500">Cargando cursos...</td>
        </tr>
        <tr v-else v-for="course in courses" :key="course.id" class="hover:bg-gray-50 transition duration-200">
          <td class="py-3 px-6">{{ course.name }}</td>
          <td class="py-3 px-6">{{ formatDate(course.startDate) }}</td>
          <td class="py-3 px-6 text-center">
            <!-- Botón para ver inscripciones -->
            <button
                @click="viewEnrollments(course.id, course.name)"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Ver Inscripciones
            </button>
          </td>
        </tr>
        <tr v-if="!courses.length && !isLoading" class="text-center">
          <td colspan="3" class="py-3 px-6 text-gray-500">No hay cursos disponibles.</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCourseStore } from '@/stores/courseStore'; // Importar el store de cursos
import { getAllCourses } from '@/services/coursesService'; // Servicio para obtener la lista de cursos

const courses = ref([]);   // Almacena la lista de cursos
const isLoading = ref(true); // Estado de carga de los datos
const router = useRouter();
const courseStore = useCourseStore(); // Usar el store de cursos

onMounted(async () => {
  try {
    // Llamada al servicio para obtener los cursos
    const response = await getAllCourses(0, 10); // Paginación opcional (0 = página, 10 = tamaño)
    courses.value = response.content;
  } catch (error) {
    console.error('Error al cargar los cursos:', error);
  } finally {
    isLoading.value = false; // Finaliza la carga
  }
});

// Navegar a la vista de inscripciones
const viewEnrollments = (courseId: string, courseName: string) => {
  courseStore.setSelectedCourse(courseId, courseName);  // Guardamos el curso seleccionado en el store
  router.push({ name: 'CourseEnrollments', params: { courseId } }); // Navegar a la vista de inscripciones
};

// Formatear la fecha de los cursos
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
};
</script>

<style scoped>
/* Estilos opcionales */
</style>