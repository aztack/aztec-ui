import { Component, Prop, Element, Watch, Host, h, Method, Event, EventEmitter} from '@stencil/core';
import { Inject } from '../../utils/utils';

export type TabItemConfig  = {
  caption?: string | '';
  icon?: string;
  closable?: boolean;
}
@Component({
  tag: 'az-tabs',
  styleUrl: 'az-tabs.styl',
  shadow: false
})
export class AzTabs {
  @Element() el: HTMLElement;

  @Prop() items: TabItemConfig[] = [];
  @Prop({attribute: 'active-index'}) activeIndex: number = 0;
  @Prop({reflect: true}) indicator: boolean = true;

  @Event() closed: EventEmitter;

  indicatorEl: HTMLDivElement;
  contentEl: HTMLElement;

  @Watch('activeIndex')
  onActiveIndexChanged(newIndex: number, oldIndex: number) {
    const slot = this.contentEl as HTMLElement;
    const children = slot.children;
    if (!children || children.length === 0) return;
    if (children[oldIndex]) children[oldIndex].classList.remove('visible');
    if (children[newIndex]) children[newIndex].classList.add('visible');

    const activeTab = this.el.querySelectorAll('li')[newIndex] as HTMLLIElement;
    if (activeTab) {
      const left = activeTab.offsetLeft;
      const width = activeTab.getBoundingClientRect().width;
      this.indicatorEl.style.left = `${left}px`;
      this.indicatorEl.style.width = `${width}px`;
    }
  }

  @Inject({
    after: true,
    attrs: false,
    parse: true
  })
  connectedCallback() {
    this.onActiveIndexChanged(this.activeIndex, 0);
  }

  @Method()
  async addItem(it: TabItemConfig | string) {
    let cfg: TabItemConfig = {caption: ''};
    if (typeof it === 'string') {
      cfg.caption = it;
    }
    this.items = [...this.items, cfg];
    this.render();
  }

  @Method()
  async removeItem(caption: string) {
    const pos = this.items.findIndex(item => item.caption === caption);
    this.items.splice(pos, 1);
    this.render();
  }

  @Method()
  async removeItemAt(index: number) {
    this.items.splice(index, 1);
    this.render();
  }

  closeItem(index: number) {
    const it = this.items[index];
    this.removeItemAt(index);
    let newIndex = index - 1;
    if (newIndex < 0) newIndex = 0;
    this.onActiveIndexChanged(newIndex, 0);
    this.closed.emit(it);
  }

  render() {
    const tabs = this.items.map((it: TabItemConfig, i: number) => {
      const cfg = toTabItemConfig(it);
      return (
        <li
          class={{active: this.activeIndex === i, closable: cfg.closable}}
          onClick={() => this.activeIndex = i}>
          {cfg.icon && <az-icon icon={cfg.icon}></az-icon>}
          {cfg.caption && <span class="az-caption az-tabs__caption">{cfg.caption}</span>}
          {cfg.closable && <az-icon icon="close" class="extra-small" width="8" height="8" onClick={() => this.closeItem(i)}></az-icon>}
        </li>
      );
    });
    return <Host>
      <div class="az-tabs__tabs">
        <ul>
          {tabs}
          <div ref={el => this.indicatorEl = el} class="az-tabs__indicator"></div>
        </ul>
      </div>
      <div class="az-tabs__content" ref={el => this.contentEl = el}>
        <slot></slot>
      </div>
    </Host>;
  }
}

function toTabItemConfig (it: TabItemConfig | string) {
  if (typeof it === 'string') {
    return {caption: it};
  } if ('caption' in it || 'icon' in it) {
    return it;
  }
  throw new Error(`<az-tab> item requires at lease one of 'caption' or 'icon' must be provide, but got ${JSON.stringify(it)}`);
}