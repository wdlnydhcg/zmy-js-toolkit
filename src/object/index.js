import { isArray , type , isObject ,isUndefined} from "../test"
import { safeGet } from "../function"

/**
 * @description 深拷贝
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-07 12:48:02
*/

export const deepClone = val => {
    const map = new WeakMap();
    const clone = target => {
      let result = {};
      if (type(target) !== 'Object') {
        result = target;
      }
      if (isArray(target)) {
        result = [];
      }
      const keys = Object.keys(target);
      let temp = null;
      const existTarget = map.has(target);
      map.set(target, result);
      if (existTarget) {
        return map.get(target);
      }
      for (const key of keys) {
        temp = target[key];
        if (isObject(temp)) {
          result[key] = clone(temp);
        } else {
          result[key] = temp;
        }
      }
      return result;
    };
    return clone(val);
};

/**
 * @description 浅拷贝
* @param {*} obj
 * @param {*} args
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-11 18:55:50
*/
export const extend = (target, ...args) => Object.assign(target, ...args);


/**
 * @description 对象深合并
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-07 16:28:26
*/
export const merge = function(target) {
    const propIsEnumerable = Object.prototype.propertyIsEnumerable;
    const mergeObject = (to, from) => {
      const symbols = Object.getOwnPropertySymbols(from);
      for (const key of Object.keys(from)) {
        const toItem = safeGet(to, key);
        const fromItem = safeGet(from, key);
        if (isObject(fromItem) && !isUndefined(toItem)) {
          mergeObject(toItem, fromItem);
        } else {
          to[key] = fromItem;
        }
      }
      for (const key of symbols) {
        if (propIsEnumerable.call(from, key)) {
          to[key] = safeGet(from, key);
        }
      }
    };
    const mergeArray = (to, from) => {
      from.forEach(item => to.push(item));
    };
    const mergeOne = (to, from) => {
      if (to === from) {
        return to;
      }
      if (type(to) === type(from)) {
        if (isArray(to)) {
          return mergeArray(to, from);
        }
        if (type(to) === 'Object') {
          return mergeObject(to, from);
        }
      } else {
        return to;
      }
    };
    for (let i = 1; i < arguments.length; i++) {
      mergeOne(target, arguments[i]);
    }
    return target;
};

/**
 * @description 替换对象字段名称
 * @param {*} obj
 * @param {*} [rule={}] 键值对，key 为 原字段，value为替换字段
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-07 17:02:33
*/
export const replaceKeys = (obj, rules = {}) => {
 const keys = Object.keys(rules);
 return Object.keys(obj).reduce((acc, key) => {
   acc[keys.includes(key) ? rules[key] : key] = obj[key];
   return acc;
 }, {});
};


/**
 * 根据保留/删除类型过滤字段
 *
 * @param {*} type
 * @returns
 */
const filterKeys = type => (obj, keys = []) =>
  Object.keys(obj).reduce((acc, key) => {
    if (type === "keep" ? keys.includes(key) : !keys.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
}, {});


/**
 * 保留给定字段
 *
 * @export
 * @param {*} obj
 * @param {*} [keys=[]]
 * @returns
 */
export const keepKeys = filterKeys("keep");

/**
 * 删除给定字段
 *
 * @export
 * @param {*} obj
 * @param {*} [keys=[]]
 * @returns
 */
export const removeKeys = filterKeys("remove");

export default {
    deepClone,
    extend,
    merge,
    replaceKeys,
    keepKeys,
    removeKeys
}


