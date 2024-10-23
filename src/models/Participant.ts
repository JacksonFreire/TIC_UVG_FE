// src/models/Participant.ts
export interface Participant {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    email: string;
    status: 'confirmed' | 'pending' | 'canceled';
    comments?: string;
    showComment?: boolean;
}
