declare global {
  interface Function {
    _before(func: (...args: any[]) => void): (...args: any[]) => void;

    _after(func: (...args: any[]) => void): (...args: any[]) => void;
  }
}

export {};
