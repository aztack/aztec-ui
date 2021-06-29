import { Component, Prop, Element, Host, h } from '@stencil/core';
import { Inject } from '../../utils';

@Component({
  tag: 'az-group',
  styleUrl: 'az-group.styl',
  shadow: false
})
export class AzGroup {
  @Element() el: HTMLElement;

  @Prop() caption: string = '';
  @Prop() itemSelector: string = 'az-radio';
  @Prop() itemEvent: string = 'changed';
  @Prop() itemProp: string = 'checked';
  @Prop() itemValue: any = false;
  @Prop() limit: number = 1;

  @Inject({
    sync: ['items']
  })
  componentDidLoad() {
    this.onItemChanged = this.onItemChanged.bind(this);
    this.el.addEventListener(this.itemEvent, this.onItemChanged);
  }

  items(): HTMLElement[] {
    return Array.from(this.el.querySelectorAll(this.itemSelector)) as HTMLElement[] || [];
  }

  onItemChanged(e: UIEvent) {
    const items = this.items();
    const checked = items.filter(it => it[this.itemProp] !== this.itemValue).length;
    if (checked < this.limit) return;
    if (checked > this.limit) {
      items.forEach((item) => {
        if (e.target !== item) item[this.itemProp] = this.itemValue;
      });
    }
  }

  render() {
    return (
      <Host class="az-exclusive-group">
        <slot></slot>
      </Host>
    );
  }
}
