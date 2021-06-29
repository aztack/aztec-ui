import { Component, Prop, Element, Host, h} from '@stencil/core';
import builtinIcons from './builtin';
import { exportToGlobal, Inject } from '../../utils';
import { JSXBase } from '@stencil/core/internal';

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
  @Prop() icon: string = '';
  @Prop() width: number | string = 12;
  @Prop() height: number | string = 12;
  @Prop() color: string = 'white';
  @Prop() register: boolean = false;
  @Prop({mutable: true}) svgAttr: Record<string, string> = {};

  @Inject({
    parse: true
  })
  componentWillLoad() {
    if (this.register && this.icon) registerIcon(this.icon, this.el.textContent);
  }

  render () {
    if (this.register && this.icon) {
      return null;
    }
    const icon = AzIcon.icons[this.icon];
    if (typeof icon === 'undefined') {
      throw new Error(`Can not find icon "${this.icon}"`);
    }
    return (
      <Host class={`az-icon az-icon-${this.icon} az-anim-${this.icon}`}>
        {icon(this.width, this.height, this.svgAttr.fill || this.color, this.svgAttr)}
      </Host>
    );
  }
}

function svgIcon(d: string | string[]) {
  return (width: number, height: number, fill: string, props?: SVGAttributes) => {
    const paths = (Array.isArray(d) ? d : [d]).map(p => {
      return <path fill={fill} d={p}></path>
    });
    return (
      <svg class="icon" xmlns="http://www.w3.org/2000/svg"
        width={width} height={height} {...props} viewBox="0 0 1024 1024">
        {paths}
      </svg>
    );
  };
}

function registerIcon(name: string, dOrFn: string | Function) {
  AzIcon.icons[name] = typeof dOrFn === 'string' ? svgIcon(dOrFn) : dOrFn;
}

function aliasIcon(origin: string, alias: string) {
  if (!AzIcon.icons[origin]) throw new Error(`No icon named ${origin}`);
  if (AzIcon.icons[alias]) throw new Error(`Icon ${alias} already defined`);
  AzIcon.icons[alias] = AzIcon.icons[origin];
}

exportToGlobal('registerIcon', registerIcon);
exportToGlobal('aliasIcon', aliasIcon);
