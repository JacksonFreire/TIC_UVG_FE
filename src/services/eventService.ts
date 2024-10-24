import axios, { AxiosError } from 'axios';

// URL base para la API
const API_URL = import.meta.env.VITE_APP_BASE_URL_API;

// Función para obtener el token de autorización
const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authenticated');
  return token;
};

// Función para manejar errores de Axios
const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const { response, message } = error;
    if (response) {
      return {
        message: response.data || 'Error en la respuesta del servidor',
        status: response.status,
      };
    }
    return { message, status: null };
  }
  return { message: 'Error desconocido', status: null };
};

// Función para obtener todos los eventos paginados
export const getAllEvents = async (page: number, size: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/activities/events`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    const { message } = handleAxiosError(error);
    console.error('Error al obtener los eventos:', message);
    throw new Error(message);
  }
};

// Función para obtener un evento por su ID
export const getEventById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/activities/events/${id}`);
    return response.data;
  } catch (error) {
    const { message } = handleAxiosError(error);
    console.error('Error al recuperar el detalle del evento:', message);
    throw new Error(message);
  }
};

// Función para crear un evento
export const createEvent = async (eventData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/activities/events/create`, eventData);
    return response.data;
  } catch (error) {
    const { message } = handleAxiosError(error);
    console.error('Error al crear el evento:', message);
    throw new Error(message);
  }
};

// Función para actualizar un evento
export const updateEvent = async (id: number, eventData: any) => {
  try {
    const response = await axios.put(`${API_URL}/api/activities/events/update/${id}`, eventData);
    return response.data;
  } catch (error) {
    const { message } = handleAxiosError(error);
    console.error('Error al actualizar el evento:', message);
    throw new Error(message);
  }
};

// Función para eliminar un evento
export const deleteEvent = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/api/activities/events/delete/${id}`);
    return response.data;
  } catch (error) {
    const { message } = handleAxiosError(error);
    console.error('Error al eliminar el evento:', message);
    throw new Error(message);
  }
};

// Inscribir a un usuario en un evento
export const registerForEvent = async (eventId: number, userId: number) => {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    await axios.post(`${API_URL}/api/enrollments/event/${eventId}`, { userId }, { headers });
  } catch (error) {
    const { message } = handleAxiosError(error);
    console.error('Error al inscribir en el evento:', message);
    throw new Error(message);
  }
};

// Verificar si el usuario está inscrito en un evento
export const checkEventRegistration = async (eventId: string, userId: number) => {
  const token = getToken();
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
    const { message } = handleAxiosError(error);
    console.error('Error al verificar la inscripción en el evento:', message);
    throw new Error(message);
  }
};

// Función para obtener inscripciones de un evento por su ID, con filtro opcional por estado
export const getEnrollmentsByEvent = async (eventId: number, status?: string) => {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(`${API_URL}/api/enrollments/admin/event/${eventId}`, {
      headers,
      params: { status },
    });
    return response.data;
  } catch (error) {
    const { message, status: statusCode } = handleAxiosError(error);
    if (statusCode === 403) {
      console.error('Acceso prohibido. Verifique los permisos de administrador.');
    } else {
      console.error('Error al recuperar las inscripciones del evento:', message);
    }
    throw new Error(message);
  }
};

// Guardar cambios en la inscripción de un participante en el evento
export const saveEnrollmentChanges = async (enrollmentDTO: { userId: number, eventId: number, status: string, comments: string, courseId?: number }) => {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    await axios.put(`${API_URL}/api/enrollments/admin/updateEnrollment`, enrollmentDTO, { headers });
    console.log('Cambios guardados correctamente');
  } catch (error) {
    const { message } = handleAxiosError(error);
    console.error('Error al guardar los cambios en la inscripción:', message);
    throw new Error(message);
  }
};
