import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-assembler';

import { logger } from '../plugins/logger';

// 使用 electron-devtools-assembler 代替 electron-devtools-installer
// https://github.com/facebook/react/issues/25843
// https://github.com/xupea/electron-devtools-installer

export const installDevToolExtensions = async () => {
  const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
  try {
    const promiseArr = extensions.map((name) => installExtension(name));
    const resArr = await Promise.all(promiseArr);
    logger.info('Install DevTool Extensions Succeeded => ', resArr);
  } catch (e) {
    logger.error('Install DevTool Extensions Failed => ', e);
  }
};
