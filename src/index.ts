import path from 'path'
import * as wasm from '../rust/pkg/wasm_phash.js'
import fs from 'fs'
import { RequestInit } from 'node-fetch'
import { getBuffer } from './getBuffer'

export type InputData = Buffer | URL | Blob | File | string | ArrayBuffer | File

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

export type HashImgOpts = {
  data: InputData
  hashBits?: number
  precise?: boolean
  fetchOptions?: globalThis.RequestInit
}

/**
 * Hash an image
 * @param data - Image data
 * @param hashBits - Number of bits to use in the hash
 * @param precise - Use precise hashing
 * @returns Hash string
 * @example
 * ```js
 * const hash = await hashImg({
 *  data: 'https://example.com/image.png',
 * hashBits: 8,
 * precise: true,
 * })
 * ```
 * @example
 * ```js
 * const hash = await hashImg({
 * data: new File([''], 'image.png'),
 * hashBits: 8,
 * precise: false,
 * })
 * ```
 */
async function hashImg({
  data,
  hashBits = 8,
  precise = true,
  fetchOptions,
}: HashImgOpts): Promise<string> {
  try {
    if (typeof fetch === 'undefined') {
      await setupGlobalFetch()
    }
    const buffer = await getBuffer(data, fetchOptions)
    const uintBuff = new Uint8Array(buffer)
    const result = wasm.image_hash(uintBuff, hashBits, precise)
    return result
  } catch (error) {
    throw error
  }
}

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

export default {
  hashImg,
  getBuffer,
}
