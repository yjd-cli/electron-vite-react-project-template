// import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge } from 'electron';

import { logger } from '../main/plugins/logger';
import * as listeners from './ipc/listeners';
import * as senders from './ipc/senders';

// Custom APIs for renderer
const api = {
  ipc: {
    // 监听事件函数命名规范：on + xxx
    ...listeners,
    // 监听事件函数命名规范：invoke + xxx
    ...senders,
  },
  logger,
};

export type DesktopAPI = typeof api;

const apiKey = 'desktopAPI';

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    // contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld(apiKey, api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  // window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window[apiKey] = api;
}
