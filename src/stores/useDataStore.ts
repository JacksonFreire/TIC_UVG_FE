import { defineStore } from 'pinia';
import { getAllCourses } from '@/services/coursesService';
import { getAllEvents } from '@/services/eventService';
import { Course } from '@/models/Course';  // Importa el modelo Course
import { Event } from '@/models/Event';    // Importa el modelo Event

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    courses: [] as Course[],      // Almacena la lista de cursos
    events: [] as Event[],        // Almacena la lista de eventos
    homeCourses: [] as Course[],  // Almacena los cursos para la home
    homeEvents: [] as Event[],    // Almacena los eventos para la home
    isLoading: false,             // Estado de carga
    totalPagesCourses: 0,         // Total de páginas para los cursos
    totalPagesEvents: 0,          // Total de páginas para los eventos
  }),
  actions: {
    // Cargar los datos limitados para la home
    async fetchHomeData() {
      this.isLoading = true;
      try {
        // Cargar 3 cursos y 3 eventos para la página de inicio
        const [coursesResponse, eventsResponse] = await Promise.all([
          getAllCourses(0, 3), // Límite de 3 cursos para la home
          getAllEvents(0, 3),  // Límite de 3 eventos para la home
        ]);

        this.homeCourses = coursesResponse.content.map((course: any) => ({
          id: course.id,
          name: course.name,
          description: course.description,
          image: course.image,
          startDate: course.startDate,
          endDate: course.endDate,
        }));

        this.homeEvents = eventsResponse.content.map((event: any) => ({
          id: event.id,
          name: event.name,
          description: event.description,
          location: event.location,
          image: event.image,
          startDate: event.startDate,
          endDate: event.endDate,
        }));

      } catch (error) {
        console.error('Error al cargar los datos de la home:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // Cargar los cursos con paginación
    async fetchCourses(page = 0, limit = 6) {
      this.isLoading = true;
      try {
        const response = await getAllCourses(page, limit);
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

        this.totalPagesCourses = response.totalPages > 0 ? response.totalPages : 1; // Manejo de la paginación

      } catch (error) {
        console.error('Error al cargar los cursos:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // Cargar los eventos con paginación
    async fetchEvents(page = 0, limit = 4) {
      this.isLoading = true;
      try {
        const response = await getAllEvents(page, limit);
        this.events = response.content.map((event: any) => ({
          id: event.id,
          name: event.name,
          description: event.description,
          startDate: event.startDate,
          endDate: event.endDate ?? '',
          location: event.location,
          image: event.image,
          price: event.price ?? 0,
          category: event.category,
        }));

        this.totalPagesEvents = response.totalPages > 0 ? response.totalPages : 1; // Manejo de la paginación

      } catch (error) {
        console.error('Error al cargar los eventos:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
