<template>
  <form @submit.prevent="applyFilter" class="flex items-center space-x-4 mb-4">
    <select v-model="status" class="border p-2 rounded">
      <option value="">Selecciona un estado</option>
      <option value="confirmed">Confirmado</option>
      <option value="pending">Pendiente</option>
      <option value="canceled">Cancelado</option>
    </select>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
      Filtrar
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const status = ref('');
const emit = defineEmits(['filter']);

// Función para aplicar el filtro y emitir el evento
function applyFilter() {
  emit('filter', { courseId: '1', status: status.value }); // Ajusta el courseId si es necesario
}
</script>