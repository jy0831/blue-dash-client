// scripts/copy-preload.js
import fs from 'fs'
import path from 'path'

const src = path.resolve('src/preload.js')
const dest = path.resolve('dist-electron/preload.js')

fs.copyFileSync(src, dest)
console.log(`✅ Copied preload.js to ${dest}`)
