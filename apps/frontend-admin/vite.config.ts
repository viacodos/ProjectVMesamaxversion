import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    },
    fs: {
      allow: ['../..']
    }
  },
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, '../../packages/ui'),
      '@': path.resolve(__dirname, '../../packages/ui/src'),
      '@/lib': path.resolve(__dirname, '../../packages/ui/src/lib'),
      '@/components': path.resolve(__dirname, '../../packages/ui/src/components')
    }
  }
})