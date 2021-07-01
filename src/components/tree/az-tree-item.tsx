import { forceUpdate, h } from '@stencil/core';
import { AzTree, SerializeOptions } from './az-tree';
export interface IAzTreeItem {
  caption: string;
  icon?: string;
  selected?: boolean;
  active?: boolean;
  level?: number;
  data?: any;
  html?: string;
  parent: IAzTreeItem;
  items: IAzTreeItem[];
}

export type AzTreeItemField = keyof IAzTreeItem;

const AzTreeItemFields: readonly AzTreeItemField[] = Object.freeze([
  'caption', 'icon', 'selected', 'active', 'level', 'data', 'html', 'items'
]);

export class AzTreeItem implements IAzTreeItem {
  el: HTMLElement;
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
  checked: boolean = false;
  draggable: boolean = false;

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
  }

  get isFirstChild() {
    return this.parent.items.indexOf(this) === 0;
  }

  get isLastChild() {
    return this.parent.items.indexOf(this) === this.parent.items.length - 1;
  }

  get index() {
    return this.parent.items.indexOf(this);
  }

  get firstChild() {
    return this.items[0];
  }

  get lastChild() {
    return this.items[this.items.length - 1];
  }

  get previousSibling() {
    const index = this.parent.items.indexOf(this);
    return this.parent.items[index - 1];
  }

  get nextSibling() {
    const index = this.parent.items.indexOf(this);
    return this.parent.items[index + 1];
  }

  constructor() {
    this.addItem = this.addItem.bind(this);
    this.removeItemAt = this.removeItemAt.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.remove = this.remove.bind(this);
    this.toggle = this.toggle.bind(this);
    this._inject = this._inject.bind(this);
  }

  fromJson(item: IAzTreeItem, parent: any | AzTree, level: number) {
    Object.assign(this, item);
    this.parent = parent;
    this.tree = parent instanceof AzTree ? parent : parent.tree;
    if (item.items) {
      this.items = item.items.map(it => {
        const treeItem = new AzTreeItem();
        treeItem.level = level;
        treeItem.fromJson(it, this, level + 1);
        return treeItem;
      });
    }
  }

  toJson(opts: SerializeOptions) {
    let fields = AzTreeItemFields;
    if (opts.filter) {
      if (typeof opts.filter === 'string') {
        fields = [opts.filter];
      } else if (Array.isArray(opts.filter)) {
        fields = opts.filter;
      }
    }
    const result = fields.reduce((result, field) => {
      result[field] = this[field];
      return result;
    }, {} as Record<AzTreeItemField, any>);
    result.items = this.items.map(it => it.toJson(opts))
    return result;
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
      const pos = this.tree.items.findIndex(it => it === this);
      if (pos >= 0) {
        const deleted = this.tree.items.splice(pos, 1);
        this.tree.checkedItems.delete(deleted[0]);
      }
      forceUpdate(this.tree);
    }
    this.dispose();
  }

  removeItem(item: AzTreeItem) {
    const pos = this.items.findIndex(it => it === item);
    if (pos >= 0) {
      this.removeItemAt(pos);
    }
  }

  removeItemAt(index: number) {
    const deleted = this.items.splice(index, 1);
    if (deleted.length) {
      this.tree.checkedItems.delete(deleted[0]);
      deleted[0].dispose();
    }
    forceUpdate(this.tree);
  }

  toggle(e?: MouseEvent) {
    this.expanded = !this.expanded
    forceUpdate(this.tree);
    if (e) e.stopPropagation()
  }

  onCheckboxChecked(e: CustomEvent | boolean) {
    this.checked = typeof e === 'boolean' ? e : e.detail;
    if (this.checked) {
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
    }
  }

  render() {
    // styles
    const style: Record<string, string> = {};
    const cls = {
      'az-tree-item': true,
      expanded: this.expanded,
      collapsed: !this.expanded,
      active: this.active
    }
    if (this.level) style.paddingLeft = `${(this.level) * 12}px`;

    // parts
    const joint =
      <az-icon class={{joint: true, hide: this.items.length <= 0}}
        icon="triangle"
        width="9"
        height="9"
        onClick={this.toggle}>
      </az-icon>;
    const icon = this.icon ? <az-icon icon={this.icon}></az-icon> : null;
    const checkbox = (this.tree && this.tree.selecting)
      ? <az-checkbox checked={this.checked} onChanged={(e) => this.onCheckboxChecked(e)}></az-checkbox>
      : null;
    const text = this.html
      ? <span innerHTML={this.html}></span>
      : <span>{this.caption}</span>
    // TODO:
    const extra = [];
    // render
    return (
      <az-tree-item class={cls} data-level={this.level} ref={this._inject} draggable={this.draggable}>
        <div class="az-tree-item__caption az-caption"style={style} onClick={() => this.onActivateItem(this)}>
          {joint}{checkbox}{icon}{text}{extra}
        </div>
        <div class="az-tree-item__children">
          {this.items.map((c: AzTreeItem) => c.render())}
        </div>
      </az-tree-item>
    );
  }

  dispose() {
    this.el['__$stencil'] = null;
    this.el = null;
  }

  private _inject(el: AzTreeItem) {
    if (!el || el.items) return;
    // @ts-ignore
    this.el = el;
    el['__stencil'] = this;
    el.addItem = this.addItem;
    el.removeItemAt = this.removeItemAt;
    el.removeItem = this.removeItem;
    el.remove = this.remove;
    el.toggle = this.toggle;
    el.items = this.items;
  }

}
