import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH lets the same build serve from a root domain ("/", the default — Docker,
// Netlify, Vercel) or from a sub-path such as GitHub Pages ("/portfolio/").
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      // The home page plus one HTML page per project (pre-rendered by scripts/prerender.mjs)
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        flowforge: resolve(import.meta.dirname, 'projects/flowforge/index.html'),
        creditcast: resolve(import.meta.dirname, 'projects/creditcast/index.html'),
        supersaint: resolve(import.meta.dirname, 'projects/supersaint/index.html'),
      },
    },
  },
})
