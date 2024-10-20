<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Agregar Nuevo Curso</h1>
    <CourseForm :isEditing="false" @submit="handleCreateCourse" :isSubmitting="isSubmitting" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CourseForm from '@/components/form/CourseForm.vue';
import { createCourse } from '@/services/coursesService';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AddCourse',
  components: {
    CourseForm,
  },
  setup() {
    const router = useRouter();
    const isSubmitting = ref(false); // Nueva variable para controlar el estado de envío

    const handleCreateCourse = async (courseData: any) => {
      // Prevenir múltiples envíos
      if (isSubmitting.value) return;

      isSubmitting.value = true; // Bloquear el formulario mientras se procesa la solicitud

      try {
        await createCourse(courseData);
        console.log('Curso creado con éxito');
        router.push({ name: 'AdminCoursesList' }); // Redirigir a la lista de cursos una vez creado
      } catch (error) {
        console.error('Error al crear el curso:', error);
        // Puedes mostrar un mensaje de error al usuario si lo deseas
      } finally {
        isSubmitting.value = false; // Rehabilitar el formulario una vez que la solicitud termine
      }
    };

    return {
      handleCreateCourse,
      isSubmitting,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
