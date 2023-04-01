"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const buffer_1 = require("buffer");
const wasm = __importStar(require("../rust/pkg/wasm_phash.js"));
const fs_1 = __importDefault(require("fs"));
async function setupGlobalFetch() {
    // Use node-fetch as polyfill for fetch in Node.js
    const { default: fetch, Headers, Request, Response } = await Promise.resolve().then(() => __importStar(require('node-fetch')));
    // @ts-ignore
    global.fetch = fetch;
    // @ts-ignore
    global.Headers = Headers;
    // @ts-ignore
    global.Request = Request;
    // @ts-ignore
    global.Response = Response;
}
async function wasmImageHash(data, bits, precise) {
    if (typeof fetch === 'undefined') {
        await setupGlobalFetch();
    }
    let input = data;
    let buffer;
    if (typeof input === 'string') {
        // validate URL
        try {
            input = new URL(input);
        }
        catch (e) {
            throw new Error('Invalid URL');
        }
        // If input is a string, assume it's a URL and fetch it
        const response = await fetch(input, {
            mode: 'cors',
        });
        buffer = await response.arrayBuffer();
    }
    else if (input instanceof buffer_1.File) {
        // If input is a File object, read its contents into a buffer
        buffer = await input.arrayBuffer();
    }
    else if (buffer_1.Buffer.isBuffer(input)) {
        // If input is a buffer, convert it to an ArrayBuffer
        buffer = input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength);
    }
    else {
        throw new Error('Unsupported input type');
    }
    const uintBuff = new Uint8Array(buffer);
    const result = wasm.image_hash(uintBuff, bits, precise);
    return result;
}
;
(async () => {
    try {
        const png = fs_1.default.readFileSync(path_1.default.join(__dirname, 'hrse.png'));
        const jpeg = fs_1.default.readFileSync(path_1.default.join(__dirname, 'test-image.jpeg'));
        const res = await wasmImageHash(jpeg, 8, true);
        console.log('Hash is:', res);
    }
    catch (error) {
        console.error(error);
    }
})();
exports.default = {
    wasmImageHash,
};
