import axios from 'axios';

// URL base para la API
const API_URL = import.meta.env.VITE_APP_BASE_URL_API;

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

// Inscribir a un usuario en un evento
export const registerForEvent = async (eventId: number, userId: number) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authenticated');

  const headers = { Authorization: `Bearer ${token}` };
  await axios.post(`${API_URL}/api/enrollments/event/${eventId}`, { userId }, { headers });
};

// Verificar si el usuario está inscrito en un evento
export const checkEventRegistration = async (eventId: string, userId: number) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authenticated');

  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${API_URL}/api/enrollments/isEnrolledEvent`, {
    headers,
    params: {
      eventId,
      userId,
    },
  });
  return response.data;
};