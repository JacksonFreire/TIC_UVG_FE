import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

// Importar estilos de Tailwind CSS
import './assets/tailwind.css';

// Importar y configurar Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Importar los iconos ya utilizados
import { faBars, faUser, faSignInAlt, faSignOutAlt, faChevronDown, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// Añadir íconos a la biblioteca
library.add(
    faFacebook,
    faInstagram,
    faLinkedin,
    faBars,
    faUser,
    faSignInAlt,
    faSignOutAlt,
    faChevronDown,
    faEdit,
    faTrash,
    faEye
);

const app = createApp(App);

// Configurar Font Awesome como componente global
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount('#app');