<template>
  <!-- Barra de navegación -->
  <nav class="bg-blue-600 text-white py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logotipo -->
      <router-link to="/">
        <div class="flex items-center">
          <img src="@/assets/logo.jpg" alt="Logotipo" class="h-8 mr-4 rounded-full shadow-sm" />
          <router-link to="/" class="text-lg font-bold hover:text-blue-200 transition duration-300">
            Univeritas Group
          </router-link>
        </div>
      </router-link>

      <!-- Botón de Menú para Dispositivos Móviles -->
      <button @click="toggleMenu" class="block md:hidden focus:outline-none">
        <font-awesome-icon icon="bars" class="h-6 w-6 text-white hover:text-blue-300 transition duration-300" />
      </button>

      <!-- Menú de Navegación -->
      <div
        :class="{ hidden: !isMenuOpen, flex: isMenuOpen, 'md:flex': true }"
        class="flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 items-start md:items-center transition duration-300"
      >
        <router-link to="/" class="hover:text-blue-300 transition duration-300 px-4 py-2 md:py-0" @click="closeMenu">Inicio</router-link>
        <router-link to="/courses" class="hover:text-blue-300 transition duration-300 px-4 py-2 md:py-0" @click="closeMenu">Cursos</router-link>
        <router-link to="/events" class="hover:text-blue-300 transition duration-300 px-4 py-2 md:py-0" @click="closeMenu">Eventos</router-link>
        <router-link to="/about" class="hover:text-blue-300 transition duration-300 px-4 py-2 md:py-0" @click="closeMenu">Sobre Nosotros</router-link>
        <router-link to="/contact" class="hover:text-blue-300 transition duration-300 px-4 py-2 md:py-0" @click="closeMenu">Contactos</router-link>
      </div>

      <!-- Opciones de Usuario -->
      <div class="flex items-center space-x-4">
        <!-- Menú de usuario cuando está logueado -->
        <div v-if="authStore.isLoggedIn" class="relative flex items-center">
          <button
            @click.stop="toggleUserMenu"
            class="flex items-center space-x-2 focus:outline-none hover:text-blue-300 transition duration-300"
          >
            <span class="whitespace-nowrap">Hola, {{ authStore.userDetails?.username }}</span>
            <font-awesome-icon icon="chevron-down" class="h-4 w-4" />
          </button>

          <!-- Submenú de usuario -->
          <transition name="fade">
            <div
              v-if="isUserMenuOpen"
              ref="userMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 submenu"
            >
              <router-link
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
                @click="closeMenu"
              >
                <font-awesome-icon icon="user" class="mr-2" /> Perfil
              </router-link>
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
              >
                <font-awesome-icon icon="sign-out-alt" class="mr-2" /> Cerrar sesión
              </button>
            </div>
          </transition>
        </div>

        <!-- Opción de inicio de sesión cuando no está logueado -->
        <router-link v-else to="/login" class="hover:text-blue-300 transition duration-300" @click="closeMenu">
          <font-awesome-icon icon="sign-in-alt" class="mr-2" /> Iniciar sesión
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'AppNavbar',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const isMenuOpen = ref(false);
    const isUserMenuOpen = ref(false);
    const userMenu = ref<HTMLElement | null>(null);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
      isUserMenuOpen.value = false;
    };

    const toggleUserMenu = () => {
      isUserMenuOpen.value = !isUserMenuOpen.value;
    };

    const logout = () => {
      authStore.logout(router);
      isUserMenuOpen.value = false;
      closeMenu();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (userMenu.value && !userMenu.value.contains(event.target as Node)) {
        isUserMenuOpen.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      authStore,
      isMenuOpen,
      toggleMenu,
      closeMenu,
      isUserMenuOpen,
      toggleUserMenu,
      logout,
      userMenu,
    };
  },
});
</script>

<style scoped>
/* Ajustes generales para la barra de navegación */
nav {
  background-color: #1d4ed8;
}

nav a {
  font-weight: 500;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #93c5fd;
}

/* Menú responsivo y ajuste de la iconografía */
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
}

@media (max-width: 768px) {
  nav {
    padding: 10px;
  }

  .flex-col {
    align-items: flex-start; /* Asegura que las opciones estén alineadas correctamente en versión móvil */
    padding-left: 10px; /* Ajuste de padding para mejor alineación */
  }
}

/* Estilo del submenú de usuario */
.submenu {
  transition: all 0.3s ease-in-out;
  transform-origin: top right;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
