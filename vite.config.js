import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  root: 'src',
  build: {
    rollupOptions: {
      input: glob.sync('./src/*.html'),
    },
    outDir: '../dist',
  },
  optimizeDeps: {
    include: ['axios', 'notiflix', 'swiper', 'tui-pagination'],
  },
  plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
});
