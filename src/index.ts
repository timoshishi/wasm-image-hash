import path from 'path'
import { Buffer, File } from 'buffer'
import * as wasm from '../rust/pkg/wasm_phash.js'
import fs from 'fs'
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
  data: Buffer | URL | Blob | File | string,
  bits: number,
  precise: boolean
): Promise<string> {
  if (typeof fetch === 'undefined') {
    await setupGlobalFetch()
  }
  let input = data
  let buffer
  if (typeof input === 'string') {
    // validate URL
    try {
      input = new URL(input)
    } catch (e) {
      throw new Error('Invalid URL')
    }
    // If input is a string, assume it's a URL and fetch it
    const response = await fetch(input, {
      mode: 'cors',
    })
    buffer = await response.arrayBuffer()
  } else if (input instanceof File) {
    // If input is a File object, read its contents into a buffer
    buffer = await input.arrayBuffer()
  } else if (Buffer.isBuffer(input)) {
    // If input is a buffer, convert it to an ArrayBuffer
    buffer = input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength)
  } else {
    throw new Error('Unsupported input type')
  }
  const uintBuff = new Uint8Array(buffer)
  const result = wasm.image_hash(uintBuff, bits, precise)
  return result
}
;(async () => {
  try {
    const png = fs.readFileSync(path.join(__dirname, 'hrse.png'))
    const jpeg = fs.readFileSync(path.join(__dirname, 'test-image.jpeg'))
    const res = await wasmImageHash(jpeg, 8, true)
    console.log('Hash is:', res)
  } catch (error) {
    console.error(error)
  }
})()
export default {
  wasmImageHash,
}
