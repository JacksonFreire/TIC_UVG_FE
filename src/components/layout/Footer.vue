<template>
  <!-- Pie de página -->
  <footer class="bg-blue-700 text-white py-2">
    <div class="container mx-auto flex flex-col items-center text-xs relative lg:flex-row lg:justify-between">
      <!-- Logo y Texto de Misión (Solo visible en Desktop) -->
      <div class="hidden lg:flex items-center space-x-3">
        <img src="@/assets/logo.jpg" alt="Univeritas Group" class="h-6">
        <p>Apoyamos a los migrantes en su integración en Italia.</p>
      </div>

      <!-- Redes Sociales Centradas Absolutamente en Desktop -->
      <div class="flex space-x-3 mb-4 lg:mb-0 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
        <a href="https://www.facebook.com/UniveritasGroup" target="_blank" aria-label="Facebook" class="hover:text-blue-400">
          <font-awesome-icon :icon="['fab', 'facebook']" class="h-5 w-5" />
        </a>
        <a href="https://www.instagram.com/UniveritasGroup" target="_blank" aria-label="Instagram" class="hover:text-pink-400">
          <font-awesome-icon :icon="['fab', 'instagram']" class="h-5 w-5" />
        </a>
        <a href="https://www.linkedin.com/company/univeritasgroup" target="_blank" aria-label="LinkedIn" class="hover:text-blue-500">
          <font-awesome-icon :icon="['fab', 'linkedin']" class="h-5 w-5" />
        </a>
      </div>

      <!-- Copyright -->
      <div class="text-center lg:text-right">
        &copy; 2024 - Jackson Freire - UTPL.
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'SiteFooter',
  components: {
    FontAwesomeIcon,
  },
});
</script>

<style scoped>
footer {
  background-color: #1d4ed8; /* Mismo color que el navbar */
  padding: 8px 0; /* Ajuste de padding para mantener el footer delgado */
}

footer img {
  max-width: 80px; /* Ajuste del tamaño del logo para que sea discreto */
}

footer a {
  transition: color 0.3s ease;
}

footer p {
  margin: 0;
}

footer .text-xs {
  font-size: 0.75rem; /* Tamaño reducido para coherencia y limpieza */
}

/* Ajuste para dispositivos móviles */
@media (max-width: 768px) {
  footer {
    padding: 4px 0; /* Reduce la altura del footer en móviles */
  }
}
</style>
