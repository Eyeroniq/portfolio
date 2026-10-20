import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH lets the same build serve from a root domain ("/", the default — Docker,
// Netlify, Vercel) or from a sub-path such as GitHub Pages ("/portfolio/").
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
