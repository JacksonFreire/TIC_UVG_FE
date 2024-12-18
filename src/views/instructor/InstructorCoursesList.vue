<template>
  <div class="w-full mx-auto py-8 px-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Lista de Cursos</h2>
    </div>

    <!-- Lista de Cursos -->
    <div class="overflow-x-auto bg-white shadow-md rounded-lg w-full">
      <table class="min-w-full table-auto">
        <thead class="bg-gray-800 text-white">
        <tr>
          <th class="py-3 px-6 text-left">Nombre del Curso</th>
          <th class="py-3 px-6 text-left">Fecha de Inicio</th>
          <th class="py-3 px-6 text-left">Fecha de Terminación</th>
          <th class="py-3 px-6 text-center">Acciones</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
        <!-- Mostrar un mensaje mientras se cargan los datos -->
        <tr v-if="isLoading" class="text-center">
          <td colspan="3" class="py-3 px-6 text-gray-500">Cargando cursos...</td>
        </tr>
        <!-- Mostrar la lista de cursos -->
        <tr
            v-else
            v-for="course in courses"
            :key="course.id"
            class="hover:bg-gray-50 transition duration-200"
        >
          <td class="py-3 px-6">{{ course.name }}</td>
          <td class="py-3 px-6">{{ formatDate(course.startDate) }}</td>
          <td class="py-3 px-6">{{ formatDate(course.endDate) }}</td>
          <td class="py-3 px-6 text-center">
            <button
                @click="viewEnrollments(course.id, course.name)"
                class="text-blue-500 hover:text-blue-700"
                aria-label="Ver Inscripciones"
            >
              <font-awesome-icon :icon="['fas', 'user']" />
              <span class="ml-2 text-gray-600">Ver Participantes</span>
            </button>
            <!--<span class="ml-2 text-gray-600">Ver Participantes</span>-->
          </td>
        </tr>
        <!-- Mostrar un mensaje si no hay cursos -->
        <tr v-if="!courses.length && !isLoading" class="text-center">
          <td colspan="3" class="py-3 px-6 text-gray-500">No tienes cursos asignados.</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from '@/stores/courseStore';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { getCoursesByInstructorId } from '@/services/coursesService';
import { Course } from '@/models/Course';

const courseStore = useCourseStore();
const router = useRouter();

// Estado
const courses = ref<Course[]>([]);
const isLoading = ref(true);
const error = ref(false);

// Utilizar el ID del instructor autenticado
const authStore = useAuthStore();
const instructorId = authStore.getInstructorId;

// Función para formatear fechas
const formatDate = (date: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const parsedDate = typeof date === 'string' ? new Date(date) : date; // Maneja el caso de string o Date
  return parsedDate.toLocaleDateString('es-ES', options);
};

// Obtener los cursos asignados al instructor
const fetchCourses = async () => {
  isLoading.value = true;
  error.value = false;

  // Validación fuera del try-catch
  if (!instructorId) {
    console.error('ID de instructor no disponible');
    error.value = true;
    isLoading.value = false;
    return;
  }

  try {
    courses.value = await getCoursesByInstructorId(instructorId);
  } catch (err) {
    console.error('Error al obtener los cursos:', err);
    error.value = true;
  } finally {
    isLoading.value = false;
  }
};

const viewEnrollments = (courseId: number, courseName: string) => {
  // Configurar el curso seleccionado
  courseStore.setSelectedCourse(courseId, courseName);

  // Redirigir a la página de participantes
  router.push({ name: 'InstructorCourseEnrollments', params: { id: courseId } });
};

// Llamar a la función al montar el componente
onMounted(fetchCourses);
</script>

<style scoped>
.w-full {
  width: 100%;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 16px;
}

th {
  background-color: #2d3748;
  color: white;
  text-align: left;
}

tr:hover {
  background-color: #f8f9fa;
}

.text-center {
  text-align: center;
}

.text-gray-500 {
  color: #6b7280;
}

.text-blue-500:hover {
  color: #2563eb;
}

.text-gray-600 {
  color: #4b5563;
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

.transition {
  transition: all 0.2s ease-in-out;
}

.duration-200 {
  transition-duration: 200ms;
}
</style>
