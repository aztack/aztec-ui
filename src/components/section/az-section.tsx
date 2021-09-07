import { Component, Prop, Element, h, Method } from '@stencil/core';
import { PositionHorizontal } from '../../global/typing';
import { Inject } from '../../utils';
import { getCaptionWithIcon } from '../../utils/helper';

@Component({
  tag: 'az-section',
  styleUrl: 'az-section.styl',
  shadow: false
})
export class AzSection {
  @Element() el: HTMLElement;
  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) captionPosition: PositionHorizontal = 'left';
  @Prop({reflect: true}) collapsed: boolean = false;
  @Prop({reflect: true, mutable: true}) collapsable: boolean = true;
  @Prop({reflect: true}) arrowPosition: 'left' | 'right' = 'left';
  @Prop({reflect: true}) icon: string = 'arrow-down';
  @Prop({reflect: true}) iconPosition: PositionHorizontal = 'left';

  constructor() {
    this.onClickCaption = this.onClickCaption.bind(this);
  }

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

  onClickCaption() {
    if (this.collapsable) {
      this.collapsed = !this.collapsed;
    }
  }

  render() {
    const caption = getCaptionWithIcon(this.caption, this.icon, this.iconPosition,
      'az-section-caption', {onClick: this.onClickCaption});
    return (
      <section class={{
        'az-section': true,
        collapsable: this.collapsable,
        collapsed: this.collapsed
      }}>
        <div class={`header arrow-${this.arrowPosition}`}>
          {caption}
          <slot name="after"></slot>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </section>
    );
  }
}
