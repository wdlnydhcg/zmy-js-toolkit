import regExp from './reg-exp.js';
console.log("regExp  ",regExp);
/**
 * @description 判断是满足正则需求
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-05 21:19:08
*/
const isRegExp = (str,regExpName)=>{
    return regExp[regExpName].test(str);
}

export default {
    isRegExp
};
