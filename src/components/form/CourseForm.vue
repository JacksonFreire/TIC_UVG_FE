<template>
  <form @submit.prevent="submitFormCourse" class="space-y-4">
    <!-- Campos del formulario -->
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Nombre del curso</label>
      <input
          type="text"
          id="name"
          v-model="form.name"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
      />
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
      <textarea
          id="description"
          v-model="form.description"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
      ></textarea>
    </div>

    <div>
      <label for="category" class="block text-sm font-medium text-gray-700">Categoría</label>
      <input
          type="text"
          id="category"
          v-model="form.category"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div>
      <label for="lessonsCount" class="block text-sm font-medium text-gray-700">Número de lecciones</label>
      <input
          type="number"
          id="lessonsCount"
          v-model="form.lessonsCount"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
      />
    </div>

    <div>
      <label for="studentsCount" class="block text-sm font-medium text-gray-700">Número de estudiantes</label>
      <input
          type="number"
          id="studentsCount"
          v-model="form.studentsCount"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div>
      <label for="price" class="block text-sm font-medium text-gray-700">Precio</label>
      <input
          type="number"
          id="price"
          v-model="form.price"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div>
      <label for="duration" class="block text-sm font-medium text-gray-700">Duración</label>
      <input
          type="text"
          id="duration"
          v-model="form.duration"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div>
      <label for="level" class="block text-sm font-medium text-gray-700">Nivel</label>
      <input
          type="text"
          id="level"
          v-model="form.level"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div>
      <label for="eventPlace" class="block text-sm font-medium text-gray-700">Lugar del evento</label>
      <input
          type="text"
          id="eventPlace"
          v-model="form.eventPlace"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <!-- Imagen -->
    <div>
      <label for="image" class="block text-sm font-medium text-gray-700">Imagen</label>
      <input type="file" id="image" @change="onFileChange" accept="image/*" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      <!-- Vista previa de la imagen si está disponible -->
      <div v-if="previewImage" class="mt-4">
        <img :src="previewImage" alt="Vista previa de la imagen" class="max-h-40 object-cover rounded-lg" />
      </div>
    </div>

    <div>
      <label for="startDate" class="block text-sm font-medium text-gray-700">Fecha de inicio</label>
      <input
          type="datetime-local"
          id="startDate"
          v-model="form.startDate"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
      />
    </div>

    <div>
      <label for="endDate" class="block text-sm font-medium text-gray-700">Fecha de finalización</label>
      <input
          type="datetime-local"
          id="endDate"
          v-model="form.endDate"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
      />
    </div>

    <div>
      <label for="instructorId" class="block text-sm font-medium text-gray-700">Instructor ID</label>
      <input
          type="number"
          id="instructorId"
          v-model="form.instructor.id"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
      />
    </div>

    <!-- Campos para curriculums -->
    <div v-for="(curriculum, index) in form.curriculums" :key="index" class="border p-4 rounded-md mb-4">
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Curriculum {{ index + 1 }}</h3>
      <div>
        <label :for="`sectionName-${index}`" class="block text-sm font-medium text-gray-700">Nombre de la sección</label>
        <input
            type="text"
            :id="`sectionName-${index}`"
            v-model="curriculum.sectionName"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label :for="`lessonName-${index}`" class="block text-sm font-medium text-gray-700">Nombre de la lección</label>
        <input
            type="text"
            :id="`lessonName-${index}`"
            v-model="curriculum.lessonName"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label :for="`content-${index}`" class="block text-sm font-medium text-gray-700">Contenido</label>
        <textarea
            :id="`content-${index}`"
            v-model="curriculum.content"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>

      <div>
        <label :for="`lessonOrder-${index}`" class="block text-sm font-medium text-gray-700">Orden de la lección</label>
        <input
            type="number"
            :id="`lessonOrder-${index}`"
            v-model="curriculum.order"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
        />
      </div>

      <button
          type="button"
          @click="removeCurriculum(index)"
          class="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Eliminar Curriculum
      </button>
    </div>

    <!-- Botón para añadir nuevo curriculum -->
    <button
        type="button"
        @click="addCurriculum"
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Añadir Curriculum
    </button>

    <div>
      <button
          type="submit"
          class="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          :disabled="isSubmittingLocal"
      >
        <font-awesome-icon v-if="!isSubmittingLocal" :icon="['fas', 'save']" class="mr-2" />
        <font-awesome-icon v-else :icon="['fas', 'spinner']" class="fa-spin" />
        <span v-if="!isSubmittingLocal">Guardar Curso</span>
        <span v-else>Guardando...</span>
      </button>
    </div>
  </form>

  <!-- Diálogo de notificación -->
  <dialog ref="notificationDialog" class="rounded-lg shadow-xl p-6 max-w-md w-full">
    <div class="flex items-start px-4 py-3 rounded-lg" :class="dialogClass">
      <div class="flex-shrink-0 mr-4">
        <font-awesome-icon :icon="dialogIcon" class="text-3xl" />
      </div>
      <div>
        <h3 class="text-lg font-semibold" :class="dialogTitleClass">{{ dialogTitle }}</h3>
        <p class="mt-2 text-gray-700">{{ dialogMessage }}</p>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <button @click="closeDialog" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2">
        Cerrar
      </button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { createCourse, updateCourse } from '@/services/coursesService';
import { useRouter } from 'vue-router';

const props = defineProps({
  existingCourse: {
    type: Object,
    default: () => ({
      id: null,
      name: '',
      description: '',
      category: '',
      lessonsCount: 0,
      studentsCount: null,
      price: 0,
      duration: '',
      level: '',
      eventPlace: '',
      image: null,
      startDate: '',
      endDate: '',
      instructor: {
        id: null,
      },
      curriculums: [],
    }),
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
  isEditing: {
    type: Boolean,
    default: false, // Nuevo prop para determinar si es creación o edición
  }
});

const form = ref({ ...props.existingCourse });
const notificationDialog = ref(null);
const dialogMessage = ref('');
const dialogTitle = ref('');
const dialogClass = ref('');
const dialogIcon = ref(['fas', 'check-circle']);
const dialogTitleClass = ref('');
const router = useRouter();
const previewImage = ref(form.value.image ? `data:image/jpeg;base64,${form.value.image}` : null); // URL para mostrar imagen
const isSubmittingLocal = ref(false); // Variable local para gestionar el estado de envío

// Mostrar el diálogo de éxito o error
const showDialog = (message: string, type: 'success' | 'error') => {
  dialogMessage.value = message;
  if (type === 'success') {
    dialogTitle.value = 'Éxito';
    dialogClass.value = 'bg-green-100';
    dialogIcon.value = ['fas', 'check-circle'];
    dialogTitleClass.value = 'text-green-700';
  } else {
    dialogTitle.value = 'Error';
    dialogClass.value = 'bg-red-100';
    dialogIcon.value = ['fas', 'triangle-exclamation'];
    dialogTitleClass.value = 'text-red-700';
  }
  notificationDialog.value?.showModal();
};

// Cerrar el diálogo y redirigir a la lista de cursos
const closeDialog = () => {
  notificationDialog.value?.close();
  router.push({ name: 'AdminCoursesList' }); // Redirige a la lista de cursos
};

// Actualizar el formulario cuando cambie el curso existente
watch(
    () => props.existingCourse,
    (newCourse) => {
      form.value = { ...newCourse };
      // Actualizar vista previa de imagen si hay una nueva
      previewImage.value = newCourse.image ? `data:image/jpeg;base64,${newCourse.image}` : null;
    },
    { immediate: true }
);

// Función para añadir un nuevo curriculum
const addCurriculum = () => {
  form.value.curriculums.push({
    sectionName: '',
    lessonName: '',
    content: '',
    order: form.value.curriculums.length + 1,
    duration: '',
    type: '',
    resourceLink: '',
    isMandatory: false,
  });
};

// Función para eliminar un curriculum
const removeCurriculum = (index: number) => {
  form.value.curriculums.splice(index, 1);
};

// Manejar la carga de imágenes
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input?.files?.length) {
    const file = input.files[0];
    if (file.size > 9000000) { // 2 MB límite
      console.error('El archivo es demasiado grande');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      form.value.image = reader.result as string;
      previewImage.value = reader.result as string; // Actualizar vista previa
    };
    reader.readAsDataURL(file);
  }
};

// Preparar el payload antes de enviarlo al servidor
const preparePayload = (courseData: any) => {
  const payload = JSON.parse(JSON.stringify(courseData));

  if (payload.startDate && payload.endDate) {
    payload.startDate = new Date(payload.startDate).toISOString();
    payload.endDate = new Date(payload.endDate).toISOString();
  }

  console.log('Payload preparado:', payload); // Verificar el payload antes de enviarlo
  return payload;
};

// Enviar el formulario para actualizar o crear el curso
const submitFormCourse = async () => {
  if (isSubmittingLocal.value) {
    console.log('Formulario ya está en proceso de envío.');
    return;
  }

  isSubmittingLocal.value = true; // Bloquear múltiples envíos

  try {
    const payload = preparePayload(form.value);
    console.log('Datos del formulario:', form.value); // Verificar los datos del formulario

    if (props.isEditing) {
      await updateCourse(form.value.id, payload);
      console.log('Curso actualizado con éxito');
      showDialog('Curso actualizado exitosamente', 'success');
    } else {
      await createCourse(payload); // Crear el curso si no está en modo edición
      console.log('Curso creado con éxito');
      showDialog('Curso creado exitosamente', 'success');
    }
  } catch (error) {
    console.error('Error al guardar el curso:', error);
    showDialog('Error al guardar el curso. Por favor, inténtelo de nuevo', 'error');
  } finally {
    isSubmittingLocal.value = false; // Rehabilitar el botón después de la operación
  }
};
</script>



<style scoped>
/* Estilos personalizados si es necesario */
</style>
