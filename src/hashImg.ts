import path from 'path'
import * as wasm from '../rust/pkg/wasm_phash.js'
import fs from 'fs'
import { RequestInit } from 'node-fetch'
import { getBuffer } from './getBuffer'
import { File } from 'buffer'

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
 * @param hashBits - Number of bits to use in the hash max 64
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
export async function hashImg({
  data,
  hashBits = 8,
  precise = true,
  fetchOptions,
}: HashImgOpts): Promise<string> {
  if (hashBits > 64 || hashBits < 4) {
    throw new Error('hashBits must be between 4 and 64')
  }
  try {
    if (typeof fetch === 'undefined') {
      await setupGlobalFetch()
    }
    const buffer = await getBuffer(data, fetchOptions)
    const uintBuff = new Uint8Array(buffer)
    const result = wasm.image_hash(uintBuff, hashBits, precise)
    if (result === 'Unsupported image format') {
      throw new Error(result)
    }
    return result
  } catch (error: any) {
    throw new Error(error)
  }
}
