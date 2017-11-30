import replace from 'rollup-plugin-replace';
import svelte from 'rollup-plugin-svelte';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

const production =
  !process.env.ROLLUP_WATCH || process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'umd',
    file: 'dist/svelte-history.js',
    globals: {
      history: 'history',
      'path-to-regexp': 'pathToRegexp'
    }
  },
  name: 'svelteHistory',
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

    // If we're building for production (npm run build
    // instead of npm run dev), transpile and minify
    production && buble({ exclude: 'node_modules/**' }),
    production && uglify()
  ],

  watch: {
    chokidar: true
  }
};
