import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

// Importa los estilos de Tailwind CSS
import './assets/tailwind.css';

// Importaciones de FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// Añadir los íconos a la biblioteca
library.add(faEnvelope, faPhone, faMapMarkerAlt, faFacebook, faInstagram, faLinkedin);

const app = createApp(App);

// Configura FontAwesome como un componente global
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount('#app');