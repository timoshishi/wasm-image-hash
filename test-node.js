// const wasmModule = require('./dist/wasm-phash.umd.js')
const fs = require('fs')
const { hashImg } = require('./dist/index.umd.js').default
;(async () => {
  const imageData = fs.readFileSync(__dirname + '/tests/images/devio.png')
  // const hash = await wasmModule.image_hash(imageData, 16, true)
  // console.log(wasm)
  const res = await hashImg({ data: imageData, precise: true })
  console.log({ res })
  console.log('Image hash:', hash)
})()

// ;(async () => {
//   try {
//     const png = fs.readFileSync(path.join(__dirname, '..', 'tests', 'images', 'hrse.png'))
//     const jpeg = fs.readFileSync(
//       path.join(__dirname, '..', 'tests', 'images', 'test-image.jpeg')
//     )
//     const res = await hashImg({ data: jpeg, precise: true })
//     console.log('Hash is:', res)
//   } catch (error) {
//     console.error(error)
//   }
// })()
