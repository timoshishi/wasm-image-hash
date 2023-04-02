// import { Buffer } from 'buffer/'
import { HashImgOpts, InputData } from '.'
import { File } from 'buffer'
/**
 * Get an ArrayBuffer from input data
 * @param data - Image data
 * @param fetchOptions - Options to pass to fetch
 * @returns ArrayBuffer
 */
export async function getBuffer(
  data: InputData,
  fetchOptions?: HashImgOpts['fetchOptions']
): Promise<ArrayBuffer> {
  let input = data
  let buffer: ArrayBuffer | null = null

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
      ...(fetchOptions || {}),
    })
    buffer = await response.arrayBuffer()
  } else if (input instanceof File || input instanceof Blob) {
    // If input is a File object, read its contents into a buffer
    buffer = await input.arrayBuffer()
  } else if (Buffer.isBuffer(input)) {
    // If input is a buffer, convert it to an ArrayBuffer
    buffer = input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength)
  } else if (input instanceof ArrayBuffer) {
    // If input is already an ArrayBuffer, return it as is
    buffer = input
  } else {
    throw new Error('Unsupported input type')
  }
  return buffer
}
