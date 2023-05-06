declare global {
  interface Function {
    _before(func: (...args: any[]) => void | boolean | Promise<boolean>): (...args: any[]) => any;

    _after(func: (...args: any[]) => void): (...args: any[]) => any;
  }
}

export {};
