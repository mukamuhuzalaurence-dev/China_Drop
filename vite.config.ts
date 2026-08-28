import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // Use /China_Drop/ for github pages, but fallback to ./ for capacitor if needed
  base: command === 'build' ? '/China_Drop/' : '/',
}))
