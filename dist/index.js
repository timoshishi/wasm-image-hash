"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wasmImageHash = void 0;
const wasm_image_hash_1 = require("../rust/wasm_image_hash/pkg/wasm_image_hash");
async function wasmImageHash(data, bits, precise) {
    const result = (0, wasm_image_hash_1.image_hash)(new Uint8Array(data), bits, precise);
    return result;
}
exports.wasmImageHash = wasmImageHash;
