import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Configuración para rutas relativas
  build: {
    chunkSizeWarningLimit: 1000, // Aumenta el límite para evitar advertencias
    outDir: 'dist', // Asegúrate de que la salida sea en 'dist'
  },
});
