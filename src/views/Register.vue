<template>
  <div class="container mx-auto px-4">
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