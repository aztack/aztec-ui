import { Component, Prop, Element, Host, State, h, Event, EventEmitter, Method} from '@stencil/core';
import { AzTree } from './az-tree';
import { HostElement } from '@stencil/core/dist/declarations';
import { Inject } from '../../utils/utils';

export interface IAzTreeItem {
  caption: string;
  icon: string;
  level: number;
  items: IAzTreeItem[];
}

@Component({
  tag: 'az-tree-item',
  shadow: false
})
export class AzTreeItem {
  @Element() el: HostElement;
  @Prop() caption: string = '';
  @Prop() icon: string = '';
  @Prop() selected: false;

  tree: AzTree = null;
  level: number = 0;
  html: string = '';

  @State() items: IAzTreeItem[] = [];
  expanded: boolean = true;

  componentDidLoad() {
    this.toggle = this.toggle.bind(this);
  }

  @Method()
  async addItem(item: IAzTreeItem) {
    item.level = this.level + 1;
    this.items = [...this.items, item];
    // this.el.forceUpdate();
  }

  @Method()
  async getItems(index?: number) {
    const items = this.el.querySelectorAll('az-tree-item');
    if (index < 0 || index >= items.length) throw new RangeError(`index ${index} out of bounds ${items.length}`);
    return typeof index === 'undefined' ? items : items[index];
  }

  @Method()
  async removeItem(index: number) {
    const item = await this.getItems(index) as HTMLElement;
    item.parentNode.removeChild(item);
    this.el.forceUpdate();
  }

  toggle() {
    this.expanded = !this.expanded
    this.el.forceUpdate();
  }

  render() {
    // styles
    const style: any = {};
    const cls = {
      'az-tree-item': true,
      expanded: this.expanded,
      collapsed: !this.expanded
    }
    if (this.level) style.paddingLeft = `${(this.level) * 12}px`;


    // parts
    const joint = <az-icon class={{joint: true, hide: this.items.length <= 0}} width="9" height="9" icon="triangle" onClick={this.toggle}></az-icon>;
    const icon = this.icon ? <az-icon icon={this.icon}></az-icon> : null;
    const checkbox = (this.tree && this.tree.selecting) ? <az-checkbox></az-checkbox> : null;
    const text = this.html
      ? <span innerHTML={this.html}></span>
      : <span>{this.caption}</span>
    // render
    return (
      <Host class={cls} data-level={this.level}>
        <div class="az-tree-item-caption az-caption"style={style} onClick={this.toggle}>
          {joint}{checkbox}{icon}{text}
        </div>
        <div class="az-tree-item-children">
          {this.items.map((c: IAzTreeItem) => <az-tree-item caption={c.caption}></az-tree-item>)}
        </div>
      </Host>
    );
  }
}