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

export function parseArrayObjectAttr(ctx: any, host: HTMLElement) {
  const keys = Object.keys(ctx.constructor.prototype);
  keys.forEach(k => {
    const hypenized = decamelize(k);
    if (!host.hasAttribute(hypenized)) return;
    if (Array.isArray(ctx[k]) || isPlainObject(ctx[k])) {
      const attrVal = host.getAttribute(hypenized);
      try {
        ctx[k] = safeEval(attrVal);
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Fail to saveEval`, attrVal);
        }
        try {
          ctx[k] = JSON.parse(attrVal);
        } catch (e) {
          console.error(`Fail to parse`, attrVal);
        }
      }
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
  /**
   * Inject custom style for shadow dom
   */
  style?: boolean,
  /**
   * Copy wrapper's attributes to last HTMLElement
   */
  attrs?: boolean,
  /**
   * Parse array/object string to JS object
   */
  parse?: boolean,
  /**
   * Remove attributes after copy
   */
  remove?: boolean,
  /**
   * Do inject after calling constructor
   */
  after?: boolean,
  /**
   * Array of attributes which will not be remove during removing
   */
  keep?: string[],
  /**
   * Copy private method to HostElement
   */
  sync?: string[],
  /**
   * Remount component to another
   */
  remount?: false | string,
  /**
   * Move children to last HTMLElement, see az-select
   */
  children?: any[]
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
          if (window.aztec && window.aztec.debug.inject) {
            observerAttributes(this.el, (mutation: MutationRecord) => {
              if (mutation.attributeName === 'class') return;
              const el = mutation.target as HTMLElement;
              console.groupCollapsed(el.tagName, mutation.attributeName, mutation.oldValue, el.getAttribute(mutation.attributeName));
              console.log(el);
              console.groupEnd();
            });
          }
          if (opts.after) fn.apply(this, args); // inject after constructor

          // do injection
          if (opts.style) injectCustomStyleFor(this.el);
          if (opts.parse) parseArrayObjectAttr(this, this.el);
          if (opts.attrs) migrateAttributes(this.el, opts.remove, opts.keep);
          if (opts.children && opts.children.length) moveChildren(this.el, opts.children);
          if (opts.remount) remount(this.el, opts.remount);

          // for debugging
          this.el.__$stencil = this;
          let _dispose;
          if (typeof this.dispose === 'function') {
            _dispose = this.dispose;
          }
          this.dispose = function (...args) {
            _dispose.call(this, ...args)
            this.el.__$stencil = null;
            delete this.el.__$stencil;
          };

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
    aztec: object & {
      debug: Record<string, boolean>
    };
  }
}

export function exportToGlobal(name: string, desc: object | Function) {
  if (typeof window.aztec === 'undefined') window.aztec = {debug: {}};
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

import { forceUpdate } from '@stencil/core/internal';
import version from '../version';
import { observerAttributes } from './helper';
import { isNumber, isPlainObject, safeEval, get, set, stringToPath } from './lang';
import { decamelize } from './strings';

export * from './lang';
export * from './strings';
export * from './helper';
export * from './next-tick';

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
      forceUpdate,
      stringToPath
    };
  }
});
