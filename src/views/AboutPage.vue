<template>
    <div class="about-page">
      <!-- Sección de Encabezado -->
      <section class="hero bg-cover bg-center py-24" :style="{ backgroundImage: `url(${bannerAbout})` }">
        <div class="container mx-auto text-center text-blue-700">
          <h1 class="text-5xl font-bold mb-6">Sobre Nosotros</h1>
          <p class="text-lg max-w-2xl mx-auto">
            Univeritas Group es una organización dedicada a apoyar a los migrantes latinoamericanos en su proceso de integración en Italia.
          </p>
        </div>
      </section>
  
      <!-- Sección: Nuestra Misión -->
      <section class="my-16">
        <div class="container mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
          <div class="md:w-1/2">
            <img src="@/assets/mission.jpg" alt="Nuestra Misión" class="rounded-lg shadow-md w-full h-auto">
          </div>
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold text-blue-700 mb-4">Nuestra Misión</h2>
            <p class="text-lg text-gray-700">
              Nuestro propósito es eliminar las barreras sociales, culturales y laborales que enfrentan los migrantes. A través de programas educativos, asesoría personalizada y eventos de integración, buscamos empoderar a cada persona para que alcance su máximo potencial y se convierta en un miembro activo de la sociedad italiana.
            </p>
          </div>
        </div>
      </section>
  
      <!-- Sección: Nuestros Servicios -->
      <section class="my-16 bg-blue-50 py-12">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold text-blue-700 mb-8">Nuestros Servicios</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="service-item bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <img src="@/assets/education.jpg" alt="Educación y Capacitación" class="w-full h-40 object-cover rounded mb-4">
              <h3 class="text-xl font-semibold text-blue-700">Educación y Capacitación</h3>
              <p class="text-gray-700">
                Proveemos cursos de idiomas, talleres de habilidades laborales y formación profesional para mejorar tus oportunidades de empleo y adaptarte más fácilmente a la vida en Italia.
              </p>
            </div>
            <div class="service-item bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <img src="@/assets/advice.jpg" alt="Asesoría Personalizada" class="w-full h-40 object-cover rounded mb-4">
              <h3 class="text-xl font-semibold text-blue-700">Asesoría Personalizada</h3>
              <p class="text-gray-700">
                Ofrecemos orientación en temas legales, educativos y sociales para garantizar que comprendas tus derechos y encuentres el apoyo necesario durante tu proceso de integración.
              </p>
            </div>
            <div class="service-item bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <img src="@/assets/networking.jpg" alt="Eventos de Integración y Networking" class="w-full h-40 object-cover rounded mb-4">
              <h3 class="text-xl font-semibold text-blue-700">Eventos de Integración y Networking</h3>
              <p class="text-gray-700">
                Organizamos actividades culturales y ferias de empleo que promueven el intercambio y la creación de redes de apoyo entre migrantes y la comunidad local.
              </p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Sección: Nuestros Valores -->
      <section class="my-16">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-bold text-blue-700 text-center mb-8">Nuestros Valores</h2>
          <p class="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Trabajamos con un enfoque basado en la inclusión, la innovación, el compromiso y el empoderamiento. Creemos que cada migrante merece tener acceso a oportunidades que mejoren su vida y contribuyan a su desarrollo personal y profesional.
          </p>
        </div>
      </section>
  
      <!-- Sección: Nuestro Impacto -->
      <section class="my-16 bg-gray-100 py-12">
        <div class="container mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold text-blue-700 mb-4">Nuestro Impacto</h2>
            <p class="text-lg text-gray-700">
              A lo largo de los años, hemos ayudado a miles de migrantes a superar las dificultades iniciales de adaptarse a una nueva cultura y entorno. Gracias a nuestro trabajo constante y a la dedicación de nuestro equipo, hemos creado un espacio seguro y de apoyo que promueve la inclusión y el crecimiento de todos nuestros participantes.
            </p>
          </div>
          <div class="md:w-1/2">
            <img src="@/assets/impact.jpg" alt="Nuestro Impacto" class="rounded-lg shadow-md w-full h-auto">
          </div>
        </div>
      </section>
  
      <!-- Sección: Únete a Nuestra Comunidad -->
      <section class="my-16">
        <div class="container mx-auto text-center px-6">
          <h2 class="text-3xl font-bold text-blue-700 mb-8">Únete a Nuestra Comunidad</h2>
          <p class="text-lg text-gray-700 max-w-2xl mx-auto">
            Ya sea como participante de nuestros programas, voluntario o colaborador, tu participación es crucial para seguir construyendo un entorno inclusivo y solidario para los migrantes en Italia. En Univeritas Group, creemos en el poder de la comunidad para generar un cambio positivo.
          </p>
        </div>
      </section>
  
      <!-- Sección: Visión de Futuro -->
      <section class="my-16 bg-blue-50 py-12">
        <div class="container mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
          <div class="md:w-1/2">
            <img src="@/assets/future.jpg" alt="Visión de Futuro" class="rounded-lg shadow-md w-full h-auto">
          </div>
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold text-blue-700 mb-4">Visión de Futuro</h2>
            <p class="text-lg text-gray-700">
              Seguimos comprometidos con expandir nuestros servicios, integrar nuevas tecnologías y ampliar nuestro alcance para ayudar a más personas a lograr una integración exitosa. Estamos constantemente innovando y adaptándonos a las necesidades cambiantes de los migrantes para brindarles las mejores herramientas y oportunidades.
            </p>
          </div>
        </div>
      </section>
  
      <!-- Sección: Contáctanos -->
      <section class="my-16 text-center">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-bold text-blue-700 mb-8">Contáctanos</h2>
          <p class="text-lg text-gray-700 max-w-2xl mx-auto">
            Forma parte de esta misión. Tu camino hacia una nueva vida comienza con nosotros.
          </p>
          <router-link to="/contact">
          <button class="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            Contáctanos
          </button>
        </router-link>
        </div>
      </section>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import bannerAbout from '@/assets/BannerAbout.jpg'; // Asegúrate de tener las imágenes correctas en tu proyecto.
  
  export default defineComponent({
    name: 'AboutPage',
    setup() {
      return {
        bannerAbout,
      };
    },
  });
  </script>
  
  <style scoped>
  .hero {
    background-size: cover;
    background-position: center;
  }
  
  .service-item:hover {
    transform: scale(1.05);
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  </style>  