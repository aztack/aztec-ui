import { Component, Host, h, Prop } from '@stencil/core';
import { PositionHorizontal } from '../../global/typing';
import { join } from '../../utils';
import { getCaptionWithIcon } from '../../utils/helper';

@Component({
  tag: 'az-hr',
  styleUrl: 'az-hr.styl',
  shadow: false,
})
export class AzHr {
  @Prop() caption: string;
  @Prop() icon: string;
  @Prop() iconPosition: PositionHorizontal = 'left';
  @Prop() captionPosition: PositionHorizontal = 'left';

  render() {
    const classes = join(this.captionPosition, 'az-caption__');
    return (
      <Host>
        {getCaptionWithIcon(this.caption, this.icon, this.iconPosition, classes)}
        <hr class="az-hr"></hr>
        <slot></slot>
      </Host>
    );
  }

}
