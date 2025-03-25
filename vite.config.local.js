// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { config } from 'dotenv'
import electron from 'vite-plugin-electron/simple'

export default defineConfig(({ mode }) => {
  const env = config({ path: `.env.${mode}` });
  console.log('🔧 Loaded env:', env.parsed)
  const electronOut = path.resolve(__dirname, './dist-electron')
  return {
    server: {
      port: env.parsed.VITE_APP_PORT
    },
    root: path.resolve(__dirname, 'src/renderer'),
    build: {
      outDir: path.resolve(__dirname, 'dist-renderer'),
      emptyOutDir: true
    },
    define: {
      __ENV: env.parsed
    },
    base: 'src/main',
    plugins: [
      vue(),
      electron({
        main: {
          entry: '../main/main.js',
          vite: {
            build: {
              watch: {},
              outDir: path.join(electronOut)
            }
          },
          onstart(options) {
            if (process.env.VITE_DEV_SERVER_URL) {
              console.log('🔁 Electron restarting...')
            }
            options.startup() // ⚡ main.js 변경 시 Electron 자동 재시작
          }
        },
        preload: {
          entry: '../preload/preload.js',
          vite: {
            build: {
              watch: {},
              outDir: path.join(electronOut)
            }
          },
          onstart(options) {
            if (process.env.VITE_DEV_SERVER_URL) {
              console.log('🔁 Electron restarting...')
            }
            options.startup() // ⚡ main.js 변경 시 Electron 자동 재시작
          }
        }
      })
    ],
  }
})
