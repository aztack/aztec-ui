
import { Component, Prop, Element, h, Method, Host, Event, EventEmitter } from '@stencil/core';
import { IAzTreeItem, AzTreeItem } from './az-tree-item';
import { Inject } from '../../utils/utils';

@Component({
  tag: 'az-tree',
  styleUrl: 'az-tree.styl',
  shadow: false
})
export class AzTree {
  @Element() el: HTMLElement;
  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) selecting: boolean = false;
  @Prop() roots: AzTreeItem[] = [];
  @Prop() checkedItems: Set<AzTreeItem> = new Set<AzTreeItem>();
  @Prop() activeItem: AzTreeItem = null;

  @Event() selected: EventEmitter;
  @Event() expanded: EventEmitter;
  @Event() collapsed: EventEmitter;
  @Event() inserted: EventEmitter;

  @Inject({
    sync: [/*'find'*/]
  })
  componentDidLoad() {

  }

  @Method()
  async addItem(itemOrCaption: AzTreeItem | string, parent: AzTreeItem | number = null, attrs: any = {}) {
    let item: AzTreeItem;
    if (typeof itemOrCaption === 'string') {
      item = new AzTreeItem();
      item.caption = itemOrCaption;
    } else if (itemOrCaption instanceof AzTreeItem){
      item = itemOrCaption;
    }
    if (!item) return;
    item.tree = this;
    Object.assign(item, attrs);
    if (parent === null) {
      this.roots = [...this.roots, item];
      this.inserted.emit(item);
      return item;
    } else if (typeof parent === 'number') {
      parent = this.roots[parent];;
    }
    item.parent = parent;
    item.level = parent.level + 1;
    parent.items = [...parent.items, item];
    this.render();
    this.inserted.emit(item);
    return item;
  }

  @Method()
  async fromJson(items: IAzTreeItem[]) {
    this.roots = items.map(it => {
      const treeItem = new AzTreeItem();
      treeItem.fromJson(it, this, treeItem.level + 1);
      return treeItem;
    });
    this.activeItem = null;
    this.checkedItems.clear();
  }

  @Method()
  async removeItem(index: number) {
    this.roots[index].remove();
  }

  find(/*(predicate: (item: AzTreeItem) => boolean*/) {
    throw new Error('Not implemented!');
  }

  expandAll() {
    throw new Error('Not implemented!');
  }

  collapsAll() {
    throw new Error('Not implemented!');
  }

  render() {
    return <Host>
      <span class="az-tree__caption az-caption">{this.caption}</span>
      {this.roots.map((c: AzTreeItem) => c.render())}
    </Host>
  }
}