// stores/eventStore.ts
import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
    state: () => ({
        selectedEvent: {
            id: '',
            name: '',
        },
    }),
    actions: {
        setSelectedEvent(eventId: string, eventName: string) {
            this.selectedEvent.id = eventId;
            this.selectedEvent.name = eventName;
        },
        clearSelectedEvent() {
            this.selectedEvent.id = '';
            this.selectedEvent.name = '';
        },
    },
});