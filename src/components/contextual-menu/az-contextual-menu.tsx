import { Component, Prop, Element, Host, Event, EventEmitter, h } from '@stencil/core';
import { ModifierCombinations } from '../../global/typing';
import { Inject, isModiferKeysPressed } from '../../utils';

@Component({
  tag: 'az-contextual-menu',
  styleUrl: 'az-contextual-menu.styl',
  shadow: false
})
export class AzContextMenu {
  @Element() el: HTMLElement;

  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) triggerevent: string = 'contextmenu';
  @Prop({reflect: true}) modifiers: ModifierCombinations = '';
  @Prop({reflect: true}) closeevent: string = 'blur';
  @Prop({reflect: true}) parent: string = 'body';
  @Prop({reflect: true, mutable: true}) popupalign: string = '';
  @Prop({reflect: true}) closedelay: number = 100;

  @Event() showed: EventEmitter;
  @Event() hidden: EventEmitter;
  isSubMenu: boolean = false;

  @Inject({
    sync: ['show', 'hide', 'items',  'insertItem', 'removeItem']
  })
  componentDidLoad() {
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    let parent = this.el.parentElement;
    if (parent.tagName === 'AZ-MENU-ITEM') {
      this.isSubMenu = true;
    }

    let hideTimer = -1;
    if (this.triggerevent) {
      parent.addEventListener(this.triggerevent, (e: MouseEvent) => {
        if (hideTimer !== -1) {
          window.clearTimeout(hideTimer)
          hideTimer = -1;
        }
        this.show(e);
        e.stopPropagation();
      });
    }
    if (this.closeevent) {
      parent.addEventListener(this.closeevent, () => {
        hideTimer = window.setTimeout(this.hide, this.closedelay);
      });
    }
    document.addEventListener('mouseup', (e: MouseEvent) => {
      if (e.which !== 3) this.hide()
    });
    this.el.addEventListener('selected', this.hide);

    if (!this.popupalign && !this.isSubMenu) {
      // menu without popupalign should be move to `parent(body)`
      // so that we can use e.pageX/Y when show
      parent = document.querySelector(this.parent);
      parent.appendChild(this.el);
    } else {
      // parent of menu with popupalign set should be relative positioned
      parent.style.position = 'relative';
    }
  }

  show(e: MouseEvent) {
    if (!isModiferKeysPressed(e, this.modifiers)) return;
    const styl = this.el.style;
    styl.display = 'flex';

    if (e && !this.isSubMenu && !this.popupalign) {
      styl.left = (e.pageX + 2) + 'px';
      styl.top = (e.pageY + 2) + 'px';
    }
    if (e) e.preventDefault();
    this.showed.emit(e);
  }

  hide() {
    this.el.style.display = 'none';
    this.hidden.emit();
  }

  items(includeSeparator: boolean = true) {
    return includeSeparator
      ? this.el.querySelectorAll('az-menu-item')
      : this.el.querySelectorAll('az-menu-item:not(.separator)');
  }

  insertItem(index: number, caption: string, icon?: string, action?: string, includeSeparator?: boolean) {
    const item = document.createElement('az-menu-item');
    item.caption = caption;
    item.icon = icon;
    item.action = action;

    const items = this.items(includeSeparator);
    if (index < 0) index = 0;
    if (index >= items.length) index = items.length - 1;
    return items[index].insertAdjacentElement('afterend', item);
  }

  removeItem(index: number, includeSeparator?: boolean) {
    const items = this.items(includeSeparator);
    if (index < 0) throw new RangeError('index must be greater than or equal to zero');
    if (index >= items.length) throw new RangeError('index must be less than items length');
    const item = items[index];
    item.parentNode.removeChild(item);
  }

  render() {
    return (
      <Host class={`az-context-menu ${this.popupalign}`}>
        <slot></slot>
      </Host>
    );
  }
}
