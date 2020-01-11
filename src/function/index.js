import { isFunction } from "../test"
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

/**
 * @description 获取浏览器信息
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-07 12:25:34
*/
const getBrowserInfo = () => {
  let browserInfo = {};
  if ('navigator' in window) {
    const ua = navigator.userAgent;

    const getBrowser = () => {
      switch (true) {
        case /opr|opios|opera/i.test(ua):
          return 'Opera';
        case /chrome|chromium|crios|crmo/i.test(ua):
          return 'Chrome';
        case /firefox|iceweasel|fxios/i.test(ua):
          return 'Firefox';
        case /safari|applewebkit/i.test(ua):
          return 'Safari';
        case /edg([ea]|ios)/i.test(ua):
          return 'Microsoft Edge';
        case /msie|trident/i.test(ua):
          return 'Internet Explorer';
      }
      return 'Unknown';
    };
    const getBrowserVersion = () => {
      const matchVersion = regexp => {
        const match = ua.match(regexp);
        return (match && match.length > 0 && match[1]) || '';
      };
      switch (getBrowser()) {
        case 'Opera':
          return (
            matchVersion(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i) ||
            matchVersion(/(?:opr|opios)[\s/](\S+)/i)
          );
        case 'Chrome':
          return (
            matchVersion(/(?:chrome|crios|crmo)\/([\d\w\\.\\-]+)/i) ||
            matchVersion(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i)
          );
        case 'Firefox':
          return matchVersion(
            /(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i
          );
        case 'Safari':
          return matchVersion(/version\/(\d+(\.?_?\d+)+)/i);
        case 'Microsoft Edge':
          return +matchVersion(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i);
        case 'Internet Explorer':
          return +matchVersion(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i);
      }
    };
    const getEngine = () => {
      switch (true) {
        case /edge/i.test(ua):
          return 'Edge';
        case /msie|trident/i.test(ua):
          return 'Trident';
        case /(presto)\/([\w.]+)/i.test(ua):
          return 'Presto';
        case /webKit|appleWebKit/i.test(ua):
          return 'Webkit';
        case /rv:([\w.]{1,9}).+(gecko)/i.test(ua):
          return 'Gecko';
      }
      return 'Unknown';
    };
    const getOs = () => {
      switch (true) {
        case /iphone/i.test(ua) || /ipad/i.test(ua) || /ipod/i.test(ua):
          return 'ios';
        case /android/i.test(ua):
          return 'android';
        case /win/i.test(ua) && /phone/i.test(ua):
          return 'windowsPhone';
        case /mac/i.test(ua):
          return 'macOSX';
        case /win/i.test(ua):
          return 'windows';
        case /linux/i.test(ua):
          return 'linux';
      }
      return 'Unknown';
    };

    browserInfo = {
      name: getBrowser(),
      version: getBrowserVersion(),
      engine: getEngine(),
      os: getOs()
    };

    return browserInfo;
  }
};

/**
 * @description 设置Cookie
 * @param {string} name       名称
 * @param {any} value         数值
 * @param {any} expiredays    过期时间
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-07 12:30:25
*/
const setCookie = (name, value, expiredays) => {
  const exdate = new Date();
  if (expiredays) {
    exdate.setDate(exdate.getDate() + expiredays);
  }
  document.cookie =
    name +
    '=' +
    escape(value) +
    (expiredays === null ? '' : ';expires=' + exdate.toGMTString()) +
    ';path=/;';
};


/**
 * @description 获取Cookie值
 * @param {String} name
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-07 12:32:26
*/
const getCookie = name => {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=');
    let end = 0;
    if (start !== -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(';', start);
      if (end === -1) end = document.cookie.length;
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
};


/**
 * @description 设置LocalStorage
 * @param {String} name
 * @param {Object} data
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-07 12:32:26
*/
const setLocalStorage = (name, data) => {
  const storageData = getLocalStorage(name) || {};
  localStorage.setItem(
    name,
    JSON.stringify(Object.assign({}, storageData, data))
  );
};

/**
 * @description 获取LocalStorage
 * @param {String} name
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-07 12:36:29
*/
const getLocalStorage = name => {
  return JSON.parse(localStorage.getItem(name)) || {};
};


/**
 * @description 设置SessionStorage
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-07 12:40:08
*/
const setSessionStorage = (name, data) => {
  const storageData = getSessionStorage(name) || {};
  sessionStorage.setItem(
    name,
    JSON.stringify(Object.assign({}, storageData, data))
  );
};


/**
 * @description 获取SessionStorage
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-07 12:40:08
*/
const getSessionStorage = name => {
  return JSON.parse(sessionStorage.getItem(name)) || {};
};

/**
 * @description 将base64 url 转化为 blob url
 * @param {String} url
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-07 12:41:43
*/
const base64Url2blobUrl = url => {
  const arr = url.split(',');
  const type = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return URL.createObjectURL(new Blob([u8arr], { type }));
};

export const safeGet = (object, key) => {
  if (key === 'constructor' && typeof isFunction(object[key])) {
    return;
  }

  if (key === '__proto__') {
    return;
  }

  return object[key];
};

export default {
    throttle,
    debounce,
    getBrowserInfo,
    setCookie,
    getCookie,
    setLocalStorage,
    getLocalStorage,
    setSessionStorage,
    getSessionStorage,
    base64Url2blobUrl,
    safeGet
}
  