import { IPCRendererToMainChannel } from '@preload/ipc/ipc-channels';
import { ipcMain } from 'electron-better-ipc';

import { updater } from '../plugins/updater';

export const ipcTestTwoListener = (data) => {
  console.log(data);
  return 999;
};

export const checkForUpdateListener = () => {
  updater.triggerCheckForUpdate();
};

export const downloadAppListener = () => {
  updater.triggerDownloadApp();
};

export const restartAppToInstallListener = () => {
  updater.triggerRestartAppToInstall();
};

/** 开发注意事项：
 * 1、当前文件存放【主进程】IPC 监听事件函数，事件函数命名规范：xxx + Listener
 * 2、涉及到隐私信息（如：密钥）相关的 IPC 通信：必须验证通过后，主进程才允许发送给渲染进程。https://www.electronjs.org/docs/latest/tutorial/security#17-validate-the-sender-of-all-ipc-messages
 */
export const registerMainProcessIPCListeners = () => {
  ipcMain.answerRenderer(IPCRendererToMainChannel.IPCTestTwo, ipcTestTwoListener);

  // 更新检测/下载相关事件
  ipcMain.answerRenderer(IPCRendererToMainChannel.CheckForUpdate, checkForUpdateListener);
  ipcMain.answerRenderer(IPCRendererToMainChannel.DownloadApp, downloadAppListener);
  ipcMain.answerRenderer(IPCRendererToMainChannel.RestartAppToInstall, restartAppToInstallListener);
};
