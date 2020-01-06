/**
 * @description 解决 js 精度误差
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-05 20:57:11
 * @example
 * toFixed(5.5555555,3)
 * => "5.555"
*/
const toFixed = (number, point = 2) => {
    const m = Math.pow(10, point);
    return parseInt(number * m, 10) / m;
};

/**
 * @description byte数字转化为含单位数值
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-05 21:00:17
 * @example
 *  bytes2text(5555,1)
 *  => "5.4 KB"
*/
const bytes2text = (bytes, point = 2) => {
    if (isNaN(bytes)) {
      return '';
    }
    const symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let exp = Math.floor(Math.log(bytes) / Math.log(2));
    if (exp < 1) {
      exp = 0;
    }
    const i = Math.floor(exp / 10);
    bytes = bytes / Math.pow(2, 10 * i);
    if (bytes.toString().length > bytes.toFixed(point).toString().length) {
      bytes = bytes.toFixed(point);
    }
    return bytes + ' ' + symbols[i];
};

const args2Array = args => {
    let params = args;
    if (args.length === 1 && isArray(args[0])) {
      params = args[0];
    }
    return params;
  };
/**
 * @description 汇总
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-05 21:03:55
*/
const sum = (...args) => {
    const params = args2Array(args);
    return [...params].reduce((acc, val) => acc + val, 0);
};
  
/**
 * @description 取平均数
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-05 21:06:15
*/
const average = (...args) => {
    const params = args2Array(args);
    return sum(...params) / (params.length ? params.length : 1);
};


/**
 * @description 取最小数
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-05 21:06:15
*/
const min = (...args) => {
    const params = args2Array(args);
    return Math.min.apply(null, params);
};

/**
 * @description 取最大数
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-05 21:06:15
*/
const max = (...args) => {
    const params = args2Array(args);
    return Math.max.apply(null, params);
};


/**
 * @description 转化为货币
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-05 21:08:47
*/
const toCurrency = num => String(num).replace(/(?!^)(?=(\d{3})+$)/g, ",");


/**
 * @description 升序
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-05 21:12:30
*/
const sortAsc = (...args) => {
    const params = args2Array(args);
    return sort(1, params);
};


/**
 * @description 降序
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-05 21:12:56
*/
const sortDesc = (...args) => {
    const params = args2Array(args);
    return sort(-1, params);
};

export default {
    toFixed,
    bytes2text,
    sum,
    average,
    min,
    max,
    toCurrency,
    sortAsc,
    sortDesc
}