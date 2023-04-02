import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import path from 'path'
import copy from 'rollup-plugin-copy'
import terser from '@rollup/plugin-terser'

export default defineConfig({
  build: {
    assetsDir: 'assets',
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      name: 'wasm-img-hash',
      formats: ['es', 'umd'],
      fileName: (format, entry) =>
        format === 'umd' ? `${entry}.${format}.js` : `${entry}.js`,
    },
    rollupOptions: {
      external: ['fs', 'path', 'node-fetch'],
      output: {
        exports: 'named',
        minifyInternalExports: true,
        esModule: false,
        plugins: [terser()],
      },
      plugins: [
        copy({
          targets: [
            {
              src: 'rust/pkg/wasm_phash_bg.wasm',
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
