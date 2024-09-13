// src/services/coursesService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_BASE_URL_API;
//const API_URL = 'http://localhost:8080/api/available/courses';

export const getAllCourses = async (page: number, size: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/available/courses`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Error al recuperar la lista de cursos.');
  }
};

export const getCourseById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/available/courses/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al recuperar el detalle del curso.');
  }
};