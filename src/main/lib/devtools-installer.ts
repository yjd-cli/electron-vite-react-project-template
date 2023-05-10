// import installExtension, {
//   REDUX_DEVTOOLS,
//   REACT_DEVELOPER_TOOLS,
// } from 'electron-devtools-assembler';
import { session } from 'electron';
import path from 'path';

import { logger } from '../plugins/logger';

// 使用 electron-devtools-assembler 代替 electron-devtools-installer
// https://github.com/facebook/react/issues/25843
// https://github.com/xupea/electron-devtools-installer

// 新的问题：不管是 electron-devtools-installer 还是 electron-devtools-assembler，会阻断主进程的热重载，具体原因未知。
// 尝试解决：如果主进程编译配置使用 externalizeDepsPlugin 排除构建 electron-devtools-assembler 为 CommonJS 模块后，主进程的热重载生效。参考：https://cn-evite.netlify.app/guide/troubleshooting.html#%E6%9E%84%E5%BB%BA
// 但是模块引入方式又会出问题：
// 常见的 ESM 模块引入方式：
// import installExtension, {
//   REDUX_DEVTOOLS,
//   REACT_DEVELOPER_TOOLS,
// } from 'electron-devtools-assembler';
// 排除构建前：此时打印 installExtension 是一个函数。
// 排除构建后：此时打印 installExtension 为一个对象，需要通过 installExtension.default 才能调用到函数。

// export const installDevToolExtensions = async () => {
//   const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
//   try {
//     const promiseArr = extensions.map((name) => installExtension(name));
//     const promiseArr = extensions.map((name) => installExtension.default(name));
//     const resArr = await Promise.all(promiseArr);
//     logger.info('Install DevTool Extensions Succeeded => ', resArr);
//   } catch (e) {
//     logger.error('Install DevTool Extensions Failed => ', e);
//   }
// };

// 尝试的解决方法：手动下载相关的扩展并存放到项目公共资源目录下，每次运行时直接加载本地的扩展文件
export const installDevToolExtensions = async () => {
  // console.log('__dirname', __dirname);
  // console.log(path.resolve(__dirname, '/devtools-extensions/Redux DevTools'));
  try {
    // const dir = './src/main/lib/devtools-extensions';
    const dir = './public/devtools-extensions';
    const promiseArr = [
      path.resolve(`${dir}/React Developer Tools`),
      path.resolve(`${dir}/Redux DevTools`),
    ].map((name) => {
      // https://www.electronjs.org/docs/latest/tutorial/devtools-extension
      return session.defaultSession.loadExtension(name);
    });
    const resArr = await Promise.all(promiseArr);

    logger.info('Install DevTool Extensions Succeeded => ', resArr);
  } catch (e) {
    logger.error('Install DevTool Extensions Failed => ', e);
  }
};
