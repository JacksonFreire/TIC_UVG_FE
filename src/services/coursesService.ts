import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_BASE_URL_API;

// Función para obtener el token de autenticación
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authenticated');
  return { Authorization: `Bearer ${token}` };
};

// Función para obtener todos los cursos con paginación
export const getAllCourses = async (page: number, size: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/activities/courses/list`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Error al recuperar la lista de cursos.');
  }
};

// Función para obtener los detalles de un curso por ID
export const getCourseById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/activities/courses/details/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al recuperar el detalle del curso:', error);
    throw new Error('Error al recuperar el detalle del curso.');
  }
};

// Función para inscribir a un usuario en un curso
export const enrollInCourse = async (courseId: number, userId: number) => {
  const headers = getAuthHeaders();
  try {
    await axios.post(`${API_URL}/api/enrollments/course/${courseId}`, { userId }, { headers });
  } catch (error) {
    console.error('Error al inscribir en el curso:', error);
    throw new Error('Error al inscribir en el curso.');
  }
};

// Verificar si el usuario está inscrito en un curso
export const checkEnrollment = async (courseId: string, userId: number) => {
  const headers = getAuthHeaders();
  try {
    const response = await axios.get(`${API_URL}/api/enrollments/isEnrolled`, {
      headers,
      params: { courseId, userId },
    });
    return response.data; // Devuelve true si está inscrito, false si no lo está
  } catch (error) {
    console.error('Error al verificar la inscripción:', error);
    throw new Error('Error al verificar la inscripción.');
  }
};

// Obtener inscripciones por curso
export const getEnrollmentsByCourse = async (courseId: number, status: string | null = null) => {
  const headers = getAuthHeaders();
  try {
    const params = status ? { status } : {};
    const response = await axios.get(`${API_URL}/api/enrollments/admin/course/${courseId}`, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener inscripciones:', error);
    throw new Error('Error al obtener inscripciones.');
  }
};

// Guardar cambios en la inscripción de un participante
export const saveEnrollmentChanges = async (participant: any) => {
  const headers = getAuthHeaders();
  try {
    await axios.put(`${API_URL}/api/enrollments/admin/updateEnrollment`, participant, { headers });
    console.log('Cambios guardados correctamente');
  } catch (error) {
    console.error('Error al guardar los cambios en la inscripción:', error);
    throw new Error('Error al guardar los cambios en la inscripción.');
  }
};

// Función para crear un curso nuevo
export const createCourse = async (courseData: any) => {
  const headers = { ...getAuthHeaders(), 'Content-Type': 'application/json' };
  try {
    const response = await axios.post(`${API_URL}/api/activities/courses/create`, courseData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error al crear el curso:', error);
    throw new Error('Error al crear el curso.');
  }
};

// Función para actualizar un curso existente
export const updateCourse = async (courseId: number, courseData: any) => {
  const headers = { ...getAuthHeaders(), 'Content-Type': 'application/json' };
  try {
    const response = await axios.put(`${API_URL}/api/activities/courses/update/${courseId}`, courseData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el curso:', error);
    throw new Error('Error al actualizar el curso.');
  }
};

// Función para eliminar un curso
export const deleteCourse = async (courseId: number) => {
  const headers = getAuthHeaders();
  try {
    await axios.delete(`${API_URL}/api/activities/courses/delete/${courseId}`, { headers });
    console.log('Curso eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el curso:', error);
    throw new Error('Error al eliminar el curso.');
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
