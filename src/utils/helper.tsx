import { h } from "@stencil/core";

export function getCaptionWithIcon(caption: string, icon: string = '', iconPosition: string = '', classes: string = '') {
  return <span class={`az-caption__wrapper ${classes}`}>
    {(icon && iconPosition === 'left') ? <az-icon slot="before" icon={icon}></az-icon> : <slot name="before"></slot>}
    {caption && <span class={`az-button-caption az-caption`}>{caption}</span>}
    {(icon && iconPosition === 'right') ? <az-icon slot="after" icon={icon}></az-icon> : <slot name="after"></slot>}
  </span>;
}
