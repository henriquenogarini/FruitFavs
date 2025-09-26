import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/fv-api': { 
        target: 'https://www.fruityvice.com', 
        changeOrigin: true, 
        secure: false,
        rewrite: p => p.replace(/^\/fv-api/, '')
       }
    }
  }
})
