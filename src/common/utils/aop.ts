/**
 * AOP 前置通知函数声明
 * 给方法加入前置切片函数，就可以在执行当前方法之前执行一些操作,
 * 前置切片的返回值为 false 时，不影响原方法的执行
 * @param func {Function} 被前置执行的函数
 * @return {Function} 加入前置通知的函数
 */
Function.prototype._before = function (func) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const __self = this;
  return function (...params) {
    func.apply(__self, params);
    return __self.apply(__self, params);
  };
};

/**
 * AOP 后置通知函数声明
 * 给方法加入后置切片函数，就可以在执行当前方法之之后执行一些操作
 * 后置切片的返回值为false时，不影响原方法的执行
 * @param func {Function} 被后置执行的函数
 * @return {Function} 加入后置通知的函数
 * @constructor
 */

Function.prototype._after = function (func) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const __self = this;
  return function (...params) {
    const result = __self.apply(__self, params);
    func.apply(__self, params);
    return result;
  };
};

export {};
