// 当前文件存放【渲染进程】IPC 发送事件函数
// 事件函数命名规范：invoke + xxx
import { ipcRenderer } from 'electron-better-ipc';

import { IPCRendererToMainChannel } from './ipc-channels';

export const invokeIPCTestTwo = (data) => {
  return ipcRenderer.callMain(IPCRendererToMainChannel.IPCTestTwo, data);
};

export const invokeCheckForUpdate = () => {
  return ipcRenderer.callMain(IPCRendererToMainChannel.CheckForUpdate);
};

export const invokeDownloadApp = () => {
  return ipcRenderer.callMain(IPCRendererToMainChannel.DownloadApp);
};

export const invokeRestartAppToInstall = () => {
  return ipcRenderer.callMain(IPCRendererToMainChannel.RestartAppToInstall);
};
