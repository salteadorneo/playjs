import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [deno(), react()],
  base: '/playjs/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
