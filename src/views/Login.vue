<template>
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">UV-GROUP</h1>
      <LoginForm />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import LoginForm from '@/components/form/LoginForm.vue';
  
  export default defineComponent({
    components: {
        LoginForm,
    },
  });
  </script>