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
    handleError(error, 'Error al obtener los eventos');
  }
};

// Función para obtener un evento por su ID
export const getEventById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/activities/events/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error al recuperar el detalle del evento');
  }
};

// Inscribir a un usuario en un evento
export const registerForEvent = async (eventId: number, userId: number) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authenticated');

  const headers = { Authorization: `Bearer ${token}` };
  try {
    await axios.post(`${API_URL}/api/enrollments/event/${eventId}`, { userId }, { headers });
  } catch (error) {
    handleError(error, 'Error al inscribir al usuario en el evento');
  }
};

// Verificar si el usuario está inscrito en un evento
export const checkEventRegistration = async (eventId: string, userId: number) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authenticated');

  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(`${API_URL}/api/enrollments/isEnrolledEvent`, {
      headers,
      params: {
        eventId,
        userId,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error, 'Error al verificar la inscripción en el evento');
  }
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
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      console.error('Acceso prohibido. Verifique los permisos de administrador.');
    } else {
      handleError(error, 'Error al recuperar las inscripciones del evento');
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
    handleError(error, 'Error al guardar los cambios en la inscripción');
  }
};

// Función para manejar los errores de forma genérica
const handleError = (error: unknown, customMessage: string) => {
  if (axios.isAxiosError(error)) {
    console.error(`${customMessage}:`, error.response?.data || error.message);
  } else {
    console.error(`${customMessage}:`, error);
  }
  throw new Error(customMessage);
};
