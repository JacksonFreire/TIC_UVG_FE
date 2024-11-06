// stores/eventStore.ts
import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
    state: () => ({
        selectedEvent: {
            id: 0,
            name: '',
        },
    }),
    actions: {
        setSelectedEvent(eventId: number, eventName: string) {
            this.selectedEvent.id = eventId;
            this.selectedEvent.name = eventName;
        },
        clearSelectedEvent() {
            this.selectedEvent.id = 0;
            this.selectedEvent.name = '';
        },
    },
});