// 当前文件存放【主进程】IPC 监听事件函数
// 事件函数命名规范：xxx + Listener
import { ipcMain } from 'electron-better-ipc';

import { IPCChannel } from '@common/ipc/ipc-channels';

export const ipcTestTwoListener = (data) => {
  console.log(data);
  return 999;
};

export const registerMainProcessIPCListeners = () => {
  ipcMain.answerRenderer(IPCChannel.IPCTestTwo, ipcTestTwoListener);
};
