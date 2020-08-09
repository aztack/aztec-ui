import { Component, Prop, Element, h, Method } from '@stencil/core';
import { Inject } from '../../utils/utils';

@Component({
  tag: 'az-section',
  styleUrl: 'az-section.styl',
  shadow: false
})
export class AzSection {
  @Element() el: HTMLElement;
  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) collapsed: boolean = false;
  @Prop({reflect: true}) collapsable: boolean = true;
  @Prop({reflect: true}) arrowPosition: 'left' | 'right' = 'left';
  @Prop({reflect: true}) icon: string = 'arrow-up';

  @Inject({})
  componentDidLoad() {
  }

  @Method()
  async collapse() {
    this.collapsed = true;
  }

  @Method()
  async expand() {
    this.collapsed = false;
  }

  render() {
    return (
      <section class={{
        'az-section': true,
        collapsable: this.collapsable,
        collapsed: this.collapsed
      }}>
        <div class={{
          header: true,
          [`arrow-${this.arrowPosition}`]: true
        }}>
          <span class="az-section-caption az-caption" onClick={() => this.collapsed = !this.collapsed}>
            <az-icon class="az-section__arrow" icon={this.icon}></az-icon>
            {this.caption}
          </span>
          <slot name="header"></slot>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </section>
    );
  }
}
