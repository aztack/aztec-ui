import { Component, Prop, Element, Host, Event, EventEmitter, h } from '@stencil/core';
import { ComponentStyle } from '../../global/typing';
import { Inject } from '../../utils';

@Component({
  tag: 'az-menu-item',
  styleUrl: 'az-menu-item.styl',
  shadow: false
})
export class AzMenuItem {
  @Element() el: HTMLElement;

  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) icon: string = '';
  @Prop({reflect: true}) action: string = '';
  @Prop({reflect: true}) type: ComponentStyle = 'plain';
  @Prop({reflect: true}) extraIcon: string = '';
  @Prop({reflect: true}) extraText: string = '';

  @Event() selected: EventEmitter;

  constructor() {
    this.onClick = this.onClick.bind(this);
  }

  @Inject({})
  componentDidLoad() {}

  onClick() {
    this.selected.emit(this.action);
  }

  render() {
    if (this.caption === '-') {
      return <Host class="az-menu-item az-menu-item__separator separator"></Host>
    }
    let extra = null;
    if (this.extraIcon) extra = <az-icon icon={this.extraIcon}></az-icon>;
    if (this.extraText) extra = <span>{this.extraText}</span>;
    return (
      <Host class={`az-menu-item ${this.type}`} onClick={this.onClick}>
        {this.icon && <az-icon icon={this.icon} />}
        <span class="az-caption" title={this.caption}>{this.caption}</span>
          <span class="az-menu-item__extra">
            {extra || <slot name="extra"></slot>}
          </span>
      </Host>
    );
  }
}
