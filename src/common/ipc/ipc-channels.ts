// IPC Channel 书写规范
// 1、枚举 Key => 遵循 大驼峰 命名规范；
// 2、枚举值 => 使用命名空间（@CustomChannel）+ 枚举 Key。避免和其他 Electron 插件的 channel 冲突；

// Channel Name 可以随意定义，可命名为项目名称
const BaseChannelName = '@CustomChannel';

enum IPCChannelEnum {
  IPCTestOne = 'IPCTestOne',
  IPCTestTwo = 'IPCTestTwo',
}

// 自动拼接命名空间
export const IPCChannel = Object.fromEntries(
  Object.entries(IPCChannelEnum).map(([key, value]) => [key, `${BaseChannelName}/${value}`]),
);

// export const IPCChannel = {
//   IPCTestOne: '@CustomChannel/IPCTestOne',
//   IPCTestTwo: '@CustomChannel/IPCTestTwo',
// };
