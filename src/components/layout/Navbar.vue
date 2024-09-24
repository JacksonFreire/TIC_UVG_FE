<template>
  <!-- Barra de navegación -->
  <nav class="bg-blue-600 text-white py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logotipo -->
      <div class="flex items-center">
        <img src="@/assets/logo.jpg" alt="Logotipo" class="h-8 mr-4" />
        <router-link to="/" class="text-lg font-bold">Univeritas Group</router-link>
      </div>

      <!-- Botón de Menú para Dispositivos Móviles -->
      <button @click="toggleMenu" class="block md:hidden focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Menú de Navegación -->
      <div :class="{ 'hidden': !isMenuOpen, 'flex': isMenuOpen, 'md:flex': true }"
        class="flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 items-center">
        <router-link to="/" class="hover:text-gray-200" @click="closeMenu">Inicio</router-link>
        <router-link to="/courses" class="hover:text-gray-200" @click="closeMenu">Cursos</router-link>
        <router-link to="/events" class="hover:text-gray-200" @click="closeMenu">Eventos</router-link>
        <router-link to="/about" class="hover:text-gray-200" @click="closeMenu">Sobre Nosotros</router-link>
      <!--  <a href="#" class="hover:text-gray-200 cursor-pointer" @click="closeMenu">Servicios</a>-->
        <a href="#" class="hover:text-gray-200 cursor-pointer" @click="closeMenu">Contactos</a>

        <!-- Menú de usuario cuando está logueado -->
        <div v-if="authStore.isLoggedIn" class="relative md:ml-4 flex items-center">
          <button @click="toggleUserMenu" class="flex items-center space-x-2 focus:outline-none">
            <span class="whitespace-nowrap">Hola, {{ authStore.userDetails?.username }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06-.02l2.47 2.44 2.47-2.44a.75.75 0 111.04 1.08l-3 3a.75.75 0 01-1.04 0l-3-3a.75.75 0 01-.02-1.06z"
                clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Submenú de usuario -->
          <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
            <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeMenu">Perfil</router-link>
            <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Cerrar sesión
            </button>
          </div>
        </div>

        <!-- Opción de inicio de sesión cuando no está logueado -->
        <router-link v-else to="/login" class="hover:text-gray-200" @click="closeMenu">Iniciar sesión</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AppNavbar',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const isMenuOpen = ref(false);
    const isUserMenuOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    const toggleUserMenu = () => {
      isUserMenuOpen.value = !isUserMenuOpen.value;
    };

    const logout = () => {
      authStore.logout(router);
      isUserMenuOpen.value = false;
      closeMenu(); // Cierra el menú hamburguesa al cerrar sesión
    };

    return {
      authStore,
      isMenuOpen,
      toggleMenu,
      closeMenu,
      isUserMenuOpen,
      toggleUserMenu,
      logout,
    };
  },
});
</script>

<style scoped>
.material-icons {
  font-size: 24px;
}

/* Ajustes para alinear correctamente en diferentes dispositivos */
@media (max-width: 768px) {
  .material-icons {
    font-size: 28px;
  }
}
</style>