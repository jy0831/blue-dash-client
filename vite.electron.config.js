// vite.electron.config.js
import { build, defineConfig } from 'vite'
import path from 'path'
import electron from 'vite-plugin-electron/simple'

export default defineConfig((mode) => {
  // build: {
  //   outDir: 'dist-electron',
  //   emptyOutDir: true,
  //   // lib: {
  //   //   entry: path.resolve(__dirname, 'src/main/main.js'),
  //   //   formats: ['cjs'],
  //   //   fileName: () => 'blue-dash-client.cjs'
  //   // },
  //   rollupOptions: {
  //     external: ['electron', 'path', 'fs', 'url']
  //   }
  // },
  // const env = config({ path: `.env.${mode}` });
  // console.log('🔧 Loaded env:', env)
  return {
    plugins: [
      electron({
        main: {
          entry: 'src/main/main.js',
        },
        preload: {
          input: 'src/preload/preload.js'
        }
      })
    ]
  }
})
