import { ref, onMounted } from 'vue';
import { getAllCourses } from '@/services/coursesService';

export function useCourses() {
  const courses = ref([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Parámetros para la paginación
  const currentPage = ref(1);
  const pageSize = ref(6); // Cambiar al tamaño de página que desees

  const fetchCourses = async () => {
    isLoading.value = true;
    try {
      // Llama a getAllCourses con los parámetros de paginación
      const data = await getAllCourses(currentPage.value, pageSize.value);
      courses.value = data.content; // Ajusta esto según la estructura de tu respuesta
    } catch (err) {
      error.value = 'Error al cargar los cursos.';
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchCourses);

  return {
    courses,
    isLoading,
    error,
    currentPage,
    pageSize,
    fetchCourses,
  };
}