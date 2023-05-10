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
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, '../src/main/index.ts'),
          // index:  path.resolve('src/main/index.ts'),
          // index: path.resolve(__dirname, './src/main/index.ts'),
        },
        watch:{
          // include: [path.resolve(__dirname, '../src/main')]
          // include: ['src/main/**/*']
          include: [`${path.resolve(__dirname, '../src/main')}/**/*`]
        }
      },
      watch:{
        // include: [path.resolve(__dirname, '../src/main')]
        // include: ['src/main/**/*']
        include: [`${path.resolve(__dirname, '../src/main')}/**/*`]
      }
    },
    plugins: [
      externalizeDepsPlugin({
        // include: ['electron-devtools-assembler'],
      }),
    ],
  };
}
