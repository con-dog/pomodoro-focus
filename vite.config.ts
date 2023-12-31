import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [svelte()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `pomodoroFocus.js`,
        chunkFileNames: `pomodoroFocus.js`,
        assetFileNames: `[name].[ext]`,
      }
    }
  }
})
