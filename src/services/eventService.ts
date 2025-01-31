import axios from 'axios';

// URL base para la API
const API_URL = import.meta.env.VITE_APP_BASE_URL_API;

// Función para obtener los encabezados de autorización
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authenticated');
  return { Authorization: `Bearer ${token}` };
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

// Función para obtener todos los eventos paginados (público)
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

// Función para obtener un evento por su ID (público)
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

// Función para crear un evento (requiere rol ADMIN)
export const createEvent = async (eventData: any) => {
  const headers = getAuthHeaders();
  try {
    const response = await axios.post(`${API_URL}/api/activities/events/create`, eventData, { headers });
    return response.data;
  } catch (error) {
    const { message } = handleAxiosError(error);
    console.error('Error al crear el evento:', message);
    throw new Error(message);
  }
};

// Función para actualizar un evento (requiere rol ADMIN)
export const updateEvent = async (id: number, eventData: any) => {
  const headers = getAuthHeaders();
  try {
    const response = await axios.put(`${API_URL}/api/activities/events/update/${id}`, eventData, { headers });
    return response.data;
  } catch (error) {
    const { message } = handleAxiosError(error);
    console.error('Error al actualizar el evento:', message);
    throw new Error(message);
  }
};

// Función para eliminar un evento (requiere rol ADMIN)
export const deleteEvent = async (id: number) => {
  const headers = getAuthHeaders();
  try {
    const response = await axios.delete(`${API_URL}/api/activities/events/delete/${id}`, { headers });
    return response.data;
  } catch (error) {
    const { message } = handleAxiosError(error);
    console.error('Error al eliminar el evento:', message);
    throw new Error(message);
  }
};

// Inscribir a un usuario en un evento (requiere rol USER)
export const registerForEvent = async (eventId: number, userId: number) => {
  const headers = getAuthHeaders();
  try {
    await axios.post(`${API_URL}/api/enrollments/event/${eventId}`, { userId }, { headers });
  } catch (error) {
    const { message } = handleAxiosError(error);
    console.error('Error al inscribir en el evento:', message);
    throw new Error(message);
  }
};

// Verificar si el usuario está inscrito en un evento (requiere rol USER)
export const checkEventRegistration = async (eventId: string, userId: number) => {
  const headers = getAuthHeaders();
  try {
    const response = await axios.get(`${API_URL}/api/enrollments/isEnrolledEvent`, {
      headers,
      params: { eventId, userId },
    });
    return response.data;
  } catch (error) {
    const { message } = handleAxiosError(error);
    console.error('Error al verificar la inscripción en el evento:', message);
    throw new Error(message);
  }
};

// Función para obtener inscripciones de un evento (requiere rol ADMIN)
export const getEnrollmentsByEvent = async (eventId: number, status?: string) => {
  const headers = getAuthHeaders();
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

// Guardar cambios en la inscripción de un participante (requiere rol ADMIN)
export const saveEnrollmentChanges = async (enrollmentDTO: { userId: number, eventId: number, status: string, comments: string, courseId?: number }) => {
  const headers = getAuthHeaders();
  try {
    await axios.put(`${API_URL}/api/enrollments/admin/updateEnrollment`, enrollmentDTO, { headers });
    console.log('Cambios guardados correctamente');
  } catch (error) {
    const { message } = handleAxiosError(error);
    console.error('Error al guardar los cambios en la inscripción:', message);
    throw new Error(message);
  }
};

// Función para descargar el reporte de participantes de un evento
export const downloadEventParticipantReport = async (eventId: number) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(`${API_URL}/api/reports/participants/event`, {
      params: { eventId },
      headers,
      responseType: 'blob', // Importante para manejar la respuesta como archivo
    });

    // Crear un enlace de descarga
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reporte_participantes_evento_${eventId}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error al descargar el reporte de participantes del evento:', error);
    throw new Error('Error al descargar el reporte de participantes del evento.');
  }
};

export const getEventsByInstructorId = async (instructorId: number) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  try {
    const response = await axios.get(`${API_URL}/api/activities/instructor/${instructorId}/events`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los eventos del instructor:', error);
    throw new Error('No se pudieron obtener los eventos del instructor.');
  }
};

// Función para obtener todos los instructores (requiere autenticación)
export const getAllInstructors = async () => {
  const headers = getAuthHeaders(); // Agrega los encabezados de autenticación
  try {
    const response = await axios.get(`${API_URL}/api/activities/instructor/list`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de instructores:', error);
    throw new Error('Error al obtener la lista de instructores.');
  }
};


