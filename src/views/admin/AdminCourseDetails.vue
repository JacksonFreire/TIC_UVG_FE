<template>
  <div v-if="course" class="h-full w-full flex justify-center items-start p-8 bg-gray-100 dark:bg-gray-900 overflow-auto">
    <div class="space-y-8 w-full max-w-4xl bg-white p-10 rounded-lg shadow-xl">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        <font-awesome-icon icon="graduation-cap" class="text-indigo-500 mr-2" />
        Detalles del Curso
      </h2>

      <!-- Información general del curso -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Nombre del Curso</label>
          <p class="mt-1 text-gray-900 font-semibold">{{ course.name }}</p>
        </div>
        <!-- Descripción ocupando una fila completa -->
        <div class="col-span-2">
          <label class="block text-base font-bold text-indigo-600 uppercase">Descripción</label>
          <p class="mt-1 text-gray-900">{{ course.description }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Categoría</label>
          <p class="mt-1 text-gray-900">{{ course.category }}</p>
        </div>
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Número de Lecciones</label>
          <p class="mt-1 text-gray-900">{{ course.lessonsCount }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Número de Estudiantes</label>
          <p class="mt-1 text-gray-900">{{ course.studentsCount || "N/A" }}</p>
        </div>
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Precio</label>
          <p class="mt-1 text-gray-900">{{ formatCurrency(course.price) }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Duración</label>
          <p class="mt-1 text-gray-900">{{ course.duration }}</p>
        </div>
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Nivel</label>
          <p class="mt-1 text-gray-900">{{ course.level }}</p>
        </div>
      </div>

      <!-- Lugar del Evento -->
      <div class="mt-6">
        <label class="block text-base font-bold text-indigo-600 uppercase">Lugar del Evento</label>
        <p class="mt-1 text-gray-900">{{ course.eventPlace }}</p>
      </div>

      <!-- Imagen del Curso -->
      <div v-if="course.imageUrl" class="mt-8">
        <label class="block text-base font-bold text-indigo-600 uppercase">Imagen del Curso</label>
        <img :src="course.imageUrl" alt="Imagen del Curso" class="mt-4 max-h-60 object-cover rounded-lg shadow-sm" />
      </div>

      <!-- Fechas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Fecha de Inicio</label>
          <p class="mt-1 text-gray-900">{{ formatDate(course.startDate) }}</p>
        </div>
        <div>
          <label class="block text-base font-bold text-indigo-600 uppercase">Fecha de Finalización</label>
          <p class="mt-1 text-gray-900">{{ formatDate(course.endDate) }}</p>
        </div>
      </div>

      <!-- Instructor -->
      <div class="mt-8">
        <h3 class="text-lg font-bold text-gray-800 uppercase mb-3">
          <font-awesome-icon icon="chalkboard-teacher" class="text-green-500 mr-2" />
          Instructor
        </h3>
        <div class="flex items-center space-x-4">
          <img
              :src="`data:image/jpeg;base64,${course.instructor.profileImage}`"
              alt="Instructor Profile"
              class="w-16 h-16 rounded-full object-cover border border-gray-300"
          />
          <div>
            <p class="text-gray-900 font-semibold">{{ course.instructor.name }}</p>
            <p class="text-gray-500 text-sm">{{ course.instructor.bio }}</p>
          </div>
        </div>
      </div>

      <!-- Curriculums -->
      <div v-for="(curriculum, index) in course.curriculums" :key="curriculum.id" class="border p-4 rounded-md mb-4">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">
          <font-awesome-icon icon="book" class="text-blue-500 mr-2" />
          Curriculum {{ index + 1 }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-base font-bold text-indigo-600 uppercase">Nombre de la Sección</label>
            <p class="mt-1 text-gray-900">{{ curriculum.sectionName }}</p>
          </div>
          <div>
            <label class="block text-base font-bold text-indigo-600 uppercase">Nombre de la Lección</label>
            <p class="mt-1 text-gray-900">{{ curriculum.lessonName }}</p>
          </div>
        </div>
          <div class="col-span-1 md:col-span-2">
            <label class="block text-base font-bold text-indigo-600 uppercase">Contenido</label>
            <p class="mt-1 text-gray-900">{{ curriculum.content }}</p>
          </div>
          <!--
          <div>
            <label class="block text-base font-bold text-indigo-600 uppercase">Orden</label>
            <p class="mt-1 text-gray-900">{{ curriculum.order }}</p>
          </div>-->

      </div>
    </div>
  </div>
  <p v-else class="text-center text-gray-500">Cargando detalles del curso...</p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getCourseById } from '@/services/coursesService';
import { Course } from '@/models/Course';

const course = ref<Course | null>(null);
const route = useRoute();

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
};

onMounted(async () => {
  try {
    const courseId = route.params.id as string;
    course.value = await getCourseById(courseId);
  } catch (error) {
    console.error('Error al cargar los detalles del curso:', error);
  }
});
</script>

<style scoped>
label {
  color: #4a5568;
}
</style>
