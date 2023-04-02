/// <reference types="node" />
import { File } from 'buffer';
export type InputData = Buffer | URL | Blob | File | string | ArrayBuffer | File;
export type HashImgOpts = {
    data: InputData;
    hashBits?: number;
    precise?: boolean;
    fetchOptions?: globalThis.RequestInit;
};
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
export declare function hashImg({ data, hashBits, precise, fetchOptions, }: HashImgOpts): Promise<string>;
