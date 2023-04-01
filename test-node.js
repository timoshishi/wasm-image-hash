const wasmModule = require('./dist/wasm-phash.umd.js')
const fs = require('fs')

;(async () => {
  const imageData = fs.readFileSync('./src/test-image.jpeg')
  const hash = await wasmModule.image_hash(imageData, 16, true)
  console.log('Image hash:', hash)
})()
