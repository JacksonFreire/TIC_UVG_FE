<template>
  <div class="flex items-start py-6 hover:bg-gray-50 transition duration-300">
    <!-- Fecha del evento -->
    <div class="flex-shrink-0 w-16 text-center mr-4">
      <p class="text-lg font-bold text-gray-800">{{ eventDate.day }}</p>
      <p class="text-sm text-gray-500">{{ eventDate.month }}</p>
    </div>
    <!-- Detalles del evento -->
    <div class="flex-grow">
      <h3 class="text-2xl font-semibold text-gray-800 mb-2">{{ event.name }}</h3>
      <p class="text-sm text-gray-500 mb-1">
        <span class="font-semibold">Ubicación:</span> {{ event.location }}
      </p>
      <p class="text-sm text-gray-500 mb-2">
        {{ formatDate(event.startDate) }} - {{ formatDate(event.endDate) }}
      </p>
      <p class="text-gray-600 mb-2">{{ event.description }}</p>
      <p class="text-gray-800 font-bold">{{ event.price > 0 ? '$' + event.price.toFixed(2) : 'Gratis' }}</p>
    </div>
    <!-- Imagen del evento -->
    <div class="ml-4 w-36 h-24 flex-shrink-0">
      <img :src="'data:image/jpeg;base64,' + event.image" alt="Event Image" class="w-full h-full object-cover rounded-lg shadow-md">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  price: number;
  image: string; // Imagen en base64
  startDate: string;
  endDate: string;
}

export default defineComponent({
  name: 'EventItem',
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true,
    },
  },
  computed: {
    eventDate() {
      const date = new Date(this.event.startDate);
      if (isNaN(date.getTime())) {
        return { day: '', month: '' }; // Manejar la fecha inválida
      }
      const options: Intl.DateTimeFormatOptions = { month: 'short' };
      return {
        day: date.getDate(),
        month: new Intl.DateTimeFormat('es-ES', options).format(date),
      };
    },
  },
  methods: {
    formatDate(date: string): string {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return 'Fecha inválida'; // Manejar la fecha inválida
      }
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return parsedDate.toLocaleDateString('es-ES', options);
    },
  },
});
</script>
