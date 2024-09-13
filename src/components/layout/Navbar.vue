<template>
  <!-- Barra de navegación -->
  <nav class="bg-blue-600 text-white py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logotipo -->
      <div class="flex items-center">
        <img src="@/assets/logo.jpg" alt="Logotipo" class="h-8 mr-4" />
        <a href="/" class="text-lg font-bold">Univeritas Group</a>
      </div>

      <!-- Botón de Menú para Dispositivos Móviles -->
      <button @click="toggleMenu" class="block md:hidden focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Menú de Navegación -->
      <div :class="{'hidden': !isMenuOpen, 'flex': isMenuOpen, 'md:flex': true}" class="flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
        <a href="/" class="hover:text-gray-200">Home</a>
        <a href="#" class="hover:text-gray-200">Quiénes somos</a>
        <a href="#" class="hover:text-gray-200">Servicios</a>
       <!-- <a href="#" class="hover:text-gray-200">Cursos</a> -->
        <router-link to="/courses" class="hover:text-gray-200">Cursos</router-link>
        <router-link to="/events" class="hover:text-gray-200">Eventos</router-link>
        <a href="#" class="hover:text-gray-200">Contactos</a>
        <router-link to="/login" class="hover:text-gray-200">Iniciar sesión</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Navbar',
  setup() {
    // Estado para controlar si el menú está abierto o cerrado
    const isMenuOpen = ref(false);

    // Función para alternar el estado del menú
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    return {
      isMenuOpen,
      toggleMenu,
    };
  },
});
</script>

<style scoped>
.material-icons {
  font-size: 24px;
}

/* Estilos adicionales para el menú responsive */
@media (max-width: 768px) {
  .material-icons {
    font-size: 28px;
  }
}
</style>