import { Component, Prop, Element, h, Event, EventEmitter, Method } from '@stencil/core';
import { ComponentStyle, ComponentSize } from '../../global/typing';

@Component({
  tag: 'az-switch',
  styleUrl: 'az-switch.styl',
  shadow: false
})
export class AzSwitch {
  @Element() el: HTMLElement;

  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) type: ComponentStyle = 'primary';
  @Prop({reflect: true, mutable: true}) value: boolean = false;
  @Prop({reflect: true}) size: ComponentSize = 'normal';

  @Event() changed: EventEmitter;

  componentDidLoad() {
    this.bind();
  }

  bind() {
    this.el.addEventListener('click', () => this.onClick());
  }

  onClick() {
    this.changed.emit(this.value = !this.value);
  }

  @Method()
  async toJson(detailed: boolean = false) {
    return Object.assign({
      tag: 'az-switch',
      caption: this.caption,
      value: this.value
    }, detailed ? {
      type: this.type,
      size: this.size
    } : null);
  }

  render() {
    const cap = this.caption ? <span class="az-switch__caption az-caption">{this.caption}</span> : null;
    const classes = {
      button: true,
      [this.type]: true,
      [this.size]: true,
      [this.value ? 'on' : 'off']: true
    };
    const vdom = [<span class={classes}></span>];
    if (cap) vdom.unshift(cap);
    return vdom;
  }
}
