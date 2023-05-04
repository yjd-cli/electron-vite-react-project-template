// import { ElectronAPI } from '@electron-toolkit/preload';
import { DesktopAPI } from './index';

declare global {
  interface Window {
    // electron: ElectronAPI;
    desktopAPI: DesktopAPI;
  }
}

export {};
