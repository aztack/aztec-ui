import {
    Component, Element, Event, EventEmitter, forceUpdate, h, Host, Method, Prop
} from '@stencil/core';

import { PositionHorizontal } from '../../global/typing';
import { getCaptionWithIcon, getInternalInstance, Inject } from '../../utils';
import { AzTreeItem, AzTreeItemField, IAzTreeItem } from './az-tree-item';

enum MoveDirection {
  Up = -1,
  Down = 1,
}

export type TreeItemVisitor = (item: AzTreeItem) => boolean | void;

const debug = process.env.NODE_ENV === 'development';
const log = debug ? console.log.bind(console) : () => {};

export interface SerializeOptions {
  filter?: AzTreeItemField | AzTreeItemField[],
  recursive?: boolean,
  asString?: boolean,
  noEmptyItems?: boolean
}

@Component({
  tag: 'az-tree',
  styleUrl: 'az-tree.styl',
  shadow: false
})
export class AzTree {
  static DefaultSerializeOptions: SerializeOptions = {
    recursive: true,
    filter: 'caption',
    noEmptyItems: true
  };
  @Element() el: HTMLElement;
  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) icon: string;
  @Prop({reflect: true}) iconPosition: PositionHorizontal = 'left';
  @Prop({reflect: true}) selecting: boolean = false;
  @Prop({mutable: true}) items: AzTreeItem[] = [];
  @Prop({mutable: true}) checkedItems: Set<AzTreeItem> = new Set<AzTreeItem>();
  @Prop({mutable: true}) activeItem: AzTreeItem = null;
  @Prop({reflect: true}) itemDraggable: boolean = false;
  @Prop({reflect: true}) activeOnMiddleButtonDown: boolean = true;
  @Prop({reflect: true}) DndDataType: string = 'application/json';

  @Event() selected: EventEmitter;
  @Event() expanded: EventEmitter;
  @Event() collapsed: EventEmitter;
  @Event() inserted: EventEmitter;
  @Event() itemdrop: EventEmitter;
  @Event() itemdragover: EventEmitter;
  @Event() itemremoving: EventEmitter;
  @Event() itemremoved: EventEmitter;

  draggingEl: HTMLElement | null = null;
  dragOverEl: HTMLElement | null = null;
  lastDragOverEl: HTMLElement | null = null;
  lastDropEl: HTMLElement | null = null;
  action: string = '';


  @Inject({})
  componentDidLoad() {
    this.setNextActiveItem = this.setNextActiveItem.bind(this);

    //Drag and drop
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  @Method()
  async addItem(itemOrCaption: AzTreeItem | string, parent: AzTreeItem | number = null, attrs: any = {}) {
    let item: AzTreeItem;
    if (typeof itemOrCaption === 'string') {
      item = new AzTreeItem();
      item.caption = itemOrCaption;
      item.draggable = this.itemDraggable;
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
    if (item.active) this.activeItem = item;
    this.inserted.emit(item);
    this._forceUpdate();
    return item;
  }

  _forceUpdate() {
    forceUpdate(this);
  }

  @Method()
  async fromJson(items: IAzTreeItem[]) {
    this.items = items.map(it => {
      const treeItem = new AzTreeItem();
      treeItem.tree = this;
      treeItem.draggable = this.itemDraggable;
      treeItem.fromJson(it, this, treeItem.level + 1);
      return treeItem;
    });
    this.activeItem = null;
    this.checkedItems.clear();
  }

  @Method()
  async toJson(opts: SerializeOptions = AzTree.DefaultSerializeOptions) {
    const mergedOpts = Object.assign({}, AzTree.DefaultSerializeOptions, opts);
    return this.items.map(it => it.toJson(mergedOpts));
  }

  @Method()
  async removeItem(indexOrItem: number | AzTreeItem) {
    let index: number;
    if (typeof indexOrItem === 'number') {
      index = indexOrItem;
    } else {
      index = this.items.indexOf(indexOrItem);
    }

    if (index < 0) {
      if (process.env.NODE_ENV) {
        console.warn(`You are trying to remove an orphan tree item`);
      }
      return;
    }

    const removed = this.items.splice(index, 1)[0];
    if (removed) {
      this.checkedItems.delete(removed);
      this.itemremoved.emit(removed[0]);
    }
    this._forceUpdate();
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
    } else {
      return;
    }
    forceUpdate(this);
    if (e) {
      e.preventDefault();
    }
  }

  @Method()
  async find(predicate: TreeItemVisitor) {
    let ret = null;
    traverse(this.items, it => {
      if (predicate(it) === true) {
        ret = it;
        return true;
      }
    });
    return ret;
  }

  @Method()
  async findAll(predicate: TreeItemVisitor) {
    let ret = [];
    traverse(this.items, it => {
      if (predicate(it) === true) {
        ret.push(it);
      }
    });
    return ret;
  }

  @Method()
  async expandAll(level: number) {
    traverse(this.items, it => {
      if (typeof level === 'number') {
        if (it.level > level) return true;
        it.expanded = it.level <= level;
      }
      it.expanded = true;
    });
    this._forceUpdate();
  }

  @Method()
  async collapsAll() {
    traverse(this.items, it => {
      it.expanded = false;
    });
    this._forceUpdate();
  }

  @Method()
  async traverse(visit: TreeItemVisitor) {
    traverse(this.items, visit);
  }

  onDragStart(e: DragEvent) {
    this.draggingEl = /*@__INLINE__*/closestTreeItem(e);
    this.dragOverEl = this.draggingEl;
    const data = asTreeItem(this.draggingEl).toJson({recursive: true, asString: true}) as string;
    e.dataTransfer.setData(this.DndDataType, data);
    e.dataTransfer.effectAllowed = (e.metaKey || e.ctrlKey) ? 'copy' : 'move';
    log('dragstart', this.draggingEl['caption']);
  }

  onDragEnter(e: DragEvent) {
    if (!targetIsTreeItemCaption(e.target)) return;
    if (targetIsIcon(e.relatedTarget)) return;
    if (!this.hasDndData(e)) return;
    const item = closestTreeItem(e);
    this.lastDragOverEl = this.dragOverEl;
    this.dragOverEl = item;
    this._forceUpdate();
    log('dragenter', this.dragOverEl['caption'], e);
  }

  onDragOver(e: DragEvent) {
    if (this.dragOverEl === this.draggingEl) return;

    e.preventDefault();
    const toCaption = targetIsTreeItemCaption(e.target);
    const fromIcons = targetIsIcon(e.relatedTarget);

    // ignore dragover from icons(inside the caption) to caption
    if (toCaption && fromIcons) return;

    const toActionIcon = targetIsIcon(e.target, ['new-child-node', 'new-sibling-node']);
    if (toCaption || toActionIcon) {
      e.dataTransfer.dropEffect = (e.metaKey || e.ctrlKey) ? 'copy' : 'move';
      if (typeof toActionIcon === 'string') this.action = toActionIcon;
      this.itemdragover.emit({event: e, tree: this, item: this.dragOverEl});

      // set dragover indicating border on tree item
      setDragOver(this.dragOverEl, true);
      this._forceUpdate();
    }
  }

  onDragLeave(e: DragEvent) {
    if (!targetIsTreeItemCaption(e.target)) return;

    // remove dragover indicating border on tree item
    setDragOver(this.lastDragOverEl, false);
    this._forceUpdate();
  }

  onDragEnd(/*e: DragEvent*/) {
    // remove dragover indicating border on tree item
    setDragOver(this.dragOverEl, false);
    setDragOver(this.lastDragOverEl, false);

    // clear action
    this.action = '';
    this._forceUpdate();
  }

  onDrop(e: DragEvent) {
    const data = e.dataTransfer.getData(this.DndDataType);
    const item = closestTreeItem(e);
    this.lastDropEl = item;
    const action = this.action || 'new-child-node';

    log('drop', action, this.lastDropEl['caption'], this.draggingEl['caption']);
    const draggingItem = getInternalInstance<AzTreeItem>(this.draggingEl).removeSelf(false);
    if(action === 'new-child-node') {
      getInternalInstance<AzTreeItem>(this.lastDropEl).addItem(draggingItem);
    } else if (action === 'new-sibling-node') {
      getInternalInstance<AzTreeItem>(this.lastDropEl).parent.addItem(draggingItem);
    }

    setDragOver(this.lastDropEl, false);
    this.draggingEl = null;

    this.itemdrop.emit({data, event: e, tree: this, item});
    e.stopPropagation();
    this._forceUpdate();
  }

  render() {
    const caption = getCaptionWithIcon(this.caption, this.icon, this.iconPosition);
    const cls = {
      'az-tree__item-draggable': this.itemDraggable
    }
    return <Host onKeyDown={this.onKeyDown.bind(this)} class={cls} tabindex="-1">
      {caption}
      {this.items.map(((c: AzTreeItem, index) => c.render(index)))}
    </Host>
  }

  dispose() {
    this.dragOverEl = null;
    this.draggingEl = null;
    this.lastDragOverEl = null;
    this.lastDropEl = null;
    this.items.forEach(it => it.removeSelf());
  }

  private setNextActiveItem(dir: MoveDirection) {
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

  private hasDndData(e: DragEvent) {
    return e.dataTransfer
      && Array.prototype.filter.call(e.dataTransfer.items, (it: DataTransferItem) => {
        return it.type === this.DndDataType;
      });
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

function traverse(items: AzTreeItem[], visit: TreeItemVisitor) {
  let ret = false;
  for (let it of items) {
    ret = !!visit(it);
    if (ret) break;
    if (it.items.length) {
      ret = traverse(it.items, visit);
    }
    if (ret) break;
  }
  return ret;
}

function closestTreeItem(e: DragEvent) {
  return (e.target as HTMLElement).closest('az-tree-item') as HTMLElement;
}

function setDragOver(e: HTMLElement, val: boolean) {
  if (!e) return;
  const it = /*@__INLINE__*/asTreeItem(e);
  if (it) it.dragover = val;
}

function asTreeItem(e: HTMLElement) {
  return /*@__INLINE__*/getInternalInstance<AzTreeItem>(e);
}

function targetIsIcon(e: EventTarget, names?: string[]) {
  if (!e) return false;
  const el = e as HTMLAzIconElement;
  return names ? names.find(name => name === el.icon) : !!el.icon;
}

function targetIsTreeItemCaption(el: EventTarget) {
  return (el as HTMLElement).classList.contains('az-tree-item__caption');
}
