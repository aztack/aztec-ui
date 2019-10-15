
import { Component, Prop, Element, Method, State, h, Host, Event, EventEmitter } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { IAzTreeItem } from './az-tree-item';
import { Inject } from '../../utils/utils';

@Component({
  tag: 'az-tree',
  styleUrl: 'az-tree.styl',
  shadow: false
})
export class AzTree {
  @Element() el: HostElement;
  @Prop() caption: string = '';
  @Prop() selecting: boolean = false;

  @State() roots: IAzTreeItem[] = [];

  @Event() selected: EventEmitter;
  @Event() expanded: EventEmitter;
  @Event() collapsed: EventEmitter;
  @Event() inserted: EventEmitter;

  @Inject({
    sync: ['getItems']
  })
  componentDidLoad() {
    this.forceUpdate = this.forceUpdate.bind(this);
    this.el.addEventListener('expanded', this.forceUpdate);
    this.el.addEventListener('collapsed', this.forceUpdate);
  }

  @Method()
  async addItem(item: IAzTreeItem) {
    item.level = 0;
    this.roots = [...this.roots, item];
  }

  getItems(index?: number) {
    const items = this.el.querySelectorAll('az-tree-item');
    if (index < 0 || index >= items.length) throw new RangeError(`index ${index} out of bounds ${items.length}`);
    return typeof index === 'undefined' ? items : items[index];
  }

  @Method()
  async removeItem(index: number) {
    const item = this.getItems(index) as HTMLElement;
    item.parentNode.removeChild(item);
  }

  forceUpdate() {
    this.el.forceUpdate();
  }

  render() {
    return <Host>
      {this.roots.map((c: IAzTreeItem) =>
        <az-tree-item
        caption={c.caption}
        icon={c.icon}
        data-level={c.level}>
        </az-tree-item>)}
    </Host>
  }
}