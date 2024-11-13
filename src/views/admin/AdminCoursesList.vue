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
                  @click="viewDetails(course.id)"
                  class="text-green-500 hover:text-green-700"
                  aria-label="Ver Detalles"
              >
                <font-awesome-icon :icon="['fas', 'eye']" />
              </button>
              <span class="tooltip-text group-hover:opacity-100">Ver Detalles</span>
            </div>
            <div class="relative inline-block group mx-2">
              <button
                  @click="deleteCourseHandler(course.id)"
                  class="text-red-500 hover:text-red-700"
                  aria-label="Eliminar Curso"
                  :disabled="isDeleting === course.id"
              >
              <font-awesome-icon v-if="isDeleting !== course.id" :icon="['fas', 'trash']" />
              <font-awesome-icon v-else :icon="['fas', 'spinner']" class="fa-spin" />
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
      <!-- Diálogo de notificación -->
      <dialog ref="notificationDialog" class="rounded-lg shadow-xl p-6 max-w-md w-full">
        <div class="flex items-start px-4 py-3 rounded-lg" :class="dialogClass">
          <div class="flex-shrink-0 mr-4">
            <font-awesome-icon :icon="dialogIcon" class="text-3xl" />
          </div>
          <div>
            <h3 class="text-lg font-semibold" :class="dialogTitleClass">{{ dialogTitle }}</h3>
            <p class="mt-2 text-gray-700">{{ dialogMessage }}</p>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button @click="closeDialog" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2">
            Cerrar
          </button>
        </div>
      </dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCourseStore } from '@/stores/courseStore';
import { getAllCourses, deleteCourse } from '@/services/coursesService';
import { Course } from '@/models/Course'; // Importar el modelo

const courses = ref<Course[]>([]); // Tipo explícito de Course[]
const isLoading = ref(true);
const router = useRouter();
const courseStore = useCourseStore();

const notificationDialog = ref<HTMLDialogElement | null>(null); // Ref correctamente tipada
const dialogMessage = ref('');
const dialogTitle = ref('');
const dialogClass = ref('');
const dialogIcon = ref(['fas', 'check-circle']);
const dialogTitleClass = ref('');
const isDeleting = ref<number | null>(null); // Usar el tipo number, ya que courseId es un número

// Mostrar el diálogo de éxito o error
const showDialog = (message: string, type: 'success' | 'error') => {
  dialogMessage.value = message;
  if (type === 'success') {
    dialogTitle.value = 'Éxito';
    dialogClass.value = 'bg-green-100';
    dialogIcon.value = ['fas', 'check-circle'];
    dialogTitleClass.value = 'text-green-700';
  } else {
    dialogTitle.value = 'Error';
    dialogClass.value = 'bg-red-100';
    dialogIcon.value = ['fas', 'triangle-exclamation'];
    dialogTitleClass.value = 'text-red-700';
  }
  notificationDialog.value?.showModal();
};

// Cerrar el diálogo
const closeDialog = () => {
  notificationDialog.value?.close();
};

// Cargar los cursos al montar el componente
onMounted(async () => {
  try {
    const response = await getAllCourses(0, 10); // Paginación opcional
    courses.value = response.content;
  } catch (error) {
    console.error('Error al cargar los cursos:', error);
  } finally {
    isLoading.value = false;
  }
});

// Eliminar un curso
const deleteCourseHandler = async (courseId: number) => {
  isDeleting.value = courseId; // Mostrar el loader para el curso que se está eliminando
  try {
    await deleteCourse(courseId);
    courses.value = courses.value.filter(course => course.id !== courseId); // Remover el curso de la lista
    showDialog('Curso eliminado exitosamente', 'success');
  } catch (error) {
    console.error('Error al eliminar el curso:', error);
    showDialog('Error al eliminar el curso', 'error');
  } finally {
    isDeleting.value = null;
  }
};

// Navegar a la vista de inscripciones
const viewEnrollments = (courseId: number, courseName: string) => {
  courseStore.setSelectedCourse(courseId, courseName);
  router.push({ name: 'CourseEnrollments', params: { courseId } });
};

// Editar un curso
const editCourse = (courseId: number) => {
  router.push({ name: 'UpdateCourse', params: { id: courseId } });
};

// Añadir un curso
const addCourse = () => {
  router.push({ name: 'AddCourse' });
};

const viewDetails = (courseId: number) => {
  router.push({ name: 'AdminCourseDetails', params: { id: courseId } });
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
