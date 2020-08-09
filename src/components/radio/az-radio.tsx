import { Component, Prop, Element, Host, Event, EventEmitter, h, Method } from '@stencil/core';
import { Inject } from '../../utils/utils';
import { ComponentStyle } from '../../global/typing';

@Component({
  tag: 'az-radio',
  styleUrl: 'az-radio.styl',
  shadow: false
})
export class AzRadio {
  @Element() el: HTMLElement;

  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) type: ComponentStyle = 'plain';
  @Prop({reflect: true}) checked: boolean = false;

  @Event() changed: EventEmitter;

  @Inject({})
  componentDidLoad () {}

  @Method()
  async toggle() {
    this.checked = !this.checked;
    this.changed.emit(this.checked);
  }

  render() {
    return <Host class="radio" onClick={() => this.toggle()}>
      <i class={{
        'az-radio__box': true,
        [this.type]: true,
        'checked': this.checked
      }}>
      </i>
      <slot>
        <span class="az-radio-caption az-caption">
          {this.caption}
        </span>
      </slot>
    </Host>;
  }
}