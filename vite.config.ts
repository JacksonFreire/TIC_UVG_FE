import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Cargar las variables de entorno basadas en el modo (development, production)
  const env = loadEnv(mode, process.cwd());

  const backendUrl = env.VITE_APP_BASE_URL_API || 'http://localhost:8080';

  return {
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
      proxy: {
        '/api': {
          target: backendUrl, // Usa la variable de entorno o un valor por defecto
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // Opcionalmente reescribe el path si es necesario
        },
      },
    },
  };
});