import { h } from "@stencil/core";
import { ModifierCombinations } from "../global/typing";

export function getCaptionWithIcon(caption: string, icon: string = '', iconPosition: string = '', classes: string = '', ...props) {
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
