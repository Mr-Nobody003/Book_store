import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:  process.env.GITHUB_PAGES === 'true'
  ? '/Book_store_frontend/' // Base path for GitHub Pages
  : undefined, // Root path for Vercel
})
