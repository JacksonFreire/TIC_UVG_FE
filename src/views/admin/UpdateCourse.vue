<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Actualizar Curso</h1>
    <div v-if="isLoading" class="text-center text-gray-500">Cargando detalles del curso...</div>
    <div v-else>
      <!-- El @submit ya no gestiona nada desde UpdateCourse.vue -->
      <CourseForm :isEditing="true" :existingCourse="course" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import CourseForm from '@/components/form/CourseForm.vue';
import { getCourseById } from '@/services/coursesService';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'UpdateCourse',
  components: {
    CourseForm,
  },
  setup() {
    const route = useRoute();
    const course = ref({
      id: 0,
      name: '',
      description: '',
      category: '',
      lessonsCount: 0,
      studentsCount: 0,
      price: 0,
      duration: '',
      level: '',
      eventPlace: '',
      image: '',
      startDate: '',
      endDate: '',
      createdAt: '',
      updatedAt: '',
      curriculums: [],
    });
    const isLoading = ref(true);

    const fetchCourseDetails = async () => {
      try {
        const courseId = route.params.id as string;
        course.value = await getCourseById(courseId); // Directamente asigna el valor sin usar 'response'
      } catch (error) {
        console.error('Error al cargar los detalles del curso:', error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(fetchCourseDetails);

    return {
      course,
      isLoading,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
