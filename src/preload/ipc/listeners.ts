// 当前文件存放【渲染进程】IPC 监听事件函数
// 事件函数命名规范：on + xxx
import { ipcRenderer } from 'electron-better-ipc';

import { IPCChannel } from '../../common/ipc/ipc-channels';

export const onIPCTestOne = (callback) => {
  ipcRenderer.answerMain(IPCChannel.IPCTestOne, callback);
};
