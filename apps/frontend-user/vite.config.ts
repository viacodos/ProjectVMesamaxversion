import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173, // Set user to 5173, admin to 5174
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true
            }
        },
        fs: {
            // Allow Vite to serve files from the workspace root
            allow: ['../..'] 
        }
    },
    resolve: {
        alias: {
            // This allows you to use '@ui' as a shortcut in your imports
            '@ui': path.resolve(__dirname, '../../packages/ui')
        }
    }
})