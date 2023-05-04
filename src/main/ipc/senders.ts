// 当前文件存放【主进程】IPC 发送事件函数
// 事件函数命名规范：xxx + Sender
import { ipcMain } from 'electron-better-ipc';

import { IPCChannel } from '@common/ipc/ipc-channels';

export const ipcTestOneSender = () => {
  ipcMain.sendToRenderers(IPCChannel.IPCTestOne, '666');
};
