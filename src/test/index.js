
export const type = val => {
    if (val === void 0) {
      return 'Undefined';
    }
    if (val === null) {
      return 'Null';
    }
    const ctorName = val => {
      return val.constructor ? val.constructor.name : null;
    };
    switch (ctorName(val)) {
      case 'Symbol':
        return 'Symbol';
      case 'Promise':
        return 'Promise';
      case 'Map':
        return 'Map';
      case 'Set':
        return 'Set';
      case 'WeakMap':
        return 'WeakMap';
      case 'WeakSet':
        return 'WeakSet';
    }
    if (isBuffer(val)) {
      return 'Buffer';
    }
    if (isError(val)) {
      return 'Error';
    }
    if (isArguments(val)) {
      return 'Arguments';
    }
    const type = Object.prototype.toString
      .call(val)
      .slice(8, -1)
      .replace(/\s/g, '');
    if (type === 'Number' && val % 1 === 0) {
      return 'Integer';
    }
    if (type === 'Number' && /.*\..*/.test(val)) {
      return 'Float';
    }
    return type;
};
/**
 * @description 
 * @param {String} str
 * @returns
 * @author  MrAlenZhong
 * @date 2020-01-07 12:56:38
*/
export const isObject = val => {
    if (isNil(val)) {
      return false;
    }
    const ctor = val.constructor;
    if (!isFunction(ctor)) {
      return false;
    }
    const prot = ctor.prototype;
    if (type(prot) !== 'Object') {
      return false;
    }
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
      return false;
    }
    return type(val) === 'Object';
};
export const isArray = val => type(val) === 'Array';

export const isNil = val => isUndefined(val) || isNull(val);

export const isUndefined = val => typeof val === 'undefined';

export const isNull = val => val === null;

export const isFunction = val => type(val) === 'Function';

export const isBuffer = val => {
    if (val.constructor && typeof val.constructor.isBuffer === 'function') {
      return val.constructor.isBuffer(val);
    }
    return false;
};

export const isError = val => {
    return (
      val instanceof Error ||
      (typeof val.message === 'string' &&
        val.constructor &&
        typeof val.constructor.stackTraceLimit === 'number')
    );
};

export const isArguments = val => {
    try {
      if (typeof val.length === 'number' && typeof val.callee === 'function') {
        return true;
      }
    } catch (err) {
      if (err.message.indexOf('callee') !== -1) {
        return true;
      }
    }
    return false;
};



export default {
    type,
    isObject,
    isBuffer,
    isError,
    isArguments,
    isArray,
    isUndefined,
    isNull,
    isNil,
    isFunction,
}