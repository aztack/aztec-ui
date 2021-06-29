import { Component, Prop, Element, Host, h } from '@stencil/core';

@Component({
  tag: 'az-toolbar',
  styleUrl: 'az-toolbar.styl',
  shadow: false
})
export class AzToolbar {
  @Element() el: HTMLElement;

  @Prop() caption: string = '';
  @Prop() direction: string = 'horizontal';

  componentDidLoad() {}

  render() {
    return (
      <Host class={`az-toolbar ${this.direction}`}>
        <slot></slot>
      </Host>
    );
  }
}
