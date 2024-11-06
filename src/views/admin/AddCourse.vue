<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Agregar Nuevo Curso</h1>
    <CourseForm :isEditing="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CourseForm from '@/components/form/CourseForm.vue';

export default defineComponent({
  name: 'AddCourse',
  components: {
    CourseForm,
  },
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
