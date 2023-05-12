import { BrowserWindow, BrowserWindowConstructorOptions, HandlerDetails } from 'electron';
import { join } from 'path';

import { isDevelopment } from '@common/utils/env';
import { system, SystemEnum } from '@main/lib/env';

import icon from '../../../public/icon.png?asset';

// import icon from '../icon.png?asset';

export class BrowserWindowController {
  browserWindow: BrowserWindow;
  winWidth: number;
  winHeight: number;
  // 禁止修改的 webPreferences 配置
  immutableWebPreferencesCfg;

  constructor() {
    this.winWidth = 1320;
    this.winHeight = 768;
    // 禁止修改的 webPreferences 配置
    this.immutableWebPreferencesCfg = {
      // https://www.electronjs.org/blog/electron-20-0#default-changed-renderers-without-nodeintegration-true-are-sandboxed-by-default
      // true => 支持渲染进程【直接】调用 Node 模块
      nodeIntegration: false,
      // https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation
      // true => 启用上下文隔离
      contextIsolation: true,
      // https://www.electronjs.org/docs/latest/tutorial/security
      // false => 禁用同源策略
      webSecurity: true,
      // https://www.electronjs.org/zh/docs/latest/tutorial/sandbox
      // false => 当前渲染进程禁用沙盒
      // 这里设置为 false，主要是为了 preload 预加载脚本能正常调用 Node 模块
      sandbox: false,
    };
  }

  createBrowserWindow = (options: BrowserWindowConstructorOptions = {}) => {
    const defaultOptions: BrowserWindowConstructorOptions = {
      width: this.winWidth,
      height: this.winHeight,
      // 先隐藏
      show: false,
      ...(system === SystemEnum.linux ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
      },
    };

    const handledOptions = Object.assign({}, defaultOptions, options);
    handledOptions.webPreferences = Object.assign(
      {},
      handledOptions.webPreferences,
      // 禁止修改的 webPreferences 配置
      this.immutableWebPreferencesCfg,
    );

    // Create the browser window.
    const browserWindow = new BrowserWindow(handledOptions);
    this.browserWindow = browserWindow;

    return this;
  };

  /**
   * 初始化新创建窗口相关逻辑
   */
  initBrowserWindow = () => {
    if (!this.browserWindow) {
      return this;
    }

    // 加载页面
    this.loadPage();

    // 自定义主窗口中通过 window.open 打开的子窗口行为
    this.setBrowserWindowOpenHandler();

    // 如果需要监听窗口生命周期和外观相关的事件，请监听 BrowserWindow 对象上的事件
    this.registerBrowserWindowListeners();

    // 如果需要监听 Web 内容相关（如：页面加载生命周期）的事件，请监听 BrowserWindow.WebContents 对象上的事件
    this.registerBrowserWindowWebContentsListeners();

    return this;
  };

  shouldShowDevtools = () => {
    return isDevelopment;
  };

  /**
   * https://www.electronjs.org/zh/docs/latest/api/browser-window
   * 监听 BrowserWindow 对象上的事件
   */
  registerBrowserWindowListeners = () => {
    this.browserWindow.on('ready-to-show', () => {
      // https://www.electronjs.org/zh/docs/latest/api/browser-window#%E4%BC%98%E9%9B%85%E5%9C%B0%E6%98%BE%E7%A4%BA%E7%AA%97%E5%8F%A3
      // 等渲染进程完成绘制后，再展示窗口，从而减少白屏时间
      // 注意：打开客户端 => 渲染进程完成绘制 => 展示页面 的总时长不会改变。因为缩短窗口白屏时间的同时，也会增加打开客户端的响应时间（在展示窗口前，客户端软件会一直处于 pending 状态）
      this.browserWindow.show();
    });

    this.browserWindow.on('closed', () => {
      this.browserWindow = null;
    });
  };

  /**
   * https://www.electronjs.org/zh/docs/latest/api/web-contents
   * 监听 BrowserWindow.WebContents 对象上的事件
   */
  registerBrowserWindowWebContentsListeners = () => {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    this.browserWindow.webContents.once('dom-ready', () => {
      if (this.shouldShowDevtools()) {
        this.browserWindow.webContents.openDevTools();
      }
    });
  };

  /**
   * https://www.electronjs.org/zh/docs/latest/api/web-contents#contentssetwindowopenhandlerhandler
   * https://www.electronjs.org/zh/docs/latest/api/window-open
   * 自定义主窗口中通过 window.open 打开的子窗口行为
   * 注意：只针对在 主窗口A 里打开的 子窗口B 有效，如果是在 子窗口B 中再打开的 子窗口C，则设置无效
   */
  setBrowserWindowOpenHandler = () => {
    this.browserWindow.webContents.setWindowOpenHandler((details: HandlerDetails) => {
      const { url: pageUrl } = details;

      // 两种场景：
      // 场景一：如果 pageUrl 为外部链接，则通过默认浏览器打开访问，而不是直接在当前应用程序中新开一个窗口访问
      // https://www.electronjs.org/docs/latest/tutorial/security#15-do-not-use-shellopenexternal-with-untrusted-content
      // if(xxx){
      //   shell.openExternal(pageUrl);
      //   return { action: 'deny' };
      // }

      // 场景二：如果 pageUrl 为内部链接，则直接在当前应用程序中新开一个窗口访问
      // 设置白名单：仅支持部分内部链接 or 路由跳转
      const windowOpenerWhiteList = ['/xxxTest'];
      let isExist = false;

      windowOpenerWhiteList.forEach((it) => {
        if (pageUrl.indexOf(it) > -1) {
          isExist = true;
        }
      });

      if (!isExist) {
        return { action: 'deny' };
      }

      return {
        action: 'allow',
        // true => 当打开 此子窗口 的 父窗口 关闭时，新创建的子窗口不会被关闭
        // outlivesOpener: true,
        overrideBrowserWindowOptions: {
          width: this.winWidth,
          height: this.winHeight,
          webPreferences: {
            ...this.immutableWebPreferencesCfg,
          },
        },
      };
    });
  };

  loadPage = () => {
    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (isDevelopment && process.env['ELECTRON_RENDERER_URL']) {
      this.browserWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
      this.browserWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }
  };
}
