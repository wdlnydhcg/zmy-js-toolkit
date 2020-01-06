
/**
 * @description 转化为驼峰值
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-04 20:19:57
*/
const camelize = val =>
  val.replace(/[-_]+(.)?/g, (match, item) => (item ? item.toUpperCase() : ""));
/**
 * @description 转化为中划线值
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-04 20:22:25
*/
const dasherize = val =>
  val
    .replace(/([A-Z])/g, "-$1")
    .replace(/_+/g, "-")
    .toLowerCase();

  export default {
    camelize,
    dasherize,
  
}


