export function isPlainObject(obj: any) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}

export function safeEval(json: string) {
  const f = new Function(`return ${json}`);
  return f();
}

/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
export function isNumber(num: unknown) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};



// https://stackoverflow.com/questions/54733539/javascript-implementation-of-lodash-set-method
/**
 * set value to path on obj
 * @param {any} obj
 * @param {string} path
 * @param {any} value
 *
 * var obj = { test: true };
 * set(obj, "test.1.it", "hello");
 * => {"test":[null,{"it":"hello"}]}
 */
 export function set(obj: any, path: string, value: any) {
  // When obj is not an object
  if (Object(obj) !== obj) return obj;

  // If not yet an array, get the keys from the string-path
  let pathArr = [];
  if (!Array.isArray(path)) pathArr = stringToPath(path);

  // Iterate all of them except the last one
  const o = pathArr.slice(0, -1).reduce((a, c, i) => {
    // The key does not exist, create the key.
    // If the next key a potential array-index
    // assign a new array object otherwise assign a new object
    if (Object(a[c]) !== a[c]) {
      const isArrayIndex = Math.abs(pathArr[i+1]) >> 0 === +pathArr[i+1];
      a[c] = isArrayIndex ? [] : {};
    }
    return a[c];
  }, obj);

  // Finally assign the value to the last key
  o[pathArr[pathArr.length-1]] = value;

  // Return the top-level object to allow chaining
  return obj;
};

/**
 * get value from object in given path
 * @param {any} o
 * @param {string} path
 * @param {any v
 */
export function get(o: any, path: string, v: any = undefined){
  if (typeof o === 'undefined') return v;
  let props = stringToPath(path);
  if (props.length === 0) return o[path];
  for (var t = o,i = 0;i < props.length; ++i){
    t = t[props[i]]
    if(typeof t ==='undefined') return v;
  }
  return t;
}

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
export function stringToPath(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
};
