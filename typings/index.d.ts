/// <reference types="node" />
import { Buffer, File } from 'buffer';
declare function wasmImageHash(data: Buffer | URL | Blob | File | string, bits: number, precise: boolean): Promise<string>;
declare const _default: {
    wasmImageHash: typeof wasmImageHash;
};
export default _default;
