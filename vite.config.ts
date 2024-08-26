import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(), // Solo necesitas mantener este plugin para Vue
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});