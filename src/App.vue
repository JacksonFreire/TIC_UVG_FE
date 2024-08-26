<template>
  <div class="min-h-screen bg-gray-100">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'App',
});
</script>