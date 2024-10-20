import axios from 'axios';

// URL base para la API
const API_URL = import.meta.env.VITE_APP_BASE_URL_API;

// Función para obtener todos los eventos paginados
export const getAllEvents = async (page: number, size: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/activities/events`, {
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
    const response = await axios.get(`${API_URL}/api/activities/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al recuperar el detalle del evento:', error);
    throw new Error('Error al recuperar el detalle del evento.');
  }
};

// Función para crear un evento
export const createEvent = async (eventData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/activities/events/create`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el evento:', error);
    throw new Error('Error al crear el evento.');
  }
};

// Función para actualizar un evento
export const updateEvent = async (id: number, eventData: any) => {
  try {
    const response = await axios.put(`${API_URL}/api/activities/events/update/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el evento:', error);
    throw new Error('Error al actualizar el evento.');
  }
};

// Función para eliminar un evento
export const deleteEvent = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/api/activities/events/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
    throw new Error('Error al eliminar el evento.');
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

// Función para obtener inscripciones de un evento por su ID, con filtro opcional por estado
export const getEnrollmentsByEvent = async (eventId: number, status?: string) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authenticated');

  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(`${API_URL}/api/enrollments/admin/event/${eventId}`, {
      headers,
      params: { status },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error('Acceso prohibido. Verifique los permisos de administrador.');
    } else {
      console.error('Error al recuperar las inscripciones del evento:', error);
    }
    throw new Error('Error al recuperar las inscripciones del evento.');
  }
};

// Guardar cambios en la inscripción de un participante en el evento
export const saveEnrollmentChanges = async (enrollmentDTO: { userId: number, eventId: number, status: string, comments: string, courseId?: number }) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authenticated');

  const headers = { Authorization: `Bearer ${token}` };
  try {
    await axios.put(`${API_URL}/api/enrollments/admin/updateEnrollment`, enrollmentDTO, { headers });
    console.log('Cambios guardados correctamente');
  } catch (error) {
    console.error('Error al guardar los cambios en la inscripción:', error);
    throw new Error('Error al guardar los cambios en la inscripción.');
  }
};
