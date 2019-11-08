import { Component, Prop, Element, Host, Event, EventEmitter, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { Inject } from '../../utils/utils';

@Component({
  tag: 'az-context-menu',
  styleUrl: 'az-context-menu.styl',
  shadow: false
})
export class AzContextMenu {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop() triggerevent: string = 'contextmenu';
  @Prop() closeevent: string = '';
  @Prop() parent: string = 'body';
  @Prop() popupalign: string = '';

  @Event() showed: EventEmitter;
  container: HTMLElement;

  @Inject({
    sync: ['show', 'hide', 'items',  'insertItem', 'removeItem']
  })
  componentDidLoad() {
    this.container = this.el.parentElement;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    const parent = this.el.parentElement;

    let hideTimer = -1;
    if (this.triggerevent) {
      parent.addEventListener(this.triggerevent, (e: MouseEvent) => {
        if (hideTimer !== -1) {
          window.clearTimeout(hideTimer)
          hideTimer = -1;
        }
        this.show(e);
      });
    }
    if (this.closeevent) {
      parent.addEventListener(this.closeevent, () => {
        hideTimer = window.setTimeout(this.hide, 100);
      });
    }
    document.addEventListener('mouseup', (e: MouseEvent) => {
      if (e.which !== 3) this.hide()
    });
    this.el.addEventListener('selected', this.hide);

    if (this.parent != 'parent') {
      let parent = document.querySelector(this.parent);
      parent.appendChild(this.el);
    } else {
      parent.style.position = 'relative';
      if (!this.popupalign) this.popupalign = 'bottom left';
    }
  }

  show(e: MouseEvent) {
    const styl = this.el.style;
    styl.display = 'flex';
    if (e && !this.popupalign) {
      styl.left = e.pageX + 'px';
      styl.top = e.pageY + 'px';
      e.preventDefault();
    }
    this.showed.emit(e);
  }

  hide() {
    this.el.style.display = 'none';
  }

  items(includeSeparator: boolean = true) {
    return includeSeparator ? this.el.querySelectorAll('az-menu-item') : this.el.querySelectorAll('az-menu-item:not(.separator)');
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
    if (index >= items.length) throw new RangeError('index must be less than or equal to items length');
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