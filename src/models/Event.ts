export interface Event {
    id: number;
    name: string;
    description: string;
    startDate: string; // Las fechas se manejan como string en el FE, luego puedes convertirlas si es necesario
    endDate: string;
    location: string;
    price: number;
    imageUrl: string; // Imagen en formato base64
    category: string;
    additionalDetails: string;
    createdAt: string;
    updatedAt: string;
}
