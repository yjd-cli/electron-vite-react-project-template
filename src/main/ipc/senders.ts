import { ipcMain } from 'electron-better-ipc';

import { IPCMainToRendererChannel } from './ipc-channels';

/** 开发注意事项：
 * 1、当前文件存放【主进程】IPC 发送事件函数，事件函数命名规范：xxx + Sender
 * 2、涉及到隐私信息（如：密钥）相关的 IPC 通信：必须验证通过后，主进程才允许发送给渲染进程。https://www.electronjs.org/docs/latest/tutorial/security#17-validate-the-sender-of-all-ipc-messages
 */
export const ipcTestOneSender = () => {
  ipcMain.sendToRenderers(IPCMainToRendererChannel.IPCTestOne, '666');
};
