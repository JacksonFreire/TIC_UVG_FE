<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Agregar Nuevo Evento</h1>
    <EventForm :isEditing="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EventForm from '@/components/form/EventForm.vue';

export default defineComponent({
  name: 'AddEvent',
  components: {
    EventForm,
  },
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
