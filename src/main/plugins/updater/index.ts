import {
  ProgressInfo,
  PublishConfiguration,
  AllPublishOptions,
  GenericServerOptions,
} from 'builder-util-runtime';
import {
  autoUpdater,
  UpdateInfo,
  UpdaterEvents,
  AppUpdater,
  UpdateDownloadedEvent,
  UpdateCheckResult,
} from 'electron-updater';

import { logger } from '../logger';

// enum UpdaterStatus {
//   CheckingForUpdate = 'CheckingForUpdate',
//   UpdateAvailable = 'UpdateAvailable',
//   UpdateNotAvailable = 'UpdateNotAvailable',
//   Error = 'Error',
//   UpdateDownloaded = 'UpdateDownloaded',
//   Downloading = 'Downloading',
//   DownloadStarted = 'DownloadStarted',
// }

// export enum UpdaterActionTypeEnum {
//   CheckForUpdate = 'CheckForUpdate',
//   DownloadApp = 'DownloadApp',
//   RestartAppToInstall = 'RestartToInstall',
// }

// https://www.electron.build/auto-update#electron-updaterautoupdater-appupdater
// https://www.electron.build/configuration/publish#publishers

class Updater {
  private autoUpdater: AppUpdater;
  private defaultProviderCfg: PublishConfiguration | AllPublishOptions;
  private providerCfg: PublishConfiguration | AllPublishOptions;

  constructor() {
    this.autoUpdater = autoUpdater;
    this.initConfig();
    this.registerListeners();
  }

  /**
   * 初始化配置
   */
  private initConfig = () => {
    // 默认关闭自动下载功能，通过手动更新的方式下载软件包
    this.autoUpdater.autoDownload = false;
    // 允许降级
    // 一般都是向上升级（v1.0.0 => v1.1.0），如果出现紧急线上问题，可以选择向下降级(v1.1.0 => v1.0.0)
    this.autoUpdater.allowDowngrade = true;
    // 默认关闭应用退出时自动安装已经下载好的软件包
    this.autoUpdater.autoInstallOnAppQuit = false;
    this.autoUpdater.requestHeaders = {};
    // 如果使用 electron-log 作为 autoUpdater 内部的日志打印工具
    // 则下面注册的事件监听函数中的日志打印逻辑就变成【可选】的
    this.autoUpdater.logger = logger;

    this.providerCfg = this.defaultProviderCfg = this.generateDefaultProviderConfig();
  };

  /**
   * 生成默认的 Provider 配置
   */
  private generateDefaultProviderConfig = () => {
    // The base url. e.g. `https://bucket_name.s3.amazonaws.com`.
    const url = '';

    // 默认使用 generic
    const defaultProviderCfg: GenericServerOptions = {
      provider: 'generic',
      url,
      // 这里设置的 channel 值，在 electron-updater 内部会拼接对应的后缀名（.yml、-mac.yml、-linux.yml）
      channel: 'latest',
      useMultipleRangeRequest: false,
    };

    logger.info(
      '[updater] ------ [generateDefaultProviderConfig] ------ [defaultProviderCfg] ------ ',
      defaultProviderCfg,
    );

    return defaultProviderCfg;
  };

  /*
   * 设置更新检测 url
   */
  private setUpdateDetectionURL = (options?: PublishConfiguration | AllPublishOptions | string) => {
    if (options) {
      this.providerCfg = options;
      logger.info(
        '[updater] ------ [setUpdateDetectionURL] ------ [customProviderCfg] ------ ',
        options,
      );

      return;
    }
  };

  /**
   * Asks the server whether there is an update.
   */
  triggerCheckForUpdate = async () => {
    // 本地开发环境使用 dev-app-update.yml 文件测试【更新检测&下载】功能
    // 注意：一旦执行了 autoUpdater.setFeedURL 方法，下面开发环境的配置就不会起作用了
    // if (process.env.NODE_ENV === 'development') {
    //   autoUpdater.updateConfigPath = path.join(__dirname, './dev-app-update.yml');
    // }else {
    //   autoUpdater.setFeedURL(this.providerCfg);
    // }

    autoUpdater.setFeedURL(this.providerCfg);

    const updateCheckResult: UpdateCheckResult = await autoUpdater.checkForUpdates();

    logger.info(
      '[updater] ------ [triggerCheckForUpdates] ------ [updateCheckResult] ------ ',
      updateCheckResult,
    );
  };

  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   */
  triggerDownloadApp = async () => {
    try {
      logger.info('[autoUpdater] ------ [triggerDownloadUpdate] ------ [before]');
      await autoUpdater.downloadUpdate();
      logger.info('[autoUpdater] ------ [triggerDownloadUpdate] ------ [after]');
    } catch (e) {
      logger.error('[autoUpdater] ------ [triggerDownloadUpdate] ------ [error] ------ ', e);
    }
  };

  /**
   * Restarts the app and installs the update after it has been downloaded.
   */
  triggerRestartAppToInstall = async () => {
    logger.info('[autoUpdater] ------ [triggerQuitAndInstall] ------ [before]');
    await autoUpdater.quitAndInstall(true, true);
    logger.info('[autoUpdater] ------ [triggerQuitAndInstall] ------ [after]');
  };

  /**
   * 注册事件
   */
  private registerListeners = () => {
    this.autoUpdater.on('checking-for-update', () => {
      logger.info('[updater] ------ [checking-for-update] ------ [before]');

      logger.info('[updater] ------ [checking-for-update] ------ [after]');
    });

    this.autoUpdater.on('update-available', async (updateInfo: UpdateInfo) => {
      logger.info('[updater] ------ [update-available] ------ [before]');

      logger.info('[updater] ------ [update-available] ------ [updateInfo] ------ ', updateInfo);

      logger.info('[updater] ------ [update-available] ------ [after]');
    });

    this.autoUpdater.on('update-not-available', (updateInfo: UpdateInfo) => {
      logger.info('[updater] ------ [update-not-available] ------ [before]');

      logger.info(
        '[updater] ------ [update-not-available] ------ [updateInfo] ------ ',
        updateInfo,
      );

      logger.info('[updater] ------ [update-not-available] ------ [after]');
    });

    this.autoUpdater.on('download-progress', (progress: ProgressInfo) => {
      logger.info('[updater] ------ [download-progress] ------ ', progress.percent);
    });

    this.autoUpdater.on('error', (err: Error) => {
      logger.info('[updater] ------ [error] ------ [before]');
      logger.error('[updater] ------ [error] ------ ', err);
      logger.info('[updater] ------ [error] ------ [after]');
    });

    this.autoUpdater.on('update-downloaded', (event: UpdateDownloadedEvent) => {
      logger.info('[updater] ------ [update-downloaded] ------ [before]');
      logger.info('[updater] ------ [update-downloaded] ------ [event]', event);
      logger.info('[updater] ------ [update-downloaded] ------ [after]');
    });
  };
}

export const updater = new Updater();
