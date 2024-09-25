<template>
  <div class="home-page">
    <!-- Sección Hero -->
    <section class="hero bg-cover bg-center py-16" :style="{ backgroundImage: `url(${bannerImage})` }">
      <div class="overlay"></div>
      <div class="container mx-auto text-center text-white relative z-10">
        <h1 class="text-4xl font-bold mb-4 animate-fadeIn">
          Inscríbete fácil y rápido. Potencia tu integración en Italia con nuestra plataforma digital.
        </h1>
      </div>
    </section>

    <!-- Sección: ¿Por qué elegirnos? -->
    <section class="my-12">
      <h2 class="text-3xl font-bold text-center text-blue-700 mb-8">¿Por qué elegirnos?</h2>
      <div class="container mx-auto grid md:grid-cols-3 gap-8">
        <div class="card bg-white shadow-md rounded p-6 transform transition hover:scale-105">
          <img src="@/assets/comunidad.png" alt="Compromiso" class="w-full h-32 object-cover mb-4 rounded">
          <h3 class="text-xl font-semibold text-blue-700">Compromiso con la Comunidad</h3>
          <p>
            Promovemos el desarrollo educativo y profesional con cursos adaptados a la comunidad ecuatoriana en Italia.
          </p>
        </div>
        <div class="card bg-white shadow-md rounded p-6 transform transition hover:scale-105">
          <img src="@/assets/diversidad.png" alt="Diversidad" class="w-full h-32 object-cover mb-4 rounded">
          <h3 class="text-xl font-semibold text-blue-700">Diversidad de Oferta Educativa</h3>
          <p>
            Ofrecemos cursos presenciales y eventos online, desde informática hasta idiomas, para todas las edades.
          </p>
        </div>
        <div class="card bg-white shadow-md rounded p-6 transform transition hover:scale-105">
          <img src="@/assets/innovacion.png" alt="Innovación" class="w-full h-32 object-cover mb-4 rounded">
          <h3 class="text-xl font-semibold text-blue-700">Innovación y Tecnología Educativa</h3>
          <p>Utilizamos tecnología avanzada para mejorar la experiencia de aprendizaje.</p>
        </div>
      </div>
    </section>

    <!-- Sección: Eventos que se acercan -->
    <section class="my-12">
      <h2 class="text-3xl font-bold text-center text-blue-700 mb-8">Eventos que se acercan</h2>
      <div class="container mx-auto">
        <div
          v-for="event in upcomingEvents"
          :key="event.id"
          class="event-item"
          @click="navigateToEventDetails(event.id)"
        >
          <div class="date-container">
            <div class="date-number">{{ formatDate(event.startDate, 'DD') }}</div>
            <div class="date-month">{{ formatDate(event.startDate, 'MMMM YYYY') }}</div>
          </div>
          <div class="content-container">
            <h3 class="event-title">{{ event.name }}</h3>
            <p class="event-location">{{ event.location }}</p>
            <p class="event-description">{{ event.description }}</p>
          </div>
          <img
            :src="`data:image/jpeg;base64,${event.image}`"
            alt="Event Image"
            class="event-image"
          />
        </div>
      </div>
    </section>

    <!-- Sección: Cursos que se acercan -->
    <section class="my-12">
      <h2 class="text-3xl font-bold text-center text-blue-700 mb-8">Cursos que se acercan</h2>
      <div class="container mx-auto grid md:grid-cols-3 gap-8">
        <div
          v-for="course in upcomingCourses"
          :key="course.id"
          class="course-item bg-white shadow-md rounded overflow-hidden transform transition hover:scale-105 hover:rotate-1"
        >
          <img
            :src="`data:image/jpeg;base64,${course.image}`"
            alt="Imagen del Curso"
            class="w-full h-40 object-cover"
          >
          <div class="p-4">
            <h3 class="text-xl font-semibold text-blue-700 mb-2">{{ course.name }}</h3>
            <p class="text-sm text-gray-600 mb-4">
              {{ formatDate(course.startDate) }} - {{ formatDate(course.endDate) }}
            </p>
            <router-link
              :to="`/courses/${course.id}`"
              class="inline-block px-4 py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Más Información
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllCourses } from '@/services/coursesService';
import { getAllEvents } from '@/services/eventService';
import bannerImage from '@/assets/Banner.png';

interface Course {
  id: number;
  name: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
}

interface Event {
  id: number;
  name: string;
  description: string;
  startDate: string;
  location: string;
  image: string;
}

export default defineComponent({
  name: 'HomePage',
  setup() {
    const router = useRouter();
    const upcomingCourses = ref<Course[]>([]);
    const upcomingEvents = ref<Event[]>([]);

    const fetchUpcomingCourses = async () => {
      try {
        const response = await getAllCourses(0, 3);
        if (response && response.content) {
          upcomingCourses.value = response.content;
        } else {
          console.error('No data found in courses response:', response);
        }
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    };

    const fetchUpcomingEvents = async () => {
      try {
        const response = await getAllEvents(0, 3);
        if (response && response.content) {
          upcomingEvents.value = response.content;
        } else {
          console.error('No data found in events response:', response);
        }
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
      }
    };

    const navigateToEventDetails = (id: number) => {
      router.push({ name: 'EventDetails', params: { id: id.toString() } });
    };

    const formatDate = (date: string, format?: string) => {
      let options: Intl.DateTimeFormatOptions = {};
      if (format === 'DD') {
        options = { day: '2-digit' };
      } else if (format === 'MMMM YYYY') {
        options = { month: 'long', year: 'numeric' };
      } else {
        options = { day: '2-digit', month: 'long', year: 'numeric' };
      }
      return new Date(date).toLocaleDateString('es-ES', options);
    };

    onMounted(() => {
      fetchUpcomingCourses();
      fetchUpcomingEvents();
    });

    return {
      bannerImage,
      upcomingCourses,
      upcomingEvents,
      navigateToEventDetails,
      formatDate,
    };
  },
});
</script>

<style scoped>
.hero {
  position: relative;
  background-size: cover;
  background-position: center;
  height: 300px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.animate-fadeIn {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.card {
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.event-item {
  display: grid;
  grid-template-columns: 120px 1fr 100px;
  align-items: center;
  padding: 15px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  margin-bottom: 10px;
}

.event-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.date-container {
  background: #1d4ed8;
  color: #fff;
  border-radius: 8px;
  padding: 5px 10px;
  text-align: center;
  font-size: 1.2rem;
  padding-right: 20px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.date-number {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
}

.date-month {
  font-size: 1rem;
  text-transform: uppercase;
  margin-top: 5px;
}

.content-container {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.event-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.event-location {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
}

.event-description {
  font-size: 0.875rem;
  color: #4B5563;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
}

.event-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  align-self: center;
  transition: transform 0.3s;
}

.event-image:hover {
  transform: scale(1.05);
}

.course-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s, box-shadow 0.3s;
}

.course-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .event-item {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    align-items: start;
  }

  .date-container {
    padding-right: 0;
    margin-bottom: 10px;
  }

  .event-image {
    margin-top: 10px;
  }
}
</style>
