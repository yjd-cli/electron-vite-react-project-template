import eLog from 'electron-log';

// more settings: https://github.com/megahertz/electron-log/tree/v4.4.8
// By default, two transports are active: console and file.

const transportLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'info';

// Console transport settings => Just prints a log message to application console (main process) or to DevTools console (renderer process).
eLog.transports.console.level = transportLevel;

// File transport settings => The file transport writes log messages to a file.
// https://github.com/megahertz/electron-log/blob/v4.4.8/docs/file.md#file-transport
eLog.transports.file.level = transportLevel;
eLog.transports.file.maxSize = 1 * 1024 * 1024;

//  By default, it writes logs to the following locations:
//    on Linux: ~/.config/{app name}/logs/{process type}.log
//    on macOS: ~/Library/Logs/{app name}/{process type}.log
//    on Windows: %USERPROFILE%\AppData\Roaming\{app name}\logs\{process type}.log
// eLog.transports.file.resolvePath = (variables) => path.join(variables.libraryDefaultDir, variables.fileName);

// Catch errors：https://github.com/megahertz/electron-log/blob/v4.4.8/docs/catch.md#catch-errors
eLog.catchErrors({
  showDialog: false,
});

// Object.assign(console, eLog.functions);

// electron-log supports the following log levels => error, warn, info, verbose, debug, silly
// log.info('Hello, log');
// log.warn('Some problem appears');
// log.error('Some error appears');
export const logger = eLog;
