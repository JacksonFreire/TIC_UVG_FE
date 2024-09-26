import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

// Importar estilos de Tailwind CSS
import './assets/tailwind.css';

// Importar y configurar Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Importar los íconos de marcas

// Añadir íconos a la biblioteca
library.add(faFacebook, faInstagram, faLinkedin, faBars, faUser, faSignInAlt, faSignOutAlt);

const app = createApp(App);

// Configura Font Awesome como un componente global
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount('#app');
