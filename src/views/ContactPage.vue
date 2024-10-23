<template>
  <div class="contact-page">
    <!-- Sección de Encabezado -->
    <section class="hero bg-cover bg-center py-24" :style="{ backgroundImage: `url(${bannerContact})` }">
      <div class="overlay"></div>
      <div class="container mx-auto text-center text-white relative z-10 px-6">
        <h1 class="text-5xl font-bold mb-6">Contactos</h1>
        <p class="text-lg max-w-2xl mx-auto">
          ¿Tienes alguna pregunta? ¡Estamos aquí para ayudarte!
        </p>
      </div>
    </section>

    <!-- Sección: Información de Contacto -->
    <section class="my-16">
      <div class="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        <div class="contact-item bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <img src="@/assets/email.webp" alt="Correo Electrónico" class="w-full h-40 object-cover rounded mb-4">
          <h3 class="text-xl font-semibold text-blue-700">Correo Electrónico</h3>
          <p class="text-gray-700">
            Puedes escribirnos a: <a href="mailto:contacto@univeritasgroup.com" class="text-blue-600 hover:underline">contacto@univeritasgroup.com</a>. Respondemos a todas las consultas en un plazo máximo de 24 horas.
          </p>
        </div>
        <div class="contact-item bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <img src="@/assets/phone.webp" alt="Teléfono" class="w-full h-40 object-cover rounded mb-4">
          <h3 class="text-xl font-semibold text-blue-700">Teléfono</h3>
          <p class="text-gray-700">
            Llámanos al: <a href="tel:+391234567890" class="text-blue-600 hover:underline">+39 123 456 7890</a>. Nuestro horario de atención es de lunes a viernes, de 9:00 a 18:00 horas.
          </p>
        </div>
        <div class="contact-item bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <img src="@/assets/location.webp" alt="Dirección" class="w-full h-40 object-cover rounded mb-4">
          <h3 class="text-xl font-semibold text-blue-700">Dirección</h3>
          <p class="text-gray-700">
            Visítanos en nuestra oficina en: Via Roma 123, 00100 Roma, Italia. Te esperamos para brindarte atención personalizada.
          </p>
        </div>
      </div>
    </section>

    <!-- Sección: Formulario de Contacto -->
    <section class="my-16 bg-blue-50 py-12">
      <div class="container mx-auto text-center px-6">
        <h2 class="text-3xl font-bold text-blue-700 mb-8">Formulario de Contacto</h2>
        <p class="text-lg text-gray-700 mb-8">
          Completa el formulario disponible en nuestra página web con tus datos y la consulta específica. Te responderemos lo antes posible.
        </p>
        <form @submit.prevent="submitForm" class="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <!-- Honeypot Field (Anti-Spam) -->
          <input type="text" v-model="honeypot" class="hidden" aria-hidden="true" tabindex="-1" />

          <div class="mb-4">
            <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre Completo</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="w-full px-3 py-2 border rounded"
              required
              maxlength="100"
              @input="validateName"
            >
            <p v-if="nameError" class="text-red-600 text-sm">{{ nameError }}</p>
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="w-full px-3 py-2 border rounded"
              required
              maxlength="100"
              @input="validateEmail"
            >
            <p v-if="emailError" class="text-red-600 text-sm">{{ emailError }}</p>
          </div>
          <div class="mb-4">
            <label for="message" class="block text-gray-700 text-sm font-bold mb-2">Mensaje</label>
            <textarea
              id="message"
              v-model="form.message"
              class="w-full px-3 py-2 border rounded"
              rows="4"
              required
              maxlength="500"
            ></textarea>
            <p class="text-sm text-gray-500">{{ form.message.length }} / 500 caracteres</p>
          </div>
          <button
            type="submit"
            :disabled="Boolean(isSubmitting || emailError || nameError)"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <span v-if="isSubmitting">Enviando...</span>
            <span v-else>Enviar Mensaje</span>
          </button>
          <p
            v-if="message"
            :class="{'text-green-600': messageType === 'success', 'text-red-600': messageType === 'error'}"
            class="mt-4"
          >
            {{ message }}
          </p>
        </form>
      </div>
    </section>

    <!-- Sección: Redes Sociales -->
    <section class="my-16">
      <div class="container mx-auto text-center px-6">
        <h2 class="text-3xl font-bold text-blue-700 mb-8">Redes Sociales</h2>
        <p class="text-lg text-gray-700 mb-8">
          Síguenos y mantente informado sobre nuestras actividades, cursos y eventos:
        </p>
        <div class="flex flex-wrap justify-center space-x-6">
          <a href="https://www.facebook.com/UniveritasGroup" target="_blank" class="text-blue-600 hover:underline flex items-center">
            <font-awesome-icon :icon="['fab', 'facebook']" class="w-6 h-6 mr-2" /> Facebook: @UniveritasGroup
          </a>
          <a href="https://www.instagram.com/UniveritasGroup" target="_blank" class="text-blue-600 hover:underline flex items-center">
            <font-awesome-icon :icon="['fab', 'instagram']" class="w-6 h-6 mr-2" /> Instagram: @UniveritasGroup
          </a>
          <a href="https://www.linkedin.com/company/univeritasgroup" target="_blank" class="text-blue-600 hover:underline flex items-center">
            <font-awesome-icon :icon="['fab', 'linkedin']" class="w-6 h-6 mr-2" /> LinkedIn: Univeritas Group
          </a>
        </div>
      </div>
    </section>

    <!-- Sección: Atención en varios idiomas -->
    <section class="my-16 bg-gray-100 py-12">
      <div class="container mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
        <div class="md:w-1/2">
          <h2 class="text-3xl font-bold text-blue-700 mb-4">Atención en varios idiomas</h2>
          <p class="text-lg text-gray-700">
            Para asegurarnos de que te sientas cómodo comunicándote con nosotros, ofrecemos atención en español, italiano e inglés. Nuestro equipo multicultural está aquí para apoyarte en tu idioma preferido.
          </p>
        </div>
        <div class="md:w-1/2">
          <img src="@/assets/languages.webp" alt="Atención en varios idiomas" class="rounded-lg shadow-md w-full h-auto">
        </div>
      </div>
    </section>

    <!-- Sección: Visítanos -->
    <section class="my-16 text-center">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-blue-700 mb-8">Visítanos y conoce más sobre nuestros programas</h2>
        <p class="text-lg text-gray-700 max-w-2xl mx-auto">
          Te invitamos a conocernos en persona, descubrir nuestras instalaciones y explorar cómo nuestros servicios pueden ayudarte en tu proceso de integración en Italia.
        </p>
      </div>
    </section>

    <!-- Sección: Contáctanos -->
    <section class="my-16 text-center">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-blue-700 mb-8">Queremos escucharte y apoyarte</h2>
        <p class="text-lg text-gray-700 max-w-2xl mx-auto">
          Queremos escucharte, apoyarte y caminar contigo hacia tu éxito en Italia. ¡Contáctanos hoy mismo!
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import bannerContact from '@/assets/BannerContact.webp';
import { sendEmail, EmailData } from '@/services/emailService';

export default defineComponent({
  name: 'ContactPage',
  setup() {
    const form = ref<EmailData>({
      name: '',
      email: '',
      message: '',
    });

    const honeypot = ref(''); // Variable separada para Honeypot
    const isSubmitting = ref(false);
    const message = ref('');
    const messageType = ref<'success' | 'error'>('success');
    const emailError = ref('');
    const nameError = ref('');

    const validateName = () => {
      const namePattern = /^[a-zA-Z\s]+$/;
      if (!namePattern.test(form.value.name) || form.value.name.length < 3) {
        nameError.value = 'Por favor, ingrese un nombre válido (mínimo 3 caracteres).';
      } else {
        nameError.value = '';
      }
    };

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(form.value.email)) {
        emailError.value = 'Por favor, ingrese un correo electrónico válido.';
      } else {
        emailError.value = '';
      }
    };

    const submitForm = async () => {
      if (honeypot.value) {
        message.value = 'Error: se ha detectado un intento de spam.';
        messageType.value = 'error';
        return;
      }

      if (emailError.value || nameError.value) {
        return;
      }

      isSubmitting.value = true;
      message.value = '';

      try {
        await sendEmail(form.value);
        message.value = 'Mensaje enviado correctamente.';
        messageType.value = 'success';
        form.value = { name: '', email: '', message: '' };
      } catch (error) {
        message.value = 'Error al enviar el formulario. Inténtalo nuevamente.';
        messageType.value = 'error';
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      bannerContact,
      form,
      honeypot,
      isSubmitting,
      message,
      messageType,
      emailError,
      nameError,
      validateName,
      validateEmail,
      submitForm,
    };
  },
});
</script>

<style scoped>
.hero {
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.contact-item {
  transition: transform 0.3s, box-shadow 0.3s;
}

.contact-item:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

button:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

button:hover {
  transform: translateY(-2px);
}

.flex a i {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .flex {
    flex-wrap: wrap;
  }

  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .contact-item {
    padding: 4px;
  }
}
</style>
