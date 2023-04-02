import fs from 'fs'
import path from 'path'
import { getBuffer } from '../src/getBuffer'
/*
;(async () => {
  try {
    const png = fs.readFileSync(path.join(__dirname, '..', 'tests', 'images', 'hrse.png'))
    const jpeg = fs.readFileSync(
      path.join(__dirname, '..', 'tests', 'images', 'test-image.jpeg')
    )
    const res = await hashImg({ data: jpeg, precise: true })
    console.log('Hash is:', res)
  } catch (error) {
    console.error(error)
  }
})()
*/
/*
// import { Buffer } from 'buffer/'
import { HashImgOpts, InputData } from '.'
import { File } from 'buffer'

/**
 * Get an ArrayBuffer from input data
 * @param data - Image data
 * @param fetchOptions - Options to pass to fetch
 * @returns ArrayBuffer
 */

/*
export async function getBuffer(
  data: InputData,
  fetchOptions: HashImgOpts['fetchOptions']
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
*/

const externalPng =
  'https://github.com/nodejs/logos/blob/master/logos/iojs-multiple-hex/iojs-logo-dark_500x500.png'
const imageDir = path.join(__dirname, 'images')
const horseImage = fs.readFileSync(path.join(imageDir, 'hrse.png'))
const hotdogJpeg = fs.readFileSync(path.join(imageDir, 'test-image.jpeg'))

describe('getBuffer', () => {
  it('should get an ArrayBuffer from a URL', async () => {
    const buffer = await getBuffer(externalPng)
    expect(buffer).toBeInstanceOf(ArrayBuffer)
  })

  it('should throw an error for an invalid URL', async () => {
    await expect(getBuffer('invalid')).rejects.toThrowError('Invalid URL')
  })

  // it('should get an ArrayBuffer from a File', async () => {
  //   const buffer = await getBuffer(new File([horseImage], 'horse.png'))
  //   expect(buffer).toBeInstanceOf(ArrayBuffer)
  // })

  it('should get an ArrayBuffer from a Blob', async () => {
    const buffer = await getBuffer(new Blob([horseImage]))
    expect(buffer).toBeInstanceOf(ArrayBuffer)
  })

  it('should get an ArrayBuffer from a Buffer', async () => {
    const buffer = await getBuffer(Buffer.from(horseImage))
    expect(buffer).toBeInstanceOf(ArrayBuffer)
  })

  it('should get an ArrayBuffer from an ArrayBuffer', async () => {
    const buffer = await getBuffer(horseImage.buffer)
    expect(buffer).toBeInstanceOf(ArrayBuffer)
  })

  it('should throw an error for an unsupported input type', async () => {
    // @ts-expect-error
    await expect(getBuffer(123)).rejects.toThrowError('Unsupported input type')
  })
})
