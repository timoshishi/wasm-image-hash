/// <reference types="node" />
declare function setupGlobalFetch(): Promise<void>;
declare function wasmImageHash(data: Buffer, bits: number, precise: boolean): Promise<string>;
declare const _default: {
    wasmImageHash: typeof wasmImageHash;
    setupGlobalFetch: typeof setupGlobalFetch;
};
export default _default;
