import zDate from "./date";
import zArray from "./array";
import zRegExp from "./reg-exp";
import zString from "./string";
import zHtml from "./html";
import zNumber from "./number";



export const $Date = zDate;
export const $Array = zArray;
export const $RegExp = zRegExp;
export const $String = zString;
export const $Html = zHtml;
export const $Number = zNumber;



export default {
    zDate,
    ...zArray,
    ...zRegExp,
    ...zString,
    ...zHtml,
    ...zNumber
}