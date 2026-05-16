import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1600,
  },
  // Isse TypeScript ke errors build nahi rokenge
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
