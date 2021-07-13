import { forceUpdate, h } from '@stencil/core';

import { MouseButton } from '../../global/typing';
import { setInternalInstance } from '../../utils/helper';
import { AzTree, SerializeOptions } from './az-tree';

export interface IAzTreeItem {
  caption: string;
  icon?: string;
  selected?: boolean;
  active?: boolean;
  level?: number;
  data?: any;
  html?: string;
  parent?: IAzTreeItem;
  items?: IAzTreeItem[];
}

export type AzTreeItemField = keyof IAzTreeItem;

const AzTreeItemFields: readonly AzTreeItemField[] = Object.freeze([
  'caption', 'icon', 'selected', 'active', 'level', 'data', 'html'
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
  checked: boolean = false;
  draggable: boolean = false;
  dragover: boolean = false;

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
    this.removeSelf = this.removeSelf.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onActivateItem = this.onActivateItem.bind(this);
    this.onMiddleButtonDown = this.onMiddleButtonDown.bind(this);
    this.onMoveUp = this.onMoveUp.bind(this);
    this.onMoveDown = this.onMoveDown.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.toJson = this.toJson.bind(this);
    this.set = this.set.bind(this);
    this.setCaption = this.setCaption.bind(this);
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

  toJson(opts: SerializeOptions = {}) {
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
    if (opts.recursive) {
      result.items = this.items.map(it => it.toJson(opts));
      if (opts.noEmptyItems && !result.items.length) delete result.items;
    }
    return opts.asString ? JSON.stringify(result) : result;
  }

  set(field: AzTreeItemField, value: any, force = false) {
    if (!AzTreeItemFields.includes(field)) {
      console.warn(`There is no such field '${field}' on <az-tree-item>`);
      return;
    }
    if (force || this[field as string] !== value) {
      this[field as string] = value;
      this.tree._forceUpdate();
    }
  }

  setCaption(value: string) {
    this.set('caption', value);
  }

  addItem(item: AzTreeItem | string) {
    if (!this.tree) {
      throw new Error(`No parent tree!`);
    }
    this.tree.addItem(item, this);
  }

  /**
   * Remove self from parent
   * @param dispose remove internal __$stencil link from DOM element
   * @returns
   */
  removeSelf(dispose: boolean = true) {
    // remove() is ChildNode method
    // we have to rename this method to removeSelf
    if (this.parent instanceof AzTreeItem) {
      this.parent.removeItem(this);
    } else {
      this.tree.removeItem(this);
    }
    if (dispose) {
      this.dispose();
    } else {
      return this;
    }
  }

  removeItem(item: AzTreeItem) {
    const pos = this.items.findIndex(it => it === item);
    if (pos >= 0) {
      this.removeItemAt(pos);
    }
  }

  removeItemAt(index: number) {
    const removed = this.items.splice(index, 1);
    if (removed.length) {
      this.tree.checkedItems.delete(removed[0]);
      this.tree.itemremoved.emit(removed[0]);
      removed[0].dispose();
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

  onMiddleButtonDown(e: MouseEvent) {
    if (!this.tree.activeOnMiddleButtonDown) return;
    if (e.button === MouseButton.Auxiliary) {
      this.onActivateItem();
    }
  }

  onActivateItem(): void {
    const tree = this.tree;
    if (!this.active) {
      this.active = true;
      if (tree.activeItem) {
        tree.activeItem.active = false;
      }
      tree.activeItem = this;
      tree.selected.emit(this);
    }
  }

  onMoveUp(): void {
    if (this.isFirstChild) return;
    const index = this.index;
    const cur = this.parent.items.splice(index, 1)[0];
    this.parent.items.splice(index - 1, 0, cur);
    forceUpdate(this.tree);
  }

  onMoveDown(): void {
    if (this.isLastChild) return;
    const index = this.index;
    const cur = this.parent.items.splice(index, 1)[0];
    this.parent.items.splice(index + 1, 0, cur);
    forceUpdate(this.tree);
  }

  onRemove(): void {
    this.removeSelf();
  }

  render(index: number) {
    // styles
    const style: Record<string, string> = {};
    const cls = {
      'az-tree-item': true,
      'az-tree-item__first-child': index === 0,
      'az-tree-item__last-child': index === this.parent.items.length - 1,
      expanded: this.expanded,
      collapsed: !this.expanded,
      active: this.active
    }
    if (this.level) style.paddingLeft = `${(this.level) * 12}px`;

    // parts
    const dragHandle = this.draggable
      ? <az-icon icon="drag"
          draggable={true}
          onDragStart={this.tree.onDragStart}></az-icon>
      : null;
    const moveNodeUp = (this.draggable && index > 0)
      ? <az-icon icon="move-node-up" hover-effect="border background" onClick={this.onMoveUp}></az-icon>
      : null;
    const moveNodeDown = (this.draggable && index < this.parent.items.length - 1)
      ? <az-icon icon="move-node-down" hover-effect="border background" onClick={this.onMoveDown}></az-icon>
      : null;

    const deleteNode = this.draggable
      ? <az-icon icon="close" hover-effect="border background" onClick={this.onRemove}></az-icon>
      : null;
    const eventListeners = {
    }
    const dropAsChildren = <az-icon icon="new-child-node" {...eventListeners}></az-icon>;
    const dropAsSibling = <az-icon icon="new-sibling-node" {...eventListeners}></az-icon>

    const joint =
      <az-icon class={{joint: true, hide: this.items.length <= 0}}
        icon="triangle"
        width="9"
        height="9"
        hover-effect="border"
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

    const captionCls = {
      'az-caption': true,
      'az-tree-item__caption': true,
      [`az-tree-item__dragover`]: this.dragover,
    }

    const handlers: Record<string, Function> = {
      onDragEnter: this.tree.onDragEnter,
      onDragOver: this.tree.onDragOver,
      onDragLeave: this.tree.onDragLeave,
      onDragEnd: this.tree.onDragEnd,
      onDrop: this.tree.onDrop,
      onClick: this.onActivateItem,
      onContextMenu: this.onActivateItem,
      onMouseDown: this.onMiddleButtonDown
    };
    // render
    return (
      <az-tree-item class={cls} data-level={this.level} ref={this._inject}>
        {/* caption */}
        <div class={captionCls} style={style} {...handlers}>
          {joint}{checkbox}{icon}{text}{extra}
          <span class="az-tree-item__handlers">
            {dropAsChildren}{dropAsSibling}
            {moveNodeUp}{moveNodeDown}{deleteNode}{dragHandle}
          </span>
        </div>

        {/* children items */}
        <div class="az-tree-item__children">
          {this.items.map(((c: AzTreeItem, index) => c.render(index)))}
        </div>
      </az-tree-item>
    );
  }

  dispose() {
    setInternalInstance(this.el, null);
    this.el = null;
  }

  private _inject(el: AzTreeItem) {
    if (!el || el.items) return;
    // @ts-ignore
    this.el = el;
    setInternalInstance(this.el, this);
    el.caption = this.caption;
    el.addItem = this.addItem;
    el.removeItemAt = this.removeItemAt;
    el.removeItem = this.removeItem;
    el.removeSelf = this.removeSelf;
    el.toggle = this.toggle;
    el.onMoveUp = this.onMoveUp;
    el.onMoveDown = this.onMoveDown;
    el.toJson = this.toJson;
    el.set = this.set;
    el.setCaption = this.setCaption;
    el.dragover = this.dragover;
    el.items = this.items;
  }

}
