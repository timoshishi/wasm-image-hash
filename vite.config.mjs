import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import path from 'path'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  build: {
    assetsDir: 'assets',
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      name: 'WasmImgHash',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'cjs' ? 'index_node.cjs.js' : 'index.es.js'),
    },
    rollupOptions: {
      input: {
        // Add a new entry for Node.js
        index_node: path.resolve(__dirname, 'src', 'index.node.ts'),
      },
      external: ['fs', 'path', 'node-fetch'],
      output: {
        exports: 'named',
      },
      plugins: [
        copy({
          targets: [
            {
              src: 'rust/pkg/wasm_img_hash_bg.wasm',
              dest: 'dist',
            },
          ],
          hook: 'writeBundle',
        }),
      ],
    },
  },
  plugins: [wasm(), topLevelAwait()],
  resolve: {
    alias: {
      '@wasm-module': path.resolve(__dirname, 'rust', 'pkg', 'wasm_img_hash.js'),
    },
  },
})