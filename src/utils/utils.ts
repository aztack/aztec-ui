const HTMLInputElementSpecialAttrs = ['value', 'autocomplete', 'autocorrect', 'autocapitalize', 'spellcheck'];

export function copyAttributes(src: HTMLElement, dest: HTMLElement, excludes?: string[], remove?: boolean) {
  const attrs = Array.prototype.slice.call(src.attributes, 0);
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    if (excludes && excludes.includes(attr.name)) continue;
    dest.setAttribute(attr.name, attr.value);
    if (remove) src.removeAttribute(attr.name);
  }
  if (dest instanceof HTMLInputElement) {
    HTMLInputElementSpecialAttrs.forEach((key: string) => {
      if (key in src) dest[key] = src[key];
      if (remove) delete src[key];
    });
  }
}

const IgnoredAttrsWhenMigrateAttributes = ['id', 'class', 'slot'];
exportToGlobal('IgnoredAttrsWhenMigrateAttributes', {
  get() {
    return IgnoredAttrsWhenMigrateAttributes;
  }
});

export function migrateAttributes(host: HTMLElement, remove = false, keepAttrs: string[] = null) {
  if (!keepAttrs) {
    keepAttrs = IgnoredAttrsWhenMigrateAttributes.slice(0);
  } else {
    keepAttrs = keepAttrs.concat(IgnoredAttrsWhenMigrateAttributes);
  }
  // @ts-ignore
  return copyAttributes(host, (host.shadowRoot || host).lastElementChild, keepAttrs, remove);
}

export function moveChildren(host: HTMLElement, filters?: Function[]) {
  const ele = (host.shadowRoot || host).lastElementChild;
  for (let i = host.children.length; i >= 0; i--) {
    const opt = host.children[i];
    if (filters.find(Ctor => opt instanceof Ctor)) {
      ele.appendChild(opt);
    }
  }
}

export function isPlainObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}


function safeEval(json) {
  const f = new Function(`return ${json}`);
  return f();
}

export function decamelize(str){
	const separator = '_';
	return str
        .replace(/([a-z\d])([A-Z])/g, '$1' + ' ' + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();
}

export function parseArrayObjectAttr(ctx: any, host: HTMLElement) {
  const keys = Object.keys(ctx.constructor.prototype);
  keys.forEach(k => {
    const hypenized = decamelize(k);
    if (!host.hasAttribute(hypenized)) return;
    if (Array.isArray(ctx[k]) || isPlainObject(ctx[k])) {
      ctx[k] = safeEval(host.getAttribute(hypenized));
    }
  });
}

export function injectCustomStyleFor(host: HTMLElement) {
  if (!host || !host.shadowRoot) return;
  const tag = host.tagName.toLowerCase();
  const selector = `#${tag}-custom-style`;
  if (host.shadowRoot.querySelector(selector)) return;
  const style = document.querySelector(selector);
  if (!style) return;
  host.shadowRoot.prepend(style.cloneNode(true));
}

export function remount(host: HTMLElement, destSelector: string) {
  const dest = document.querySelector(destSelector);
  if (!dest) throw new Error(`Can not find '${destSelector}'`);
  dest.appendChild(host);
}

interface IInjectOptions {
  style?: boolean, // inject custom style for shaow dowm
  attrs?: boolean, // copy wrapper's attributes to last HTMLElement
  parse?: boolean, // parse array/object string to JS object
  remove?: boolean, // remove attributes after copy
  after?: boolean, // do inject after calling constructor
  keep?: string[], // array of attributes which will not be remove during removing
  sync?: string[], // copy private method to HostElement
  remount?: false | string, // remount component to another
  children?: any[] // move children to last HTMLElement, see az-select
}

const makeInjectOpts = (opts: IInjectOptions = {}) => {
  return Object.assign({
    style: false,
    attrs: false,
    remove: false,
    parse: true,
    after: false,
    keep: null,
    sync: [],
    remount: false,
    children: []
  }, opts);
};

export function Inject (opts: IInjectOptions = makeInjectOpts()) {
  opts = makeInjectOpts(opts);
  return function inject(target: any, key: string, descriptor: any) {
    let fn = descriptor.value;

    if (typeof fn !== 'function') {
      throw new TypeError(`this decorator can only be applied to methods not: ${typeof fn}`);
    }

    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    let definingProperty = false;

    return {
      configurable: true,
      get() {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {
          return fn;
        }
        const boundFn = function (...args) {
          if (opts.after) fn.apply(this, args); // inject after constructor

          // do injection
          if (opts.style) injectCustomStyleFor(this.el);
          if (opts.parse) parseArrayObjectAttr(this, this.el);
          if (opts.attrs) migrateAttributes(this.el, opts.remove, opts.keep);
          if (opts.children && opts.children.length) moveChildren(this.el, opts.children);
          if (opts.remount) remount(this.el, opts.remount);

          // for debugging
          this.el.__$stencil = this;

          if (!opts.after) fn.apply(this, args); // inject before constructor

          //
          if (opts.sync && opts.sync.length > 0) {
            this.el.dispatchEvent(new CustomEvent('beforesync'));
            opts.sync.forEach((name: string) => {
              if (typeof this[name] === 'function') {
                this.el[name] = this[name].bind(this);
              } else {
                this.el[name] = this[name];
              }
            });
            this.el.dispatchEvent(new CustomEvent('synced'));
          }
        };
        definingProperty = true;
        Object.defineProperty(this, key, {
          configurable: true,
          get() {
            return boundFn;
          },
          set(value) {
            fn = value;
            delete this[key];
          }
        });
        definingProperty = false;
        return boundFn;
      },
      set(value: any) {
        fn = value;
      }
    };
  }
}

declare global {
  interface Window {
    aztec: object;
  }
}

export function exportToGlobal(name: string, desc: object | Function) {
  if (typeof window.aztec === 'undefined') window.aztec = {};
  if (typeof desc === 'function') {
    window.aztec[name] = desc;
  } else {
    Object.defineProperty(window.aztec, name, {
      ...desc,
      configurable: false,
      enumerable: false
    });
  }
}

/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
export function isNumber(num) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};

export function capitalize(str) {
  if (!str) return str;
  return str.replace(/^[a-z]|( [a-z])/g, (m: string) => m.toUpperCase());
}

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
function stringToPath(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
};


import version from '../version';
exportToGlobal('version', {
  get() {
    return version;
  }
});
exportToGlobal('HTMLInputElementSpecialAttrs', {
  get() {
    return HTMLInputElementSpecialAttrs;
  }
});
exportToGlobal('utils', {
  get() {
    return {
      get,
      set,
      isNumber,
      stringToPath
    };
  }
});
