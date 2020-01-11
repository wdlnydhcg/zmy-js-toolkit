import zDate from "./date";
import zArray from "./array";
import zRegExp from "./reg-exp";
import zString from "./string";
import zHtml from "./html";
import zNumber from "./number";
import zFunction from "./function"
import zObject from "./object"



export const $Date = zDate;
export const $Array = zArray;
export const $RegExp = zRegExp;
export const $String = zString;
export const $Html = zHtml;
export const $Number = zNumber;
export const $Function = zFunction;
export const $Object = zObject;




export default {
    zDate,
    ...zObject,
    ...zFunction,
    ...zArray,
    ...zRegExp,
    ...zString,
    ...zHtml,
    ...zNumber
}