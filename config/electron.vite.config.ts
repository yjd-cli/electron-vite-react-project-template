import { ConfigEnv, UserConfig } from 'vite';
import { defineConfig, UserConfigSchema } from 'electron-vite';

import getMainConfig from './vite.main.config';
import getPreloadConfig from './vite.preload.config';
import getDevRendererConfig from './vite.renderer.dev.config';
import getProdRendererConfig from './vite.renderer.prod.config';

// 【electron-vite配置】https://cn-evite.netlify.app/config/#%E5%86%85%E7%BD%AE%E9%85%8D%E7%BD%AE
// 【electron-vite项目目录结构】https://cn-evite.netlify.app/guide/dev.html#%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84
// 
export default defineConfig((configEnv: ConfigEnv): UserConfigSchema => {
  const isDevelopment = configEnv.mode === "development";
  const mainConfig: UserConfig = getMainConfig();
  const preloadConfig: UserConfig = getPreloadConfig();
  const rendererConfig: UserConfig = isDevelopment ? getDevRendererConfig(configEnv) : getProdRendererConfig(configEnv);

  return {
    main: {
      ...mainConfig
    },
    preload: {
      ...preloadConfig
    },
    renderer: {
      ...rendererConfig
    }
  };
});
