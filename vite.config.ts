import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist', // Especifica la carpeta de salida para los archivos compilados
    assetsDir: 'assets', // Carpeta para los activos generados (CSS, JS, imágenes, etc.)
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
  server: {
    port: 5173, // Cambia el puerto si es necesario
    open: true, // Abre automáticamente el navegador al iniciar el servidor
  },
});