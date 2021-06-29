import { Component, Prop, Element, h, Method, Host, Event, EventEmitter, forceUpdate } from '@stencil/core';
import { IAzTreeItem, AzTreeItem } from './az-tree-item';
import { HostElement } from '@stencil/core/internal';
import { Inject } from '../../utils';

enum MoveDirection {
  Up = -1,
  Down = 1,
}
@Component({
  tag: 'az-tree',
  styleUrl: 'az-tree.styl',
  shadow: false
})
export class AzTree {
  @Element() el: HostElement;
  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) selecting: boolean = false;
  @Prop({mutable: true}) items: AzTreeItem[] = [];
  @Prop({mutable: true}) checkedItems: Set<AzTreeItem> = new Set<AzTreeItem>();
  @Prop({mutable: true}) activeItem: AzTreeItem = null;

  @Event() selected: EventEmitter;
  @Event() expanded: EventEmitter;
  @Event() collapsed: EventEmitter;
  @Event() inserted: EventEmitter;

  @Inject({})
  componentDidLoad() {
    this.setNextActiveItem = this.setNextActiveItem.bind(this);
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
      this.items = [...this.items, item];
      //@ts-ignore
      item.parent = this;
      this.inserted.emit(item);
      return item;
    } else if (typeof parent === 'number') {
      parent = this.items[parent];;
    }
    item.parent = parent;
    item.level = parent.level + 1;
    parent.items = [...parent.items, item];
    this.inserted.emit(item);
    this._forceUpdate();
    return item;
  }

  private _forceUpdate() {
    forceUpdate(this);
  }

  @Method()
  async fromJson(items: IAzTreeItem[]) {
    this.items = items.map(it => {
      const treeItem = new AzTreeItem();
      treeItem.tree = this;
      treeItem.fromJson(it, this, treeItem.level + 1);
      return treeItem;
    });
    this.activeItem = null;
    this.checkedItems.clear();
  }

  @Method()
  async removeItem(index: number) {
    this.items[index].remove();
  }

  @Method()
  async setActiveItem(item: AzTreeItem, clear = false) {
    if (item === null && clear) {
      this.clearActiveItem();
      return;
    }
    if (item instanceof AzTreeItem) {
      this.activeItem.active = false;
      this.activeItem = item;
      this.activeItem.active = true;
      this._forceUpdate();
    }
  }

  @Method()
  async clearActiveItem() {
    this.activeItem.active = false;
    this.activeItem = null;
    this._forceUpdate();
  }

  onKeyDown(e: KeyboardEvent) {
    if (!this.activeItem) return;
    const activeItem = this.activeItem;
    if(e.key == 'ArrowRight') {
      if (!activeItem.expanded) {
        activeItem.expanded = true;
      } else {
        const firstChild = activeItem.firstChild;
        if (firstChild) {
          this.setActiveItem(firstChild);
        } else if (activeItem.nextSibling) {
          this.setActiveItem(activeItem.nextSibling);
        } else {
          this.setActiveItem(getParentNextSibling(activeItem));
        }
      }
    } else if (e.key ===  'ArrowLeft') {
      if (activeItem.expanded) {
        activeItem.expanded = false;
      } else {
        if (activeItem.parent && activeItem.parent instanceof AzTreeItem) {
          this.setActiveItem(activeItem.parent);
        } else if (activeItem.previousSibling) {
          this.setActiveItem(activeItem.previousSibling);
        }
      }
    } else if (e.key ===  'ArrowUp') {
      this.setNextActiveItem(MoveDirection.Up);
    } else if (e.key ===  'ArrowDown') {
      this.setNextActiveItem(MoveDirection.Down);
    } else if (e.key === 'Enter') {
      activeItem.checked = !activeItem.checked;
    }
    forceUpdate(this);
    if (e) {
      e.preventDefault();
    }
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
    return <Host onKeyDown={this.onKeyDown.bind(this)} tabindex="-1">
      <span class="az-tree__caption az-caption">{this.caption}</span>
      {this.items.map((c: AzTreeItem) => c.render())}
    </Host>
  }

  setNextActiveItem(dir: MoveDirection) {
    if (!this.activeItem) return;
    const activeItem = this.activeItem;
    let next: AzTreeItem;
    const isFirstChild = activeItem.isFirstChild;
    const isLastChild = activeItem.isLastChild;

    if (dir === MoveDirection.Up) {
      if (isFirstChild) {
        next = activeItem.parent;
      } else {
        if (isExpandAndHasChildren(activeItem.previousSibling)) {
          next = activeItem.previousSibling.lastChild
        } else {
          next = activeItem.previousSibling;
        }
      }
    } else if (dir === MoveDirection.Down) {
      if (activeItem.expanded && activeItem.items.length) {
        next = activeItem.firstChild;
      } else {
        if (isLastChild) {
          next = getParentNextSibling(activeItem)
        } else {
          next = activeItem.nextSibling;
        }
      }
    }
    if (next && next instanceof AzTreeItem) {
      this.setActiveItem(next);
    }
  }

  dispose() {
    this.items.forEach(it => it.remove());
  }
}

function getParentNextSibling(it: AzTreeItem) {
  if (!it || !it.parent) return null;
  if (!it.parent.nextSibling) {
    return getParentNextSibling(it.parent);
  } else {
    return it.parent.nextSibling;
  }
}

function isExpandAndHasChildren(item: AzTreeItem) {
  return item.expanded && item.items.length;
}
