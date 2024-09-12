<!-- src/components/CourseCard.vue -->
<template>
  <div class="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
    <div class="relative">
      <!-- Mostrar la imagen del curso -->
      <img :src="'data:image/jpeg;base64,' + course.image" alt="Course Image" class="w-full h-48 object-cover" />
      <div class="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold px-2 py-1">
        Free
      </div>
      <div class="absolute top-0 right-0 bg-black text-white text-xs font-semibold px-2 py-1">
        {{ course.category || 'General' }}
      </div>
    </div>
    <div class="p-4">
      <h2 class="text-xl font-bold text-gray-800 mb-2">{{ course.name }}</h2>
      <p class="text-gray-600 mb-4">{{ course.description }}</p>
      <p class="text-sm text-gray-500 mb-2">
        <span class="font-semibold">Lugar:</span> {{ course.eventPlace }}
      </p>
      <p class="text-sm text-gray-500 mb-4">
        <span class="font-semibold">Fecha:</span> {{ formatDate(course.startDate) }} - {{ formatDate(course.endDate) }}
      </p>
      <div class="flex items-center justify-between">
        <!-- Cambiar a "Ver más" y agregar la navegación a la página de detalles -->
        <button @click="navigateToDetails" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Ver más
        </button>
        <p class="text-sm text-gray-500">
          {{ course.lessonsCount }} Lecciones | {{ course.studentsCount }} Estudiantes
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router'; // Importa el router

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

export default defineComponent({
  name: 'CourseCard',
  props: {
    course: {
      type: Object as PropType<Course>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter(); // Usar el router para la navegación

    const formatDate = (date: string): string => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('es-ES', options);
    };

    const navigateToDetails = () => {
      router.push({ name: 'CourseDetails', params: { id: props.course.id } });
    };

    return {
      formatDate,
      navigateToDetails,
    };
  },
});
</script>