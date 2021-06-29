import { Component, Prop, Element, Host, Event, EventEmitter, h } from '@stencil/core';
import { Inject } from '../../utils';

@Component({
  tag: 'az-contextual-menu',
  styleUrl: 'az-contextual-menu.styl',
  shadow: false
})
export class AzContextMenu {
  @Element() el: HTMLElement;

  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) triggerevent: string = 'contextmenu';
  @Prop({reflect: true}) closeevent: string = '';
  @Prop({reflect: true}) parent: string = 'body';
  @Prop({reflect: true, mutable: true}) popupalign: string = 'bottom left';
  @Prop({reflect: true}) closedelay: number = 500;

  @Event() showed: EventEmitter;
  container: HTMLElement;

  @Inject({
    sync: ['show', 'hide', 'items',  'insertItem', 'removeItem']
  })
  componentDidLoad() {
    this.container = this.el.parentElement;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    let parent = this.el.parentElement;

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
        hideTimer = window.setTimeout(this.hide, this.closedelay);
      });
    }
    document.addEventListener('mouseup', (e: MouseEvent) => {
      if (e.which !== 3) this.hide()
    });
    this.el.addEventListener('selected', this.hide);

    if (this.parent != 'parent') {
      parent = document.querySelector(this.parent);
      parent.appendChild(this.el);
    } else {
      parent.style.position = 'relative';
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
