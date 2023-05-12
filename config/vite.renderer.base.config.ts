// 注意：此文件应该只存放所有环境（开发环境、生产环境、测试环境等）【通用】的配置项。
import react from '@vitejs/plugin-react';
import * as path from 'path';
import postcssNest from 'postcss-nesting';
import postcssPresetEnv from 'postcss-preset-env';
import { ConfigEnv, UserConfig } from 'vite';
import usePluginImport from 'vite-plugin-importer';

// 【vite官方配置】https://vitejs.dev/config/
// 【electron-vite配置】https://cn-evite.netlify.app/config/#%E5%86%85%E7%BD%AE%E9%85%8D%E7%BD%AE
export default function getRendererBaseConfig(configEnv: ConfigEnv): UserConfig {
  // const isDevelopment = configEnv.mode === "development";

  return {
    // https://cn.vitejs.dev/guide/#index-html-and-project-root
    // 项目根目录（index.html 文件所在的位置）
    // 【在 vite 中】：默认值 => process.cwd() => 当前项目路径，和当前 vite.config.ts 文件所在位置无关
    // root:  path.resolve('public'),
    // 【在 electron-vite 中】：默认值 => src/renderer
    // root:  'src/renderer',

    // 开发或生产环境服务的公共基础路径
    // 默认值 => '/'
    // base: '/',

    // https://cn.vitejs.dev/guide/assets.html#the-public-directory
    // 静态资源服务的文件夹
    // 默认值 => 'public'
    // publicDir: 'public',

    // https://cn.vitejs.dev/config/shared-options.html#mode
    // https://cn.vitejs.dev/guide/env-and-mode.html#modes
    // 指定开发模式：默认情况下，开发服务器 (dev 命令) 运行在 development (开发) 模式，而 build 命令则运行在 production (生产) 模式。
    // mode: 'development',

    resolve: {
      // alias 别名配置不仅在 JavaScript 的 import 语句中生效，在 CSS 代码的 @import 和 url导入语句中也同样生效
      alias: {
        '@common': path.resolve('src/common'),
        '@renderer': path.resolve('src/renderer'),
      },
      // 默认： ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
      // 这里不添加 '.css'、'.less'、'.json'的原因：在一个模块中同时引入了很多模块时，还是需要快速区分下哪些是样式模块
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    },

    css: {
      // https://cn.vitejs.dev/config/shared-options.html#css-modules
      modules: {
        // 参考：https://github.com/madyankin/postcss-modules#localsconvention
        localsConvention: 'camelCase',

        generateScopedName: '[name]__[local]--[hash:base64:5]',
      },

      // https://cn.vitejs.dev/config/shared-options.html#css-postcss
      // https://juejin.cn/post/7178454300572516409
      postcss: {
        plugins: [
          // https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting
          postcssNest(),
          postcssPresetEnv(),
        ],
      },

      // https://cn.vitejs.dev/config/shared-options.html#css-preprocessoroptions
      // 指定传递给 CSS 预处理器的选项
      preprocessorOptions: {
        // https://lesscss.org/usage/#less-options
        // https://juejin.cn/post/7177549666291515447
        less: {
          javascriptEnabled: true,
          // math: "always",
          // additionalData: '',
        },
      },

      // https://cn.vitejs.dev/config/shared-options.html#css-devsourcemap
      // https://juejin.cn/post/7177554425886539833
      //【开发环境】是否启用 sourcemap
      // 默认值 => false
      devSourcemap: true,
    },

    // https://cn.vitejs.dev/config/shared-options.html#esbuild
    // 默认情况下，esbuild 只会处理 .ts、.jsx、.tsx 文件
    // esbuild:{},

    // https://cn.vitejs.dev/guide/env-and-mode.html#env-files
    // https://cn.vitejs.dev/config/#using-environment-variables-in-config
    // 指定 .env 文件目录
    envDir: path.resolve('env'),
    // 注意：以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。所以敏感信息不要以 envPrefix 为前缀。
    //【在 vite 中】：默认值 => VITE_
    //【在 electron-vite 中】：默认值 => RENDERER_VITE_
    envPrefix: 'PUBLIC_',

    plugins: [
      // https://github.com/vitejs/vite-plugin-react-swc
      // reactSWC(),
      // 如果想要在项目中使用 react-dev-inspector 插件的话，就无法使用 vite-plugin-react-swc 编译项目，因为 react-dev-inspector 插件底层依赖 babel 编译 + 修改 AST
      // 所以开发环境下，暂时放弃使用 SWC 编译项目
      react(),

      // 开发环境和生产环境都需要按需加载组件库样式（会自动加载当前组件需要的样式），如果开发环境不设置的话，就不会自动引入组件样式，导致页面样式错乱
      // https://github.com/umijs/babel-plugin-import
      // 按需加载 ES Module
      // 以下有两种支持按需加载的 vite 插件
      // https://github.com/ajuner/vite-plugin-importer
      usePluginImport({
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      }),
      // https://github.com/vbenjs/vite-plugin-style-import/blob/main/README.zh_CN.md
      // 支持自定义
      // createStyleImportPlugin({
      //   resolves: [AntdResolve()],
      // }),
    ],
  };
}
