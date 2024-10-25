import { defineStore } from 'pinia';
import { getAllCourses } from '@/services/coursesService';
import { getAllEvents } from '@/services/eventService';

// Interfaces
import { Course } from '@/models/Course';
import { Event } from '@/models/Event';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    courses: [] as Course[],
    events: [] as Event[],
    homeCourses: [] as Course[],
    homeEvents: [] as Event[],
    isLoading: false,
    totalPagesCourses: 0, // Número total de páginas para cursos
    totalPagesEvents: 0, // Número total de páginas para eventos
  }),
  actions: {
    // Método para cargar cursos con paginación
    async fetchCourses(page = 0, limit = 6) {
      this.isLoading = true;
      try {
        const response = await getAllCourses(page, limit);

        // Verificación de la estructura de la respuesta
        if (response && response.content) {
          this.courses = response.content.map((course: any) => ({
            id: course.id,
            name: course.name,
            startDate: course.startDate,
            endDate: course.endDate,
            price: course.price ?? 0,
            image: course.image,  // Imagen en base64
            instructorName: course.instructorName,
          }));

          // Actualizar el número total de páginas para cursos
          this.totalPagesCourses = response.totalPages > 0 ? response.totalPages : 1;
        } else {
          console.error('Formato inesperado de la respuesta del servidor', response);
          this.courses = [];
          this.totalPagesCourses = 0;
        }

        return response;
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
        this.courses = [];
        this.totalPagesCourses = 0;
        return { content: [], totalPages: 0 }; // Retornar un valor por defecto si ocurre un error
      } finally {
        this.isLoading = false;
      }
    },

    // Método para cargar eventos con paginación
    async fetchEvents(page = 0, limit = 4) {
      this.isLoading = true;
      try {
        const response = await getAllEvents(page, limit);

        // Verificación de la estructura de la respuesta
        if (response && response.content) {
          this.events = response.content.map((event: any) => ({
            id: event.id,
            name: event.name,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            location: event.location,
            price: event.price ?? 0,
            image: event.image,  // Imagen en base64
          }));

          // Actualizar el número total de páginas para eventos
          this.totalPagesEvents = response.totalPages > 0 ? response.totalPages : 1;
        } else {
          console.error('Formato inesperado de la respuesta del servidor', response);
          this.events = [];
          this.totalPagesEvents = 0;
        }

        return response;
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
        this.events = [];
        this.totalPagesEvents = 0;
        return { content: [], totalPages: 0 }; // Retornar un valor por defecto si ocurre un error
      } finally {
        this.isLoading = false;
      }
    },

    // Método para cargar datos de la página de inicio
    async fetchHomeData() {
      this.isLoading = true;
      try {
        const [coursesResponse, eventsResponse] = await Promise.all([
          getAllCourses(0, 3),
          getAllEvents(0, 3),
        ]);

        // Mapeo de los datos para cursos y eventos
        this.homeCourses = coursesResponse.content.map((course: any) => ({
          id: course.id,
          name: course.name,
          startDate: course.startDate,
          endDate: course.endDate,
          price: course.price ?? 0,
          image: course.image,
          instructorName: course.instructorName,
        }));

        this.homeEvents = eventsResponse.content.map((event: any) => ({
          id: event.id,
          name: event.name,
          startDate: event.startDate,
          endDate: event.endDate ?? '',
          location: event.location,
          image: event.image,
          price: event.price ?? 0,
          description: event.description,  // Incluyendo descripción
        }));
      } catch (error) {
        console.error('Error al cargar los datos de la home:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
