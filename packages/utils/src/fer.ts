// eval 函数执行 js 代码
export function getScriptFunc(str) {
  let func = null;
  try {
    func = eval(str);
    if (Object.prototype.toString.call(func) !== '[object Function]') return false;
    return func;
  } catch (_) {
    return false;
  }
}
