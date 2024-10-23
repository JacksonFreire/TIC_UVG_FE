export interface Curriculum{
    id: number;
    sectionName: string;
    lessonName: string;
    content: string;
    order: number; // El orden es un número entero
    duration: string; // Duración en formato legible (ej: "2h 30m")
    type: string; // Tipo de contenido (ej: "video", "lecture", etc.)
    resourceLink: string; // Enlace al recurso si lo hay
    isMandatory: boolean; // Es obligatorio o no
}