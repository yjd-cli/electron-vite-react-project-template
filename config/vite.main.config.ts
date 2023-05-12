import { externalizeDepsPlugin } from 'electron-vite';
import path from 'path';
import { UserConfig } from 'vite';

export default function getMainConfig(): UserConfig {
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
      minify: 'esbuild',
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, '../src/main/index.ts'),
        },
        output: {
          // 指定输出路径（相对于 项目根目录)
          dir: 'dist/main',
        }
      },
    },
    plugins: [
      externalizeDepsPlugin({
        // include: ['electron-devtools-assembler'],
      }),
    ],
  };
}
