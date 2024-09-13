import axios from 'axios';

// URL base para la API
const API_URL = import.meta.env.VITE_APP_BASE_URL_API;
// const API_URL = 'http://localhost:8080/api/available/events';

// Función para obtener todos los eventos paginados
export const getAllEvents = async (page: number, size: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/available/events`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    throw new Error('Error al recuperar la lista de eventos.');
  }
};

// Función para obtener un evento por su ID
export const getEventById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/available/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw new Error('Error al recuperar el detalle del evento.');
  }
};

export const registerForEvent = async (id: number) => {
  try {
    const response = await axios.post(`${API_URL}/api/available/events/${id}/register`);
    return response.data;
  } catch (error) {
    console.error('Error al inscribirse en el evento:', error);
    throw new Error('Error al inscribirse en el evento.');
  }
};