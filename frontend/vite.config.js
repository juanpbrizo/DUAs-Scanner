import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0, // Permitir incluir todas las imágenes independientemente de su tamaño
    rollupOptions: {
      output: {
        manualChunks: undefined, // Deshabilitar la división de chunks manuales
      },
    },
  },
  resolve: {
    alias: {
      // Establecer un alias para el directorio de imágenes para que puedas usar rutas relativas
      // desde el directorio raíz del proyecto
      '@/img': '/src/img'
    },
  },
});