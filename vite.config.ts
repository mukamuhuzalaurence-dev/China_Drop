import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Use '/' for local dev and Capacitor; GitHub Pages needs the repo name as base
  base: process.env.GITHUB_PAGES === 'true' ? '/China_Drop/' : '/',
})
