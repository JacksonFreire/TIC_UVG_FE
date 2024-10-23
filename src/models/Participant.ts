export interface Participant {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    email: string;
    status: string;
    comments?: string; // Puede ser opcional
    showComment?: boolean; // Campo utilizado para mostrar/ocultar comentarios
}
