import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      enableBuild: true,
      typescript: true,
      overlay: true,
      eslint: {
        lintCommand: 'eslint --ext .ts,.tsx src',
      },
    }),
  ],
  server: {
    port: 3000,
    host: false,
  },
  preview: {
    port: 5000,
    host: true,
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src'),
    },
  },
})
