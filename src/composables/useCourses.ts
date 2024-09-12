// src/composables/useCourses.ts
import { ref, onMounted } from 'vue';
import { getCourses } from '@/services/coursesService';

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
}

export function useCourses() {
  const courses = ref<Course[]>([]);
  const isLoading = ref<boolean>(true);
  const error = ref<string | null>(null);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      courses.value = data;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchCourses);

  return {
    courses,
    isLoading,
    error,
  };
}