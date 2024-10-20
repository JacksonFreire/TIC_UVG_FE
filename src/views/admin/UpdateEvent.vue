<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Actualizar Evento</h1>
    <div v-if="isLoading" class="text-center text-gray-500">Cargando detalles del evento...</div>
    <div v-else>
      <EventForm :isEditing="true" :existingEvent="event" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import EventForm from '@/components/form/EventForm.vue';
import { getEventById } from '@/services/eventService';  // Servicio para obtener un evento
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'UpdateEvent',
  components: {
    EventForm,
  },
  setup() {
    const route = useRoute();
    const event = ref({
      id: 0,
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      attendees: 0,
      image: '',
      createdAt: '',
      updatedAt: '',
    });
    const isLoading = ref(true);

    const fetchEventDetails = async () => {
      try {
        const eventId = route.params.id as string;
        event.value = await getEventById(eventId);
      } catch (error) {
        console.error('Error al cargar los detalles del evento:', error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(fetchEventDetails);

    return {
      event,
      isLoading,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
