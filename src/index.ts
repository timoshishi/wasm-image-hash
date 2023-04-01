import * as wasm from '../rust/pkg/wasm_img_hash.js'

async function setupGlobalFetch() {
  // Use node-fetch as polyfill for fetch in Node.js
  const { default: fetch, Headers, Request, Response } = await import('node-fetch')
  // @ts-ignore
  global.fetch = fetch
  // @ts-ignore
  global.Headers = Headers
  // @ts-ignore
  global.Request = Request
  // @ts-ignore
  global.Response = Response
}

async function wasmImageHash(
  data: Buffer,
  bits: number,
  precise: boolean
): Promise<string> {
  const result = wasm.image_hash(new Uint8Array(data), bits, precise)
  return result
}

/*
import path from 'path'
import fs from 'fs/promises'

const testFunction = async () => {
  const imgFile = await fs.readFile(path.join(__dirname, 'test-image.jpeg'))
  const hash = await wasmImageHash(imgFile, 8, true)
  return wasm.image_hash(new Uint8Array(imgFile), 32, true)
}
;(async () => {
  const inTs = await testFunction()
  console.log({ inTs })
})()
*/

export default {
  wasmImageHash,
  setupGlobalFetch,
}
