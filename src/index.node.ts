import * as wasm from './index'

export async function wasmImageHash(
  imageData: Buffer,
  bits: number,
  fast: boolean
): Promise<string> {
  return await wasm.default.wasmImageHash(imageData, bits, fast)
}
