import { h } from '@stencil/core';
import { AzTree } from './az-tree';

export interface IAzTreeItem {
  caption: string;
  icon?: string;
  selected?: boolean;
  active?: boolean;
  level?: number;
  data?: any;
  html?: string;
  items: IAzTreeItem[];
}
export class AzTreeItem {
  caption: string = '';
  icon: string = '';
  selected: boolean = false;
  active: boolean = false;
  level: number = 0;


  tree: AzTree = null;
  parent: AzTreeItem;
  items: AzTreeItem[] = [];
  data: any = null;

  html: string = '';
  _expanded: boolean = true;

  get expanded() {
    return this._expanded;
  }
  set expanded(val) {
    this._expanded = val;
    if (this._expanded) {
      this.tree.expanded.emit(this);
    } else {
      this.tree.collapsed.emit(this);
    }
    this.tree.render();
  }

  fromJson(item: IAzTreeItem, tree: AzTree, level: number) {
    Object.assign(this, item);
    this.tree = tree;
    if (item.items) {
      this.items = item.items.map(it => {
        const treeItem = new AzTreeItem();
        treeItem.level = level;
        treeItem.fromJson(it, tree, level + 1);
        return treeItem;
      });
    }
  }

  addItem(item: AzTreeItem | string) {
    if (!this.tree) {
      throw new Error(`No parent tree!`);
    }
    this.tree.addItem(item, this);
  }

  remove() {
    if (this.parent) {
      this.parent.removeItem(this);
    } else {
      const pos = this.tree.roots.findIndex(it => it === this);
      if (pos >= 0) {
        const deleted = this.tree.roots.splice(pos, 1);
        this.tree.checkedItems.delete(deleted[0]);
      }
      this.tree.render();
    }
  }

  removeItem(item: AzTreeItem) {
    const pos = this.items.findIndex(it => it === item);
    if (pos >= 0) {
      this.removeItemAt(pos);
    }
  }

  removeItemAt(index: number) {
    const deleted = this.items.splice(index, 1);
    if (deleted.length) this.tree.checkedItems.delete(deleted[0]);
    this.tree.render();
  }

  toggle(e: MouseEvent) {
    this.expanded = !this.expanded
    e.stopPropagation()
  }

  onCheckboxChecked(e: CustomEvent) {
    const checked = e.detail;
    if (checked) {
      this.tree.checkedItems.add(this);
    } else {
      this.tree.checkedItems.delete(this);
    }
  }

  onActivateItem(item: AzTreeItem): void {
    const tree = this.tree;
    if (!this.active) {
      this.active = true;
      if (tree.activeItem) {
        tree.activeItem.active = false;
      }
      tree.activeItem = this;
      tree.selected.emit(item);
    } else {
      this.active = false;
      tree.activeItem = null;
    }
  }

  render() {
    // styles
    const style: any = {};
    const cls = {
      'az-tree-item': true,
      expanded: this.expanded,
      collapsed: !this.expanded,
      active: this.active
    }
    if (this.level) style.paddingLeft = `${(this.level) * 12}px`;

    // methods
    const toggle = this.toggle.bind(this);
    const self = this;
    const inject = (el: AzTreeItem) => {
      if (!el || el.items) return;
      el.addItem = this.addItem.bind(this);
      el.removeItemAt = this.removeItemAt.bind(this);
      el.removeItem = this.removeItem.bind(this);
      el.remove = this.remove.bind(this);
      el.toggle = toggle;
      el.items = self.items;
    }

    // parts
    const joint = <az-icon class={{joint: true, hide: this.items.length <= 0}} width="9" height="9" icon="triangle" onClick={toggle}></az-icon>;
    const icon = this.icon ? <az-icon icon={this.icon}></az-icon> : null;
    const checkbox = (this.tree && this.tree.selecting) ? <az-checkbox onChanged={(e) => this.onCheckboxChecked(e)}></az-checkbox> : null;
    const text = this.html
      ? <span innerHTML={this.html}></span>
      : <span>{this.caption}</span>
    // render
    return (
      <az-tree-item class={cls} data-level={this.level} ref={inject}>
        <div class="az-tree-item__caption az-caption"style={style} onClick={() => this.onActivateItem(this)}>
          {joint}{checkbox}{icon}{text}
        </div>
        <div class="az-tree-item__children">
          {this.items.map((c: AzTreeItem) => c.render())}
        </div>
      </az-tree-item>
    );
  }
}