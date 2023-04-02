import fs from 'fs'
import path from 'path'
import { getBuffer } from '../src/getBuffer'

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
