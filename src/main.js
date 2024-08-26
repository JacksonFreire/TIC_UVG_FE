import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './assets/tailwind.css'; // Importa gli stili di Tailwind CSS
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
