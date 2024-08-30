<template>
    <!-- Barra de navegación -->
    <nav class="bg-blue-600 text-white py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-50">
      <div class="container mx-auto flex items-center justify-between">
        <!-- Logotipo -->
        <div class="flex items-center">
          <img src="@/assets/logo.jpg" alt="Logotipo" class="h-8 mr-4" /> <!-- Cambia 'logo.png' al nombre de tu logotipo -->
          <a href="/" class="text-lg font-bold">Univeritas Group</a>
        </div>
  
        <!-- Menú de Navegación -->
        <div class="hidden md:flex space-x-8">
          <a href="/" class="hover:text-gray-200">Home</a>
          <a href="#" class="hover:text-gray-200">Quiénes somos</a>
          <a href="#" class="hover:text-gray-200">Servicios</a>
          <a href="#" class="hover:text-gray-200">Eventos</a>
          <a href="#" class="hover:text-gray-200">Noticias</a>
          <a href="#" class="hover:text-gray-200">Contactos</a>
          <router-link to="/login" class="hover:text-gray-200">Iniciar sesión</router-link> <!-- Cambiado a router-link -->
        </div>
      </div>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Navbar',
  });
  </script>
  
  <style scoped>
  /* Estilo adicional para el logotipo */
  .material-icons {
    font-size: 24px;
  }
  </style>  