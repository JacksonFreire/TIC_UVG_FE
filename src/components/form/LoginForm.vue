<template>
    <div class="min-h-screen bg-blue-600 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-2">Iniciar Sesión</h2>
        <p class="text-gray-600 mb-6">Inicia Sesión con tu cuenta</p>
        
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <input 
              v-model="email"
              type="email" 
              placeholder="Email" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="mb-6">
            <input 
              v-model="password"
              type="password" 
              placeholder="Password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <button 
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            INICIAR SESIÓN
          </button>
        </form>
        
        <button 
          @click="handleRegister"
          class="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          REGISTRARSE
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    name: 'LoginForm',
    setup() {
      const email = ref('')
      const password = ref('')
  
      const handleSubmit = () => {
        // Handle login logic here
        console.log('Login attempt with:', email.value, password.value)
      }
  
      const handleRegister = () => {
        // Handle registration logic here
        console.log('Navigating to registration page')
      }
  
      return {
        email,
        password,
        handleSubmit,
        handleRegister
      }
    }
  })
  </script>