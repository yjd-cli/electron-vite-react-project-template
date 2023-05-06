import { app, BrowserWindow } from 'electron';

import { isProduction } from '@common/utils/env';
import { BrowserWindowController } from '@main/controller/browser-window-controller';
import { registerMainProcessIPCListeners } from '@main/ipc/listeners';
import { installDevToolExtensions } from '@main/lib/devtools-installer';

export class MainProcessController {
  mainWindow: BrowserWindow;
  browserWindowController: BrowserWindowController;

  constructor() {
    this.browserWindowController = new BrowserWindowController();
  }

  init = () => {
    // 注册【主进程】监听事件
    this.registerMainProcessListeners();
    // 注册【主进程】IPC 监听事件
    registerMainProcessIPCListeners();
  };

  /**
   * 检测单应用程序实例锁 => 不允许同时打开多个应用程序
   */
  checkSingleInstanceLock = () => {
    // 单应用程序实例锁：https://www.electronjs.org/zh/docs/latest/api/app#apprequestsingleinstancelockadditionaldata
    const lock = app.requestSingleInstanceLock();
    if (!lock) {
      app.exit();
    }
  };

  registerMainProcessListeners = () => {
    // This method will be called when Electron has finished initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.whenReady().then(async () => {
      if (!isProduction) {
        // 安装 DevTools 需要在创建窗口之前完成
        await installDevToolExtensions();
      }
      this.mainWindow = this.browserWindowController
        .createBrowserWindow()
        .initBrowserWindow().browserWindow;
    });

    // https://www.electronjs.org/zh/docs/latest/api/app#%E4%BA%8B%E4%BB%B6-second-instance
    // 配合单应用程序实例锁使用
    app.on('second-instance', () => {
      if (!this.mainWindow) {
        return;
      }
      // Focus on the main window if the user tried to open another window
      if (this.mainWindow.isMinimized()) {
        this.mainWindow.restore();
      }
      this.mainWindow.focus();
    });

    app.on('window-all-closed', () => {
      // Quit when all windows are closed, except on macOS. There, it's common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
      // if (process.platform !== 'darwin') {
      //   app.quit();
      // }
      app.quit();
    });

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        this.mainWindow = this.browserWindowController
          .createBrowserWindow()
          .initBrowserWindow().browserWindow;
      }
    });
  };
}
