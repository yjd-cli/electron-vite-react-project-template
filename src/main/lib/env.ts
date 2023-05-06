import os from 'os';

enum PlatformEnum {
  aix = 'aix',
  darwin = 'darwin',
  freebsd = 'freebsd',
  linux = 'linux',
  openbsd = 'openbsd',
  sunos = 'sunos',
  win32 = 'win32',
}

enum ArchEnum {
  arm = 'arm',
  arm64 = 'arm64',
  ia32 = 'ia32',
  x64 = 'x64',
  mips = 'mips',
  mipsel = 'mipsel',
  ppc = 'ppc',
  ppc64 = 'ppc64',
  s390 = 's390',
  s390x = 's390x',
}

export enum SystemEnum {
  win = 'win',
  win32 = 'win32',
  mac = 'mac',
  linux = 'linux',
}

export const getSystem = (): string => {
  // Returns a string identifying the operating system platform for which the Node.js binary was compiled. The value is set at compile time.
  // Possible values are 'aix', 'darwin', 'freebsd','linux','openbsd', 'sunos', and 'win32'.
  const platform = os.platform();

  // Returns the operating system CPU architecture for which the Node.js binary was compiled.
  // Possible values are 'arm', 'arm64', 'ia32', 'mips','mipsel', 'ppc', 'ppc64', 's390', 's390x', and 'x64'.
  const arch = os.arch();

  if (platform === PlatformEnum.darwin) {
    return SystemEnum.mac;
  }

  if (platform === PlatformEnum.linux) {
    return SystemEnum.linux;
  }

  // 在 Windows 操作系统中，无论是 32 位还是 64 位版本，其平台标识符都是 'win32'
  if (platform === PlatformEnum.win32) {
    // 可以通过 arch 来判断当前 Windows 操作系统是 32 位还是 64 位版本
    if (arch === ArchEnum.ia32) {
      return SystemEnum.win32;
    } else if (arch === ArchEnum.x64) {
      return SystemEnum.win;
    }
  }
};

export const system = getSystem();
