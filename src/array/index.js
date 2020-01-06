/**
 * @description 数组去重
 * @param {Array} arr
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-01 17:40:08
*/
const unique = arr => [...new Set(arr)];


/**
 * @description 取两个数组的交集
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns
 */
const intersection = (arr1, arr2) => {
    const arr = new Set(arr1);
    return arr2.filter(item => arr.has(item));
};

/**
 * @description 取多个数组的交集
 * @param {Array} arr
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-03 17:19:37
*/
const intersectionAll = (...args) => 
    args.reduce((acc, val) => intersection(val, acc));


/**
 * @description 取多个数组的并集
 * @param {Array} args
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-03 17:34:57
*/
const union = (...args) => unique(flatten(args, 2));


/**
 * 拉平数组
 * @param {Array} arr
 */
const flatten = (arr, depth = 1) =>
  arr.reduce(
    (pre, item) =>
      pre.concat(depth > 1 && Array.isArray(item) ? flatten(item, depth - 1) : item),
    []
  );
/**
 * @description 深度拉平
 * @param {Array} arr
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-03 19:57:14
*/
const deepFlatten = arr =>
  [].concat(...arr.map(item => (Array.isArray(item) ? deepFlatten(item) : item)));


/**
 * @description 对数组重新随机排序
 * @param {Array} arr
 * @returns {Array}
 * @author  MrAlenZhong
 * @date 2020-01-03 19:58:35
 */
const shuffe = arr => {
    const list = [...arr];
    let len = list.length;
    while (len) {
        const i = Math.floor(Math.random() * len--);
        [list[len], list[i]] = [list[i], list[len]];
    }
    return list;
};

/**
 * @description 对数组随机抽取数据
 * @param {Array} arr
 * @returns {Array}
 * @author  MrAlenZhong
 * @date 2020-01-03 20:11:19
*/
const sample = (arr, size = 1) => {
    const list = shuffe(arr);
    return list.slice(0, size);
};


/**
 * @description 获取指定元素的下标值
 * @param {Array} arr
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-03 20:13:02
*/
const indexOfAll = (arr, item) =>
  arr.reduce((acc, item2, index) => (item2 === item ? [...acc, index] : acc), []);

/**
 * @description 获取元素出现次数
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-03 20:15:55
 */
const countByItem = (arr, item) => countSameBy(arr)[item];

export default {
    union,
    unique,
    intersection,
    intersectionAll,
    flatten,
    deepFlatten,
    shuffe,
    sample,
    indexOfAll,
    countByItem
}