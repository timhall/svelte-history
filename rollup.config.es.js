import replace from 'rollup-plugin-replace';
import svelte from 'rollup-plugin-svelte';
import filesize from 'rollup-plugin-filesize';
import buble from 'rollup-plugin-buble';

const production = process.env.NODE_ENV
  ? process.env.NODE_ENV === 'production'
  : !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'es',
    file: 'es/svelte-history.js'
  },
  name: 'SvelteHistory',
  external: ['history', 'path-to-regexp'],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        production ? 'production' : 'development'
      )
    }),

    svelte({
      // enable run-time checks when not in production
      dev: !production,
      store: true
    }),

    filesize(),

    production && buble({ exclude: 'node_modules/**' })
  ],

  watch: {
    chokidar: true
  }
};
