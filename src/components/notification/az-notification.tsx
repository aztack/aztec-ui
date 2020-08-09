import { Component, Prop, Element, Host, Event, EventEmitter, h, Method } from '@stencil/core';
import { Inject, exportToGlobal } from '../../utils/utils';
import { ComponentStyle, Placement } from '../../global/typing';

export type NotificationCreateOptions = {
  type?: ComponentStyle;
  caption: string | '';
  message: string;
  html?: string;
  placement?: Placement;
  timeout?: number;
  closable?: boolean;
}

export type ButtonConfig = {
  caption: string;
  action ?: string;
  icon ?: string
};

function getDefaultNotificationCreateOptions(): NotificationCreateOptions {
  return {
    type: 'info',
    caption: '',
    message: '',
    placement: 'top-right',
    timeout: 3000,
    closable: true
  };
}

@Component({
  tag: 'az-notification',
  styleUrl: 'az-notification.styl',
  shadow: false
})
export class AzNotification {
  static plain(caption: string, message: string, placement: Placement = 'top-left', timeout: number = 3000) {
    return AzNotification.create({type: 'plain', caption, message, placement, timeout});
  }
  static success(caption: string, message: string, placement: Placement = 'top-left', timeout: number = 3000) {
    return AzNotification.create({type: 'success', caption, message, placement, timeout});
  }
  static info(caption: string, message: string, placement: Placement = 'top-left', timeout: number = 3000) {
    return AzNotification.create({type: 'info', caption, message, placement, timeout});
  }
  static warning(caption: string, message: string, placement: Placement = 'top-left', timeout: number = 3000) {
    return AzNotification.create({type: 'warning', caption, message, placement, timeout});
  }
  static danger(caption: string, message: string, placement: Placement = 'top-left', timeout: number = 3000) {
    return AzNotification.create({type: 'danger', caption, message, placement, timeout});
  }
  static error(caption: string, message: string, placement: Placement = 'top-left', timeout: number = 3000) {
    return AzNotification.create({type: 'danger', caption, message, placement, timeout});
  }
  static toast(message: string, timeout: number = 3000) {
    return AzNotification.create({type: 'plain', caption: '', message, placement: 'bottom-center', timeout, closable: false});
  }
  static create(opts: NotificationCreateOptions) {
    const noti = document.createElement(`az-notification`) as HTMLAzNotificationElement;
    let mergedOpts = Object.assign(getDefaultNotificationCreateOptions(), opts);
    return appendToPlacmentContainer(opts.placement, Object.assign(noti, mergedOpts));
  }
  @Element() el: HTMLElement;

  @Prop({reflect: true}) caption: string = '';
  @Prop() message: string = '';
  @Prop({reflect: true}) type: ComponentStyle = 'primary';
  @Prop({reflect: true}) icon: string = '';
  @Prop({reflect: true}) placement: Placement = 'top-right';
  @Prop({reflect: true}) timeout: number = 3000;
  @Prop({reflect: true}) indicator: boolean = true;
  @Prop({reflect: true}) closable: boolean = true;
  @Prop() buttons: ButtonConfig[] = [];
  @Prop() html:string = '';

  indicatorEl: HTMLDivElement;

  @Event() showed: EventEmitter;
  @Event() closed: EventEmitter;

  @Inject({})
  componentDidLoad() {
    this.setIcon();
    this.close = this.close.bind(this);
    if (!isNaN(this.timeout) && this.timeout !== Infinity && this.timeout >= 0) {
      window.setTimeout(this.close, this.timeout);
      if (this.indicatorEl) {
        this.indicatorEl.style.transitionDuration = `${this.timeout}ms`;
        this.indicatorEl.style.webkitTransitionDuration = `${this.timeout}ms`;
        this.indicatorEl.style.width = '0';
      }
    } else {
      this.indicatorEl.style.display = 'none';
    }
  }

  setIcon() {
    if (this.icon) return;
    switch(this.type) {
      case "success":
        this.icon = 'circle-check';
        break;
      case "info":
      case "warning":
        this.icon = 'circle-exclamation';
          break;
      case "danger":
        this.icon = 'circle-cross';
        break;
      default:
        this.icon = '';
    }
  }

  @Method()
  async show() {
    appendToPlacmentContainer(this.placement, this.el as HTMLAzNotificationElement);
  }

  @Method()
  async close(reason: string = 'close') {
    if (!this.el.isConnected) return;
    this.closed.emit(reason);
    this.el.style.animationName = 'az-up-fade-out';
    this.el.style.animationPlayState = 'running';
    this.el.addEventListener('animationend', () => {
      const parentNode = this.el.parentNode as HTMLElement;
      if (parentNode) parentNode.removeChild(this.el);
      if (!parentNode.children.length) {
        parentNode.remove();
      }
    });
  }

  render() {
    const buttons = this.buttons.map((config: ButtonConfig) => {
      return (
        <az-button class="mini"
          onClick={() => this.close(config.action)}
          caption={config.caption}
          icon={config.icon}>
        </az-button>
      )
    });
    const content = this.html ? <div innerHTML={this.html}></div> : <div>{this.message}</div>;
    return (
      <Host class={`az-notification ${this.type}`}>
        <slot name="caption">
          {(this.caption || this.closable) && <div class="az-notification__head">
            {this.icon && <az-icon class="icon" icon={this.icon} width={32} height={32}></az-icon>}
            <span class="az-caption az-notification__caption">{this.caption}</span>
            {this.closable && <az-button type="plain" size="small" icon="close" class="close-icon" onClick={() => this.close()}></az-button>}
          </div>}
        </slot>
        <div class="az-notification__message">
          <slot>{content}</slot>
        </div>
        {buttons.length > 0 && <div class="az-notification__footer">
          <slot name="footer">{buttons}</slot>
        </div>}
        {this.indicator && <div class="az-notification__indicator" ref={el => this.indicatorEl = el}></div>}
      </Host>
    );
  }
}

function appendToPlacmentContainer(placement: Placement = 'top-right', noti: HTMLAzNotificationElement) {
  const selector = `.az-notification-container.az-notification__${placement}`;
  let ctn = document.querySelector(selector) as HTMLDivElement;
  if (!ctn) {
    ctn = document.createElement('div');
    ctn.classList.add('az-notification-container', `az-notification__${placement}`);
    document.body.appendChild(ctn);
  }
  let anim = 'left-fade-in';
  switch (placement) {
    case 'top-left':
    case 'bottom-left':
      anim = 'az-right-fade-in'
      break;
    case 'top-center':
      anim = 'az-bottom-fade-in';
      break;
    case 'bottom-center':
      anim = 'az-top-fade-in';
      break;
    case 'left-center':
      anim = 'az-right-fade-in';
      break;
    case 'center':
      anim = 'az-top-fade-in';
      break;
    default:
      anim = 'az-left-fade-in';
  }
  noti.style.animationName = anim;
  if (placement.indexOf('top') >= 0) {
    ctn.prepend(noti);
  } else {
    ctn.append(noti);
  }
  return noti;
}

exportToGlobal('Notification', AzNotification);