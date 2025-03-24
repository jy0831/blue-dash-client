// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { config } from 'dotenv'
import electron from 'vite-plugin-electron/simple'

export default defineConfig(({ mode }) => {
  const env = config({ path: `.env.${mode}` });
  console.log('🔧 Loaded env:', env.parsed)

  return {
    server: {
      port: env.parsed.VITE_APP_PORT
    },
    root: path.resolve(__dirname, 'src/renderer'),
    base: "./",
    build: {
      outDir: path.resolve(__dirname, 'dist-renderer'),
      emptyOutDir: true
    },
    define: {
      __ENV: env.parsed
    },
    plugins: [
      vue()
    ],
  }
})
