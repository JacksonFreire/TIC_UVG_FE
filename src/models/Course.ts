import { Curriculum } from './Curriculum';
import { Instructor } from './Instructor';

export interface Course {
    id: number;
    name: string;
    description: string;
    category: string;
    lessonsCount: number; // Número de lecciones
    studentsCount?: number; // Puede ser opcional si aún no hay estudiantes
    price: number; // Precio del curso
    duration: string; // Duración del curso
    level: string; // Nivel (ej: "Principiante", "Intermedio", etc.)
    eventPlace: string; // Lugar del evento si es presencial
    image: string; // Imagen en base64 o URL
    instructor: Instructor; // Relación con el instructor
    startDate: string; // Fecha de inicio en formato ISO (ej: "2024-01-15T00:00:00")
    endDate: string; // Fecha de finalización en formato ISO
    createdAt: string; // Fecha de creación en formato ISO
    updatedAt: string; // Fecha de última actualización en formato ISO
    curriculums: Curriculum[]; // Lista de currículos relacionados con el curso
}