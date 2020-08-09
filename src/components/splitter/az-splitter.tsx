import { Component, Prop, Element, Host, h } from '@stencil/core';
import { draggable } from '../../utils/draggable';

const minMaxReg = /^([0-9]+%) ([0-9]+px)$|^([0-9]+px) ([0-9]+%)$|^([0-9]+%)$|^([0-9]+px)$/;
@Component({
  tag: 'az-splitter',
  styleUrl: 'az-splitter.styl',
  shadow: false
})
export class AzSpliter {
  @Element() el: HTMLElement;

  @Prop({reflect: true}) direction: 'horizontal' | 'vertical' = 'vertical';
  @Prop({reflect: true}) disabled: boolean = false;
  @Prop({reflect: true}) gap: number = 4;

  childrenEles: HTMLElement[] = [];
  dragging: boolean = false;
  childBefore: HTMLElement;
  childAfter: HTMLElement;

  componentDidLoad() {
    // this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDownHandle = this.onMouseDownHandle.bind(this);

    this.childrenEles = Array.from(this.el.children) as HTMLElement[];
    const r = (100 / this.childrenEles.length).toFixed(6) + '%';
    const prop = this.direction === 'vertical' ? 'height' : 'width';
    this.childrenEles.forEach((child: HTMLElement, index: number) => {
      const w = child.style[prop] || child.style.flexBasis;
      child.style.flex = `0 0 ${w || r}`;
      if (index === this.childrenEles.length - 1) return;
      const handle = document.createElement('div');
      handle.classList.add('handle');
      handle.removeEventListener('mousedown', this.onMouseDownHandle);
      handle.addEventListener('mousedown', this.onMouseDownHandle);
      this.el.addEventListener('mouseup', () => handle.classList.remove('active'));
      child.after(handle);
      this.calculateHandlePosition(handle);
      draggable(handle, handle, {direction: this.direction, initFromStyle: false, onRelease: () => {
        this.calculateHandlePosition(handle, true);
      }, onMove: (_: MouseEvent, x: number, y: number) => {
        return this.onHandleMove(index, x, y);
      }});
    });

    if (this.direction === 'vertical' && this.el.style.height === '') {
      this.el.style.height = `${this.el.getBoundingClientRect().height}px`;
    }
  }

  onHandleMove(index: number, left: number, top: number) {
    const prop = this.direction === 'vertical' ? 'Top' : 'Left';
    const pos = this.handles((h: HTMLDivElement) => h[`offset${prop}`]) as number[];
    pos[index] = this.direction === 'vertical' ? top : left;
    const checkPanel = (panel: HTMLElement, index: number) => {
      const p = this.direction === 'vertical' ? 'Height' : 'Width';
      const total = this.el[`client${p}`];
      const width = widthOf(index, pos, total);
      return this.isWithin(panel[`min${p}`], panel[`max${p}`], width, total);
    };

    if (!checkPanel(this.childrenEles[index], index)) return false;
    if (!checkPanel(this.childrenEles[index + 1], index + 1)) return false;
    return true;
  }

  isWithin(min: string = '', max: string = '', value: number, total: number) {
    let m;
    min = min.trim();
    if (min && (m = min.match(minMaxReg))) {
      if (m[5]) {
        // a%
        const r = Math.floor(value / total * 100);
        if (r <= parseInt(m[5], 10)) return false;
      } else if (m[6]) {
        // ?px
        if (value < parseInt(m[6], 10)) return false
      } else if (m[1] && m[2]) {
        // n% ?px
        const r = parseInt(m[1], 10) / 100;
        const px = total * r;
        if (value < px) return false;
        const n = parseInt(m[2], 10);
        if (value < n) return false;
      } else if (m[3] && m[4]) {
        // npx n%
        const n = parseInt(m[3], 10);
        if (value < n) return false;
        const r = parseInt(m[4], 10) / 100;
        const px = total * r;
        if (value < px) return false;
      }
    }
    max = max.trim();
    if (max && (m = max.match(minMaxReg))) {
      if (m[5]) {
        // a%
        const r = Math.floor(value / total * 100);
        if (r > parseInt(m[5], 10)) return false;
      } else if (m[6]) {
        // ?px
        if (value > parseInt(m[6], 10)) return false
      } else if (m[1] && m[2]) {
        // n% ?px
        const r = parseInt(m[1], 10) / 100;
        const px = total * r;
        if (value > px) return false;
        const n = parseInt(m[2], 10);
        if (value < n) return false;
      } else if (m[3] && m[4]) {
        // npx n%
        const n = parseInt(m[3], 10);
        if (value > n) return false;
        const r = parseInt(m[4], 10) / 100;
        const px = total * r;
        if (value > px) return false;
      }
    }
    return true;
  }

  calculateHandlePosition(handle: HTMLElement, usePx = false) {
    const styl = handle.style;
    const prev = handle.previousElementSibling as HTMLElement;

    // set handle position
    Promise.resolve().then(() => {
      if (this.direction === 'vertical') {
        const total = this.el.offsetHeight;
        const pos = usePx ? handle.offsetTop : prev.offsetTop + prev.offsetHeight - this.gap / 2;
        styl.height = `${this.gap}px`;
        const percent = pos / total * 100;
        styl.top = `${percent.toFixed(6)}%`;
      } else {
        const total = this.el.offsetWidth;
        const pos = usePx ? handle.offsetLeft : prev.offsetLeft + prev.offsetWidth - this.gap / 2;
        styl.width = `${this.gap}px`;
        const percent = pos / total * 100;
        styl.left = `${percent.toFixed(6)}%`;
      }
    });

    // transform px into flex percentage
    window.setTimeout(() => {
      const prop = this.direction === 'vertical' ? 'top' : 'left';
      const pos = this.handles((h: HTMLDivElement) => parseFloat(h.style[prop])) as number[];
      if (pos.some(isNaN)) return;
      this.childrenEles.forEach((child: HTMLElement, index: number) => {
        child.style.flexBasis = `${widthOf(index, pos)}%`;
      });
    }, 0);
  }

  handles<T = number>(block?: (it: HTMLElement) => T) {
    const handles = Array.from(this.el.children).filter(e => e.classList.contains('handle')) as HTMLElement[];
    return block ? handles.map(block) : handles;
  }

  onMouseDownHandle(e: MouseEvent) {
    (e.target as HTMLElement).classList.add('active');
    this.dragging = true;
  }

  render() {
    return (
      <Host class={{"az-splitter": true, [this.direction]: true}}>
        <slot></slot>
      </Host>
    );
  }
}

function widthOf(index: number, pos: number[], total: number = 100) {
  const lastIndex = pos.length;
  if (index === 0) return pos[0];
  else if (index === lastIndex) return total - pos[lastIndex - 1];
  else return pos[index] - pos[index - 1];
}