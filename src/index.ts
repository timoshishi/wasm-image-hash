import { image_hash } from '../rust/pkg/wasm_image_hash'

export async function wasmImageHash(
  data: Buffer,
  bits: number,
  precise: boolean
): Promise<string> {
  const result = image_hash(new Uint8Array(data), bits, precise)
  return result
}
