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

    <!-- Campo de selección de Instructor -->
    <div>
      <label for="instructor" class="block text-sm font-medium text-gray-700">Instructor</label>
      <select
          id="instructor"
          v-model="form.instructor.id"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
      >
        <option value="" disabled>Seleccione un instructor</option>
        <option v-for="instructor in instructors" :key="instructor.id" :value="instructor.id">
          {{ instructor.name }}
        </option>
      </select>
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
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getAllInstructors, createCourse, updateCourse } from '@/services/coursesService';
import { useRouter } from 'vue-router';
import { ItemInstructor } from '@/models/ItemInstructor';

const instructors = ref<ItemInstructor[]>([]);

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
      imageUrl: '',
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
    default: false,
  }
});

const form = ref({ ...props.existingCourse });
const previewImage = ref(form.value.imageUrl || null); // Vista previa de la imagen desde la URL
const isSubmittingLocal = ref(false);
const router = useRouter();


// Cargar la lista de instructores al montar el componente
onMounted(async () => {
  try {
    instructors.value = await getAllInstructors();
  } catch (error) {
    console.error('Error al cargar instructores:', error);
  }
});

// Manejar la carga de imágenes
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input?.files?.length) {
    const file = input.files[0];
    if (file.size > 2000000) {
      console.error('El archivo es demasiado grande');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      form.value.imageUrl = reader.result as string; // Almacena la imagen en la propiedad imageUrl
      previewImage.value = reader.result as string; // Actualiza la vista previa de la imagen
    };
    reader.readAsDataURL(file);
  }
};

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

const toISOStringWithTimezone = (dateString: string) => {
  const date = new Date(dateString);
  const tzOffset = date.getTimezoneOffset() * 60000; // Offset en milisegundos
  return new Date(date.getTime() - tzOffset).toISOString();
};

// Enviar el formulario para actualizar o crear el curso
const submitFormCourse = async () => {
  if (isSubmittingLocal.value) return;

  isSubmittingLocal.value = true;

  try {
    const payload = { ...form.value };
    payload.startDate = toISOStringWithTimezone(payload.startDate);
    payload.endDate = toISOStringWithTimezone(payload.endDate);

    payload.instructor = form.value.instructor;

    if (props.isEditing) {
      await updateCourse(payload.id, payload);
      console.log('Curso actualizado con éxito');
    } else {
      await createCourse(payload);
      console.log('Curso creado con éxito');
    }

    router.push({ name: 'AdminCoursesList' });
  } catch (error) {
    console.error('Error al guardar el curso:', error);
  } finally {
    isSubmittingLocal.value = false;
  }
};

// Actualizar el formulario cuando cambie el curso existente
watch(
    () => props.existingCourse,
    (newCourse) => {
      form.value = { ...newCourse };
      previewImage.value = newCourse.imageUrl || null;
    },
    { immediate: true }
);
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
