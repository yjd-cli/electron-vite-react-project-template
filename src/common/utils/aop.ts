/**
 * AOP 前置通知函数声明
 * 给方法加入前置切片函数，就可以在执行当前方法之前执行一些操作
 * 前置切片函数的返回值为 false 时，阻断当前方法的执行
 * @param func {Function} 被前置执行的函数
 * @return {Function} 加入前置通知的函数
 */
Function.prototype._before = function (func) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const __self = this;
  return async function (...params) {
    const isBlock = await func.apply(__self, params);

    if (isBlock !== false) {
      return __self.apply(__self, params);
    }
  };
};

/**
 * AOP 后置通知函数声明
 * 给方法加入后置切片函数，就可以在执行当前方法之后执行一些操作
 * @param func {Function} 被后置执行的函数
 * @return {Function} 加入后置通知的函数
 */
Function.prototype._after = function (func) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const __self = this;
  return async function (...params) {
    const result = await __self.apply(__self, params);

    // 使用 setTimeout 执行后置切片函数，避免后置切片函数执行时间太长阻塞当前方法返回结果
    setTimeout(() => {
      // eslint-disable-next-line no-useless-catch
      try {
        func.apply(__self, params);
      } catch (e) {
        throw e;
      }
    }, 0);

    return result;
  };
};

export {};
