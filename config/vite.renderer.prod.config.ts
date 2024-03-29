// import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, ConfigEnv, splitVendorChunkPlugin, UserConfig, mergeConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

// import legacy from "@vitejs/plugin-legacy";
import viteBaseConfig from './vite.renderer.base.config';
import rollupBuildConfig from './vite.renderer.prod.build.rollup.config';

// 【vite官方配置】https://vitejs.dev/config/
// 【electron-vite配置】https://cn-evite.netlify.app/config/#%E5%86%85%E7%BD%AE%E9%85%8D%E7%BD%AE
export default function getRendererConfig(configEnv: ConfigEnv): UserConfig {
  const baseConfig = viteBaseConfig(configEnv);

  return mergeConfig(baseConfig, {
    build: {
      // https://cn.vitejs.dev/config/build-options.html#build-target
      // 设置最终构建的浏览器兼容目标
      // 默认值 => 'modules'
      // target:'modules'

      // 指定输出路径（相对于 项目根目录)
      // 【在 vite 中】：默认值 => dist
      // 此配置与 rollupOptions.output.dir 配置重复，两者选其一即可
      // outDir: 'dist',
      // 【在 electron-vite 中】：默认值 => out/renderer
      // outDir: 'out/renderer',

      // 指定生成静态资源的存放路径（相对于 build.outDir，即 dist/assets）
      // 此配置与 rollupOptions.output.assetFileNames 配置重复，两者选其一即可
      // 如果需要自定义更复杂的场景，选择用 rollupOptions.output.assetFileNames
      // 默认值 => 'assets'
      // assetsDir: 'assets',

      // 图片转 base64 编码的阈值
      // 默认值 => 4096
      assetsInlineLimit: 4096,

      // https://cn.vitejs.dev/config/build-options.html#build-assetsinlinelimit
      // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
      // 默认值 => 4096
      // assetsInlineLimit: 4096,

      // https://cn.vitejs.dev/config/build-options.html#build-csscodesplit
      // 启用/禁用 CSS 代码拆分
      // 默认值 => true
      // 注意：如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      // cssCodeSplit:true,

      // https://cn.vitejs.dev/config/build-options.html#build-cssminify
      // 此选项允许用户覆盖 CSS 最小化压缩的配置，而不是使用默认的 build.minify，这样你就可以单独配置 JS 和 CSS 的最小化压缩方式。Vite 使用 esbuild 来最小化 CSS。
      // 默认值 => true
      // cssMinify:true

      // https://cn.vitejs.dev/config/build-options.html#build-sourcemap
      // 默认值 => false
      sourcemap: 'hidden',

      // https://cn.vitejs.dev/config/build-options.html#build-minify
      //  默认值 => esbuild，因为 esbuild 比 terser 快 20-40 倍，压缩率只差 1%-2%
      // minify: 'esbuild', //【boolean | 'terser' | 'esbuild'】
      minify: 'esbuild', //【boolean | 'terser' | 'esbuild'】

      // https://cn.vitejs.dev/config/build-options.html#build-reportcompressedsize
      // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      // 默认值 => true
      reportCompressedSize: false,

      // https://cn.vitejs.dev/config/build-options.html#build-rollupoptions
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        ...rollupBuildConfig,
      },
    },

    // https://cn.vitejs.dev/guide/api-plugin.html
    plugins: [
      // https://cn.vitejs.dev/guide/build.html#chunking-strategy
      // splitVendorChunkPlugin(),

      // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
      // Vite 默认支持的浏览器版本列表：https://cn.vitejs.dev/guide/build.html#browser-compatibility
      // Electron 发版历史：https://www.electronjs.org/zh/docs/latest/tutorial/electron-timelines
      // 如果是高版本的 electron 项目，就不需要考虑兼容的问题，因为内嵌的谷歌浏览器内核版本很高
      // 如果是 web 端项目，可以视情况决定要不要启用这个插件
      // legacy({
      //   targets: ["defaults", "not IE 11"],
      // }),

      // https://cn.vitejs.dev/guide/api-plugin.html#authoring-a-plugin
      // https://github.com/antfu/vite-plugin-inspect
      // 计算每个 plugin hooks 解析和转换 url 的时间消耗，可以帮助开发定位解析较慢的 url
      // Inspect({
      //   build: true,
      //   outputDir: '.vite-inspect'
      // })
    ],
  });
}
