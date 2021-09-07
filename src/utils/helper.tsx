import { h } from "@stencil/core";
import { ModifierCombinations } from "../global/typing";

export function getCaptionWithIcon(caption: string, icon: string = '', iconPosition: string = '', classes: string = '', props = {}) {
  return <span class={`az-caption__wrapper ${classes}`} {...props}>
    {(icon && iconPosition === 'left') ? <az-icon slot="before" icon={icon}></az-icon> : <slot name="before"></slot>}
    {caption && <span class={`az-button-caption az-caption`}>{caption}</span>}
    {(icon && iconPosition === 'right') ? <az-icon slot="after" icon={icon}></az-icon> : <slot name="after"></slot>}
  </span>;
}

const stencil = Symbol.for('__$stencil');

export function setInternalInstance<T>(e: HTMLElement, instance: T) {
  if (e) e[stencil] = instance;
}

export function getInternalInstance<T>(e: HTMLElement) {
  if (!e) return null;
  return e[stencil] as T;
}

export function isModiferKeysPressed(e: MouseEvent, modifiers: ModifierCombinations) {
  if (!modifiers) return true;
  for (const modifer of modifiers.split(' ')) {
    if (!e[`${modifer}Key`]) return false;
  }
  return true;
}

const defaultMutationObserverInit = {attributes: true, childList: false, subtree: false};

type OnMutation = (mutation: MutationRecord) => void;
export interface MutationObserverCallbacks {
  onAttributesChange?: OnMutation,
  onChildListChange?: OnMutation
}

export function observerAttributes(target: HTMLElement, callbacks: OnMutation, config?: MutationObserverInit);
export function observerAttributes(target: HTMLElement, callbacks: MutationObserverCallbacks, config?: MutationObserverInit)
export function observerAttributes(target: HTMLElement, callbacks: MutationObserverCallbacks | OnMutation, config: MutationObserverInit = defaultMutationObserverInit)
{
  let handlers: MutationObserverCallbacks;
  if (typeof callbacks === 'function') {
    handlers = {onAttributesChange: callbacks};
  } else {
    if (callbacks == null || !Object.keys(callbacks).length) {
      throw new Error(`One of 'onAttributesChange and onChildListChange' is mandatory!`);
    } else {
      handlers = callbacks;
    }
  }
  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && handlers.onAttributesChange) {
        handlers.onAttributesChange(mutation);
      } else if (mutation.type === 'childList' && handlers.onChildListChange) {
        handlers.onChildListChange(mutation);
      }
    }
  });
  observer.observe(target, config);
  return () => observer.disconnect();
}
