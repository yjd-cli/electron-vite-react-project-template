// 当前文件存放【渲染进程】IPC 发送事件函数
// 事件函数命名规范：invoke + xxx
import { ipcRenderer } from 'electron-better-ipc';

import { IPCChannel } from '@common/ipc/ipc-channels';

export const invokeIPCTestTwo = (data) => {
  return ipcRenderer.callMain(IPCChannel.IPCTestTwo, data);
};
