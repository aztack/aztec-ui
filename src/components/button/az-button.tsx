import { Component, Prop, Element, h } from '@stencil/core';
import { ComponentStyle, ComponentSize, PositionHorizontal } from '../../global/typing';
// import { Inject } from '../../utils';

@Component({
  tag: 'az-button',
  styleUrl: 'az-button.styl',
  shadow: false
})
export class AzButton {
  @Element() el: HTMLElement;
  /**
   * Button type
   */
  @Prop({reflect: true}) type: ComponentStyle = 'primary';
  @Prop({reflect: true}) icon: string = '';
  @Prop({reflect: true}) size: ComponentSize = 'normal';
  @Prop({reflect: true}) round: boolean = false;
  @Prop({reflect: true}) circle: boolean = false;
  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) iconPosition: PositionHorizontal = 'left';
  @Prop({reflect: true}) disabled: boolean = false;

  // @Inject({
  //   attrs: true,
  //   remove: true,
  //   keep: ['caption', 'type', 'size', 'icon', 'icon-position', 'round', 'disabled', 'circle', 'style']
  // })
  componentDidLoad() {
    if (!this.type) this.type = 'primary';
    if (!this.size) this.size = 'normal';
    // if no caption specified, iconPosition will remain unset
    if (!this.iconPosition && this.caption) this.iconPosition = 'left';
    if (this.disabled == null) this.disabled = false;
  }

  render() {
    let iconLeft = null;
    let iconRight = null;
    let pos = this.iconPosition as string;
    if (!this.caption) pos = '';
    const icon = this.icon ? <az-icon class={pos} icon={this.icon}></az-icon> : null;
    if (pos === 'left') {
      iconLeft = icon;
    } else {
      iconRight = icon;
    }
    if (this.size === 'extra-small') {
      iconLeft = iconRight = null;
      if (process.env.NODE_ENV === 'development') {
        console.warn(`<az-button size="extra-small" /> is too small to show an icon`);
      }
    }
    if (!this.caption && !this.icon && process.env.NODE_ENV === 'development') {
      console.warn(`<az-button> requires a caption or an icon`);
    }
    if (this.circle && !this.icon && process.env.NODE_ENV === 'development') {
      console.warn(`<az-button circle="true" icon="..."/> requires an icon`);
    }
    if (this.circle && this.size.indexOf('small') >= 0 && process.env.NODE_ENV === 'development') {
      console.warn(`<az-button> can not be circle if size is small or extra-small`);
    }

    const cls = {
      circle: this.circle,
      round: this.round,
      [this.type]: true,
      [this.size]: true
    };

    return (
      <button class={cls}>
        <slot name="before">{iconLeft}</slot>
          {this.caption && <span class="az-button-caption az-caption">{this.caption}</span>}
        <slot></slot>
        <slot name="after">{iconRight}</slot>
      </button>
    )
  }
}
