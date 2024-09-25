// src/services/emailService.ts

// Define la interfaz para los datos del correo electrónico
export interface EmailData {
    name: string;
    email: string;
    message: string;
  }
  
  // URL base de la API, ajusta según la configuración de tu backend
  const API_URL = import.meta.env.VITE_APP_BASE_URL_API;
  
  /**
   * Envía una solicitud para enviar un correo electrónico al backend.
   * 
   * @param {EmailData} emailData - Datos del correo electrónico { name, email, message }
   * @returns {Promise<void>} - Promesa que se resuelve cuando el correo se envía correctamente.
   */
  export async function sendEmail(emailData: EmailData): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/api/available/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al enviar el correo: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  }  