import { Component, Prop, Element, Host, h} from '@stencil/core';
import builtinIcons from './builtin';
import { exportToGlobal, Inject, join } from '../../utils';
import { forceUpdate, JSXBase } from '@stencil/core/internal';
const eventBus = document.createElement('div');
const RegisterIconEvent = 'registericon';

type SVGAttributes = JSXBase.SVGAttributes<SVGElement>;
@Component({
  tag: 'az-icon',
  styleUrl: 'az-icon.styl',
  shadow: false
})
export class AzIcon {
  static icons = Object.keys(builtinIcons).reduce((all, name: string) => {
    all[name] = svgIcon(builtinIcons[name] as string);
    return all;
  }, {});

  @Element() el: HTMLElement;
  @Prop() caption: string = '';
  @Prop() icon: string = '';
  @Prop() width: number | string = 12;
  @Prop() height: number | string = 12;
  @Prop() color: string = 'var(--az-caption-color)';
  @Prop() register: boolean = false;
  @Prop() wait: boolean = false;
  @Prop() tag: string = '';
  @Prop() hoverEffect: 'border' | 'background' | string | undefined;
  @Prop({mutable: true}) svgAttr: Record<string, string> = {};

  waitIconName: string = '';
  loaded: boolean = false;

  @Inject({
    parse: true
  })
  componentWillLoad() {
    this.loaded = !!AzIcon.icons[this.icon];
    if (this.register && this.icon) {
      registerIcon(this.icon, this.el.textContent);
    }
    this.onRegisterIcon = this.onRegisterIcon.bind(this);
  }

  onRegisterIcon(e: CustomEvent) {
    if (e.type === RegisterIconEvent && e.detail === this.waitIconName) {
      eventBus.removeEventListener(RegisterIconEvent, this.onRegisterIcon);
      this.loaded = true;
      if (process.env.NODE_ENV) {
        console.log(`Got icon ${e.detail}, force update`);
      }
      forceUpdate(this);
    }
  }

  render () {
    if (this.register && this.icon) {
      return null;
    }
    let icon = AzIcon.icons[this.icon];
    if (typeof icon === 'undefined') {
      if (!this.wait) {
        throw new Error(`Can not find icon "${this.icon}"`);
      } else {
        icon = AzIcon.icons['loading'];
        this.waitIconName = this.icon;
        eventBus.addEventListener(RegisterIconEvent, this.onRegisterIcon);
      }
    }
    const effect = this.hoverEffect ? join(this.hoverEffect, 'az-effect-') : '';
    const anim = (!this.loaded) ? 'loading' : this.icon;
    return <Host class={`az-icon az-icon-${this.icon} az-anim-${anim} ${effect}`}>
      {this.caption && <span class="az-button-caption az-caption">{this.caption}</span>}
      <slot name="before"></slot>
      {icon(this.width, this.height, this.svgAttr.fill || this.color, this.svgAttr)}
      <slot name="after"></slot>
    </Host>;
  }
}

function svgIcon(d: string | string[] | SVGElement) {
  return (width: string, height: string, fill: string, props?: SVGAttributes) => {
    let data;
    if (d instanceof SVGElement) {
      if (width != null) width = d.getAttribute('width');
      if (height != null) height = d.getAttribute('height');
      if (fill != null) fill = d.getAttribute('fill');
      data = d.innerHTML;
    } else {
      data = (Array.isArray(d) ? d : [d]).map(p => {
        return <path fill={fill} d={p}></path>
      });
    }
    return <svg class="icon" xmlns="http://www.w3.org/2000/svg"
      width={width} height={height} {...props} viewBox="0 0 1024 1024">
      {data}
    </svg>
  };
}

function registerIcon(name: string, data: string | Function | SVGElement) {
  AzIcon.icons[name] = data instanceof Function ? data : svgIcon(data);
  const event = new CustomEvent(RegisterIconEvent, { detail: name });
  eventBus.dispatchEvent(event);
  if (process.env.NODE_ENV) {
    console.log(`Register icon '${name}'`);
  }
}

function aliasIcon(origin: string, alias: string) {
  if (!AzIcon.icons[origin]) throw new Error(`No icon named ${origin}`);
  if (AzIcon.icons[alias]) throw new Error(`Icon ${alias} already defined`);
  AzIcon.icons[alias] = AzIcon.icons[origin];
}

function deleteIcon(name: string) {
  delete AzIcon.icons[name];
}

function renameIcon(origin: string, alias: string) {
  aliasIcon(origin, alias);
  deleteIcon(origin);
}

exportToGlobal('registerIcon', registerIcon);
exportToGlobal('aliasIcon', aliasIcon);
exportToGlobal('deleteIcon', deleteIcon);
exportToGlobal('renameIcon', renameIcon);
