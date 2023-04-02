import { HashImgOpts, InputData } from '.';
/**
 * Get an ArrayBuffer from input data
 * @param data - Image data
 * @param fetchOptions - Options to pass to fetch
 * @returns ArrayBuffer
 */
export declare function getBuffer(data: InputData, fetchOptions: HashImgOpts['fetchOptions']): Promise<ArrayBuffer>;
