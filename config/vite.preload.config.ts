import { externalizeDepsPlugin } from 'electron-vite';
import path from 'path';
import { UserConfig } from 'vite';

export default function getPreloadConfig(): UserConfig {
  return {
    publicDir: 'public',
    resolve: {
      alias: {
        '@common': path.resolve('src/common'),
        '@main': path.resolve('src/main'),
        '@preload': path.resolve('src/preload'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    },
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, '../src/preload/index.ts'),
        },
      },
    },
    plugins: [externalizeDepsPlugin()],
  };
}
