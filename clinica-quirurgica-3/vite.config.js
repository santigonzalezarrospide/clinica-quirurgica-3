import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // 🔹 Define la carpeta de salida
    emptyOutDir: true, // 🔹 Limpia la carpeta antes de cada build
  }
})
