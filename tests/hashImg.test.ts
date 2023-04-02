import { File } from 'buffer'
import { hashImg } from '../src/hashImg'
import fs from 'fs'
import path from 'path'

const externalPng =
  'https://github.com/nodejs/logos/blob/master/logos/iojs-multiple-hex/iojs-logo-dark_500x500.png?raw=true'
const imageDir = path.join(__dirname, 'images')
const horseImagePng = fs.readFileSync(path.join(imageDir, 'hrse.png'))
const hotdogJpeg = fs.readFileSync(path.join(imageDir, 'hotdog.jpeg'))
const invertedHotdogJpeg = fs.readFileSync(path.join(imageDir, 'hotdog-inverted.jpeg'))

describe('hashImg', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should hash an image from a URL', async () => {
    const hash = await hashImg({
      data: externalPng,
      hashBits: 8,
      precise: true,
    })
    expect(typeof hash).toBe('string')
    expect(hash.length).toBeGreaterThan(0)
  })

  it('should hash an image from a File', async () => {
    const hash = await hashImg({
      data: new File([horseImagePng], 'horse.png'),
      hashBits: 8,
      precise: true,
    })
    expect(typeof hash).toBe('string')
    expect(hash.length).toBeGreaterThan(0)
  })

  it('should hash an image from a Blob', async () => {
    const hash = await hashImg({
      data: new Blob([horseImagePng]),
      hashBits: 8,
      precise: true,
    })
    expect(typeof hash).toBe('string')
    expect(hash.length).toBeGreaterThan(0)
  })

  it('should hash an image from a Buffer', async () => {
    const hash = await hashImg({
      data: Buffer.from(horseImagePng),
      hashBits: 8,
      precise: true,
    })
    expect(typeof hash).toBe('string')
    expect(hash.length).toBeGreaterThan(0)
  })

  it('should hash an image from an ArrayBuffer', async () => {
    const hash = await hashImg({
      data: horseImagePng.buffer,
      hashBits: 8,
      precise: true,
    })
    expect(typeof hash).toBe('string')
    expect(hash.length).toBeGreaterThan(0)
  })

  it('should hash an image from a Uint8Array', async () => {
    const hash = await hashImg({
      data: horseImagePng,
      hashBits: 8,
      precise: true,
    })
    expect(typeof hash).toBe('string')
    expect(hash.length).toBeGreaterThan(0)
  })

  it('should return the same hash for the same png image', async () => {
    const hash1 = await hashImg({
      data: horseImagePng,
      hashBits: 16,
      precise: true,
    })
    const hash2 = await hashImg({
      data: horseImagePng,
      hashBits: 16,
      precise: true,
    })
    expect(hash1).toBe(hash2)
    expect(hash1.length).toBeGreaterThan(0)
  })

  it('should return the same hash for the same jpeg image', async () => {
    const hash1 = await hashImg({
      data: hotdogJpeg,
      hashBits: 16,
      precise: true,
    })
    const hash2 = await hashImg({
      data: hotdogJpeg,
      hashBits: 16,
      precise: true,
    })
    expect(hash1).toBe(hash2)
    expect(hash1.length).toBeGreaterThan(0)
  })

  it('should throw an error if the has bits are not between 4 and 64', async () => {
    const hashBits = 2
    await expect(
      hashImg({
        data: horseImagePng,
        hashBits,
        precise: true,
      })
    ).rejects.toThrowError('hashBits must be between 4 and 64')
  })

  it('should throw an error if the input is not a valid image', async () => {
    const invalidImage = Buffer.from('bad image')

    await expect(
      hashImg({
        data: invalidImage,
        hashBits: 8,
        precise: true,
      })
    ).rejects.toThrowError('Unsupported image format')
  })

  it('should return different hashes for different images', async () => {
    const hash1 = await hashImg({
      data: horseImagePng,
      hashBits: 16,
      precise: true,
    })
    const hash2 = await hashImg({
      data: hotdogJpeg,
      hashBits: 16,
      precise: true,
    })
    expect(hash1).not.toBe(hash2)
  })

  it('should return longer values for higher bits', async () => {
    const hash1 = await hashImg({
      data: horseImagePng,
      hashBits: 8,
      precise: true,
    })

    const hash2 = await hashImg({
      data: horseImagePng,
      hashBits: 16,
      precise: true,
    })
    expect(hash1.length).toBeLessThan(hash2.length)
  })

  it('should return different hashes for inverted images', async () => {
    const hash1 = await hashImg({
      data: hotdogJpeg,
      hashBits: 16,
      precise: true,
    })

    const hash2 = await hashImg({
      data: invertedHotdogJpeg,
      hashBits: 16,
      precise: true,
    })
    expect(hash1).not.toBe(hash2)
  })

  it('should return different values based on the precise option', async () => {
    const hash1 = await hashImg({
      data: horseImagePng,
      hashBits: 16,
      precise: true,
    })

    const hash2 = await hashImg({
      data: horseImagePng,
      hashBits: 16,
      precise: false,
    })
    expect(hash1).not.toBe(hash2)
    expect(hash1.length).toBeGreaterThan(0)
    expect(hash2.length).toBeGreaterThan(0)
  })

  it('should accept fetch options and still get the image', async () => {
    const fetchOptions = {
      headers: {
        'Content-Type': 'image/png',
      },
    }

    const hash = await hashImg({
      data: externalPng,
      hashBits: 8,
      precise: true,
      fetchOptions,
    })

    expect(typeof hash).toBe('string')
    expect(hash.length).toBeGreaterThan(0)
  })
})
