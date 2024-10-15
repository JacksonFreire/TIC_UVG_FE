<template>
  <div class="container mx-auto py-8 px-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Lista de Cursos</h2>
      <button
          class="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          @click="addCourse"
      >
        <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
        <span>Añadir Curso</span>
      </button>
    </div>

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
            <!-- Botones de acciones con tooltips usando CSS mejorado -->
            <div class="relative inline-block group mx-2">
              <button
                  @click="viewEnrollments(course.id, course.name)"
                  class="text-blue-500 hover:text-blue-700"
                  aria-label="Ver Inscripciones"
              >
                <font-awesome-icon :icon="['fas', 'user']" />
              </button>
              <span class="tooltip-text group-hover:opacity-100">Ver Inscripciones</span>
            </div>
            <div class="relative inline-block group mx-2">
              <button
                  @click="editCourse(course.id)"
                  class="text-yellow-500 hover:text-yellow-700"
                  aria-label="Editar Curso"
              >
                <font-awesome-icon :icon="['fas', 'edit']" />
              </button>
              <span class="tooltip-text group-hover:opacity-100">Editar Curso</span>
            </div>
            <div class="relative inline-block group mx-2">
              <button
                  @click="deleteCourse(course.id)"
                  class="text-red-500 hover:text-red-700"
                  aria-label="Eliminar Curso"
              >
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
              <span class="tooltip-text group-hover:opacity-100">Eliminar Curso</span>
            </div>
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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

// Editar un curso
const editCourse = (courseId: string) => {
  // Lógica para editar un curso
  console.log('Editar curso:', courseId);
};

// Eliminar un curso
const deleteCourse = (courseId: string) => {
  // Lógica para eliminar un curso
  console.log('Eliminar curso:', courseId);
};

// Añadir un curso
const addCourse = () => {
  // Lógica para añadir un nuevo curso
  console.log('Añadir nuevo curso');
};

// Formatear la fecha de los cursos
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
};
</script>

<style scoped>
/* Estilos para tooltips mejorados */
.tooltip-text {
  visibility: hidden;
  width: auto;
  background-color: #4a4a4a;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 8px;
  position: absolute;
  z-index: 10;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.4s, transform 0.4s;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.group:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
  transform: translateX(-50%) translateY(-5px);
}

.relative button {
  transition: transform 0.2s;
}

.relative:hover button {
  transform: scale(1.1);
}
</style>