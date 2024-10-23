import axios from 'axios';
import { Participant } from '@/models/Participant';

const API_URL = import.meta.env.VITE_APP_BASE_URL_API;

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
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authenticated');

  const headers = { Authorization: `Bearer ${token}` };
  await axios.post(`${API_URL}/api/enrollments/course/${courseId}`, { userId }, { headers });
};

// Verificar si el usuario está inscrito en un curso
export const checkEnrollment = async (courseId: string, userId: number) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authenticated');

  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${API_URL}/api/enrollments/isEnrolled`, {
    headers,
    params: { courseId, userId },
  });
  return response.data; // Devuelve true si está inscrito, false si no lo está
};

// Unificar la obtención y el filtrado de inscripciones
export const getEnrollmentsByCourse = async (courseId: string, status: string | null = null) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authenticated');

  const headers = { Authorization: `Bearer ${token}` };
  const params = status ? { status } : {};

  try {
    const response = await axios.get(`${API_URL}/api/enrollments/admin/course/${courseId}`, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener inscripciones:', error);
    throw new Error('Error al obtener las inscripciones.');
  }
};

// Guardar cambios en la inscripción de un participante
export const saveEnrollmentChanges = async (participant: Participant) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authenticated');

  const headers = { Authorization: `Bearer ${token}` };
  try {
    await axios.put(`${API_URL}/api/enrollments/admin/updateEnrollment`, participant, { headers });
    console.log('Cambios guardados correctamente');
  } catch (error) {
    console.error('Error al guardar los cambios en la inscripción:', error);
    throw new Error('Error al guardar los cambios en la inscripción.');
  }
};