import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // Ye plugin tumhare original design ko wapas active karega
  ],
  build: {
    outDir: 'dist'
  }
})
