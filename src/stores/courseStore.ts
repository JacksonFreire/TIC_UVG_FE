// stores/courseStore.ts
import { defineStore } from 'pinia';

export const useCourseStore = defineStore('course', {
    state: () => ({
        selectedCourse: {
            id: 0,  // Cambiado a tipo número
            name: '',
        },
    }),
    actions: {
        setSelectedCourse(courseId: number, courseName: string) { // Cambiado a número
            this.selectedCourse.id = courseId;
            this.selectedCourse.name = courseName;
        },
        clearSelectedCourse() {
            this.selectedCourse.id = 0;  // Restablecido a 0
            this.selectedCourse.name = '';
        },
    },
});
