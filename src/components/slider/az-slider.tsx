
import { Component, Prop, Element, h, Watch } from '@stencil/core';
import { Inject } from '../../utils/utils';

@Component({
  tag: 'az-slider',
  styleUrl: 'az-slider.styl',
  shadow: false
})
export class AzSlider {
  @Element() el: Element;

  @Prop({reflect: true}) caption: string = '';
  @Prop() value: string | number = '50';
  @Prop({reflect: true}) min: string | number = 0;
  @Prop({reflect: true}) max: string | number = 100;

  input: HTMLInputElement;

  @Inject({
    attrs: true,
    remove: false
  })
  componentDidLoad() {
    this.input.addEventListener('change', () => {
      this.value = this.input.value;
    });
  }

  @Watch('value')
  onValueChange(newValue, oldValue) {
    if (oldValue !== newValue) {
      this.input.value = newValue;
    }
  }

  render() {
    const vdom = [
      <slot name="before"></slot>,
      <input type="range" ref={(el: HTMLInputElement) => this.input = el}></input>,
      <slot name="after"></slot>,
    ];
    if (this.caption) {
      vdom.unshift(<span class="az-slider__caption az-caption">{this.caption}</span>);
    }
    return vdom;
  }
}