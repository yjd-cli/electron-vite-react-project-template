import react from '@vitejs/plugin-react';
import path from 'path';
import postcssNest from 'postcss-nesting';
import postcssPresetEnv from 'postcss-preset-env';
import { inspectorServer } from 'react-dev-inspector/plugins/vite';
import { ConfigEnv, UserConfig } from 'vite';
import { defineConfig, externalizeDepsPlugin, UserConfigSchema } from 'electron-vite';
import usePluginImport from 'vite-plugin-importer';
export default defineConfig((configEnv: ConfigEnv): UserConfigSchema => {

  return {
    main: {
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
            index: path.resolve(__dirname, './src/main/index.ts'),
          },
          // watch:{
          //   // include: [`${path.resolve(__dirname, './src/main')}/**/*`]
          //   include: ['src/main/**/*']
          // }
        },
        // watch:{
        //   include: ['src/main/**/*']
        // }
      },
      plugins: [externalizeDepsPlugin()],
    },
    preload: {
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
            index: path.resolve(__dirname, './src/preload/index.ts'),
          },
        },
      },
      plugins: [externalizeDepsPlugin()],
    },
    renderer: {
      resolve: {
        alias: {
          '@common': path.resolve('src/common'),
          '@renderer': path.resolve('src/renderer'),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      },

      css: {
        modules: {
          localsConvention: 'camelCase',

          generateScopedName: '[name]__[local]--[hash:base64:5]',
        },

        postcss: {
          plugins: [
            postcssNest(),
            postcssPresetEnv()
          ],
        },

        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
          },
        },
        devSourcemap: true,
      },
      envDir: path.resolve('env'),
      envPrefix: 'PUBLIC_',
      logLevel: 'info',
      clearScreen: false,
      server: {
        host: 'localhost',
        port: 3000,
        strictPort: true,
      },
      plugins: [
        react(),
        usePluginImport({
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
        }),
        // inspectorServer(),
      ],
    }
  };
});
