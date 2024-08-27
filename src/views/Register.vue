<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-bold mb-4">UV-GROUP</h1>
    <RegisterForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegisterForm from '@/components/form/RegisterForm.vue';

export default defineComponent({
  components: {
    RegisterForm,
  },
});
</script>