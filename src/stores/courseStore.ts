// stores/courseStore.ts
import { defineStore } from 'pinia';

export const useCourseStore = defineStore('course', {
    state: () => ({
        selectedCourse: {
            id: '',
            name: '',
        },
    }),
    actions: {
        setSelectedCourse(courseId: string, courseName: string) {
            this.selectedCourse.id = courseId;
            this.selectedCourse.name = courseName;
        },
        clearSelectedCourse() {
            this.selectedCourse.id = '';
            this.selectedCourse.name = '';
        },
    },
});
