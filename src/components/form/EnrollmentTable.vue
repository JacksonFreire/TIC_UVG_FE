<template>
  <table class="min-w-full bg-white dark:bg-gray-800">
    <thead>
    <tr class="bg-gray-200 dark:bg-gray-700">
      <th class="py-2 px-4">Nombre</th>
      <th class="py-2 px-4">Email</th>
      <th class="py-2 px-4">Usuario</th>
      <th class="py-2 px-4">Teléfono</th>
      <th class="py-2 px-4">Fecha de Nacimiento</th>
      <th class="py-2 px-4">Estado</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="enrollment in enrollments" :key="enrollment.email" class="text-center">
      <td class="py-2 px-4">{{ enrollment.firstName }} {{ enrollment.lastName }}</td>
      <td class="py-2 px-4">{{ enrollment.email }}</td>
      <td class="py-2 px-4">{{ enrollment.username }}</td>
      <td class="py-2 px-4">{{ enrollment.phoneNumber }}</td>
      <td class="py-2 px-4">{{ enrollment.birthDate }}</td>
      <td class="py-2 px-4">{{ enrollment.status }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps<{
  enrollments: Array<{
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNumber: string;
    birthDate: string;
    status: string;
  }>;
}>();
</script>

<style scoped>
table {
  font-family: 'Inter', sans-serif;
}
</style>