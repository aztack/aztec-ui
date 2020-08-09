import { Component, Prop, Element, h, Host } from '@stencil/core';

@Component({
  tag: 'az-tooltip',
  styleUrl: 'az-tooltip.styl',
  shadow: false
})
export class AzTooltip {
  @Element() el: HTMLElement;

  @Prop({reflect: true}) placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) trigger: 'hover' | 'click' | 'manual' = 'hover';
  @Prop({reflect: true}) isShow: boolean = false;
  @Prop({reflect: true}) delay: number = 0;
  popover: HTMLElement;
  container: HTMLElement;
  timerId: number;

  componentDidLoad() {
    this.el.classList.add(this.placement);
    this.container = this.el.parentElement;
    this.el.parentElement.style.position = 'relative';

    this.onMouseEnterContainer = this.onMouseEnterContainer.bind(this);
    this.onMouseLeaveContainer = this.onMouseLeaveContainer.bind(this);
    this.onClickContainer = this.onClickContainer.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);

    this.el.style.display = this.isShow ? '' : 'none';
    this.bind();
  }

  bind() {
    this.container.addEventListener('click', this.onClickContainer);
    this.container.addEventListener('mouseenter', this.onMouseEnterContainer);
    this.container.addEventListener('mouseleave', this.onMouseLeaveContainer);
    document.addEventListener('click', this.onClickOutside);
  }

  onMouseEnterContainer() {
    if (this.trigger !== 'hover') return;
    this.show();
  }
  onMouseLeaveContainer() {
    if (this.trigger !== 'hover') return;
    this.hide();
  }
  onClickContainer(e: MouseEvent) {
    if (this.trigger !== 'click' && this.trigger !== 'manual') return;
    this.toggle();
    e.stopPropagation();
  }
  onClickOutside() {
    if (this.trigger === 'manual') return;
    this.hide();
  }

  toggle(force: boolean | undefined = undefined) {
    const s = this.el.style;
    const condition = typeof force === 'undefined'
      ? s.display === 'none'
      : force;
    const val = condition ? '' : 'none';
    s.display = val;
  }

  show () {
    if (this.delay > 0) {
      this.timerId = window.setTimeout(() => this.toggle(true), this.delay);
    } else {
      this.toggle(true);
    }
  }
  hide() {
    window.clearTimeout(this.timerId);
    this.timerId = 0;
    this.toggle(false);
  }

  render() {
    return (
      <Host class="az-tooltip">
        {this.caption}
        <slot></slot>
      </Host>
    );
  }
}