// IPC Channel 书写规范
// 1、枚举 Key => 遵循 大驼峰 命名规范；
// 2、枚举值 => 使用命名空间（@CustomChannel）+ 枚举 Key。避免和其他 Electron 插件的 channel 冲突；
// 命名空间 @CustomChannel 可以随意定义

const BaseChannelName = '@RendererToMain';

enum IPCRendererToMainChannelEnum {
  IPCTestTwo = 'IPCTestTwo',
  CheckForUpdate = 'CheckForUpdate',
  DownloadApp = 'DownloadApp',
  RestartAppToInstall = 'RestartToInstall',
}

// 自动拼接命名空间
const enumArr = Object.entries(IPCRendererToMainChannelEnum).map(([key, value]) => [
  key,
  `${BaseChannelName}/${value}`,
]);
export const IPCRendererToMainChannel = Object.fromEntries(enumArr);
// 例子 =>
// export const IPCRendererToMainChannel = {
//   CheckForUpdate: '@RendererToMain/CheckForUpdate',
// };
