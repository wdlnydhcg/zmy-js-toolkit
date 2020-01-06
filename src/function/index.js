
/**
 * 节流：用于有连续事件响应，每间隔一定时间触发一次
 *
 * @param {Function} func
 * @param {number} wait 触发长度间隔时间
 * @param {boolean} opts  leading=false首次不会触发(如果触发了多次)
 * @returns
 */
const throttle = (func, wait = 16, opts = { noStart: false, noEnd: false }) => {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    const later = function() {
      previous = opts.noStart ? 0 : +new Date();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    };
    return function() {
      const now = +new Date();
      if (!previous && opts.noStart) {
        previous = now;
      }
      const remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      } else if (!timeout && !opts.noEnd) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
/**
 * 防抖：用于连续事件触发结束后只触发一次
 *
 * @param {Func} func
 * @param {number} wait
 * @param {boolean} immediate 是否立即执行
 * @returns
 */
const debounce = (func, wait = 16, immediate = false) => {
    let timeout, args, context, timestamp, result;
    const later = function() {
      const last = +new Date() - timestamp;
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };
    return function() {
      context = this;
      args = arguments;
      timestamp = +new Date();
      const callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
      return result;
    };
  };
export default {
    throttle,
    debounce
}
  