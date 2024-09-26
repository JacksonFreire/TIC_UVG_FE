// store/useDataStore.ts
import { defineStore } from 'pinia';
import { getAllCourses } from '@/services/coursesService';
import { getAllEvents } from '@/services/eventService';

// Ajuste de la interfaz `Instructor` para los cursos
interface Instructor {
  id: number;
  name: string;
  bio: string;
  profileImage: string;
}

// Ajuste de la interfaz `Course` para incluir `instructor`
interface Course {
  id: number;
  name: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  price: number;
  instructor: Instructor | null; // Asegurada la propiedad `instructor`
}

// Ajuste de la interfaz `Event` para incluir `price` y `endDate`
interface Event {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string; // Añadida la propiedad `endDate`
  location: string;
  image: string;
  price: number; // Añadida la propiedad `price`
  category: string; // Asegúrate de que `category` está incluida si se necesita
}

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    courses: [] as Course[],
    events: [] as Event[],
    homeCourses: [] as Course[],
    homeEvents: [] as Event[],
    isLoading: false,
    totalPages: 0,
  }),
  actions: {
    async fetchHomeData() {
      this.isLoading = true;
      try {
        const [coursesResponse, eventsResponse] = await Promise.all([
          getAllCourses(0, 3),
          getAllEvents(0, 3),
        ]);
        this.homeCourses = coursesResponse.content.map((course: any) => ({
          id: course.id,
          name: course.name,
          description: course.description,
          image: course.image,
          startDate: course.startDate,
          endDate: course.endDate,
          price: course.price ?? 0,
          instructor: course.instructor || null,
        }));
        // Mapeo de eventos para incluir `price` y `endDate`
        this.homeEvents = eventsResponse.content.map((event: any) => ({
          id: event.id,
          name: event.name,
          description: event.description,
          startDate: event.startDate,
          endDate: event.endDate ?? '', // Asegura que `endDate` esté presente
          location: event.location,
          image: event.image,
          price: event.price ?? 0, // Asigna un valor predeterminado a `price`
          category: event.category,
        }));
      } catch (error) {
        console.error('Error al cargar los datos de la home:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchCourses(page = 0) {
      this.isLoading = true;
      try {
        const response = await getAllCourses(page, 6);
        this.courses = response.content.map((course: any) => ({
          id: course.id,
          name: course.name,
          description: course.description,
          image: course.image,
          startDate: course.startDate,
          endDate: course.endDate,
          price: course.price ?? 0,
          instructor: course.instructor || null,
        }));
        this.totalPages = response.totalPages;
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchEvents(page = 0) {
      this.isLoading = true;
      try {
        const response = await getAllEvents(page, 4);
        // Mapeo de eventos para incluir `price` y `endDate`
        this.events = response.content.map((event: any) => ({
          id: event.id,
          name: event.name,
          description: event.description,
          startDate: event.startDate,
          endDate: event.endDate ?? '', // Asegura que `endDate` esté presente
          location: event.location,
          image: event.image,
          price: event.price ?? 0, // Asigna un valor predeterminado a `price`
          category: event.category,
        }));
        this.totalPages = response.totalPages;
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
