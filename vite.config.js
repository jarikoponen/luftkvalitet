import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://data.sundsvall.se',
        changeOrigin: true,
        secure: true,
      },
      '/smhi': {
        target: 'https://opendata-download-metobs.smhi.se',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/smhi/, ''),
      }
    }
  }
})
