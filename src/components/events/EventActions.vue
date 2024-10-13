<template>
  <div class="flex space-x-2">
    <button @click="viewDetails" class="text-blue-500 hover:text-blue-700">
      <font-awesome-icon :icon="['fas', 'eye']" />
    </button>
    <button @click="editEvent" class="text-yellow-500 hover:text-yellow-700">
      <font-awesome-icon :icon="['fas', 'edit']" />
    </button>
    <button @click="deleteEvent" class="text-red-500 hover:text-red-700">
      <font-awesome-icon :icon="['fas', 'trash']" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{ eventId: string }>();
const router = useRouter();

const viewDetails = () => {
  router.push({ name: 'EventDetails', params: { id: props.eventId } });
};

const editEvent = () => {
  // Lógica para editar el evento
  console.log(`Editar evento con ID: ${props.eventId}`);
};

const deleteEvent = () => {
  // Lógica para eliminar el evento
  console.log(`Eliminar evento con ID: ${props.eventId}`);
};
</script>

<style scoped>
button {
  transition: color 0.2s ease-in-out;
}
</style>