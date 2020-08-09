
import { Component, Prop, Element, Host, h, Watch, State, Event, EventEmitter } from '@stencil/core';
import parseColor from 'parse-color';
import colorConvert from 'color-convert';
import { Inject } from '../../utils/utils';

const ColorFormat = ['hex', 'hsl', 'rgb'];

@Component({
  tag: 'az-color-picker',
  styleUrl: 'az-color-picker.styl',
  shadow: false
})
export class AzColorPicker {
  static defaultColor: string = '#ff0000';
  @Element() el: HTMLElement;

  colorfmtIndex: number = 0;

  @Prop() caption: string = '';
  @Prop({reflect: true}) color: string = AzColorPicker.defaultColor;
  @Prop({reflect: true}) showinput: boolean = true;
  @Prop({reflect: true}) colorfmt: string = ColorFormat[this.colorfmtIndex];
  @Prop({reflect: true}) readonly: boolean = false;

  @State() curColor: string = AzColorPicker.defaultColor;
  @State() strawLeft: number = 0;
  @State() strawTop: number = 0;
  @State() dragging: boolean = false;
  @State() transparency: number = 100;

  @State() hue: number = 0;
  @State() saturation: number = 1
  @State() value: number = 1;
  @State()_color: string = this.color;

  @Event() changed: EventEmitter;

  panel: HTMLDivElement;
  input: HTMLInputElement;

  constructor() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  @Inject({})
  componentDidLoad() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    this.parseCssString(this.color || AzColorPicker.defaultColor);
    this.format(true, true);
  }

  @Watch('color')
  onValueChange(newValue, oldValue) {
    if (oldValue !== newValue) {
      console.log(newValue, oldValue);
      this.parseCssString(newValue);
      this.format(true);
    }
  }

  onMouseDown(e: MouseEvent) {
    this.dragging = true;
    if (e.metaKey || e.ctrlKey) {
      this.nextFormat();
      this.format(true, true);
    }
  }

  onMouseMove(e: MouseEvent) {
    if (this.dragging) {
      this.update(e);
    }
  }

  onMouseUp(e: MouseEvent) {
    if (!this.dragging) return;
    this.update(e);
    this.dragging = false;
  }

  update(e: MouseEvent) {
    const rect = this.panel.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.saturation = confine(Math.ceil(x / rect.width * 100), 0, 100);
    this.value = confine(Math.floor(100 - y / rect.height * 100), 0, 100);

    this.strawLeft = confine(x, 0, rect.width);
    this.strawTop = confine(y, 0, rect.height);
    this.render();
    this.calcColorString();
    this.changed.emit(this._color);
  }

  calcColorString() {
    const str = this._color;
    if (str.indexOf('rgb') === 0) {
      const c = colorConvert.hsv.rgb(this.hue, this.saturation, this.value);
      this._color = `rgba(${c[0]},${c[1]},${c[2]},${this.transparency / 100})`;
    } else if (str.indexOf('hsl') === 0) {
      const c = colorConvert.hsv.hsl(this.hue, this.saturation, this.value);
      const aa = this.transparency / 100;
      this._color = `hsla(${c[0]},${c[1]}%,${c[2]}%,${aa})`
    } else {
      this._color = this.getColorHex(true);
    }
  }

  onHueChange(e: Event) {
    this.hue = parseInt((e.target as HTMLInputElement).value, 10);
    this.curColor = this.getColorHex(false, this.hue, 100, 100);
    this.calcColorString();
    this.changed.emit(this._color);
  }

  onTransparentcyChange(e: Event) {
    this.transparency = parseInt((e.target as HTMLInputElement).value, 10);
    this.calcColorString();
    this.changed.emit(this._color);
  }

  onCssStringChange(e: Event): void {
    const str = (e.target as HTMLInputElement).value.trim();
    this.parseCssString(str);
    this.format(true, true);
  }

  getColorHex(withTransparentcy = false, hue = this.hue, sat = this.saturation, val = this.value) {
    const a = withTransparentcy ? (Math.floor(255 * this.transparency / 100)).toString(16) : '';
    const aa = (a.length > 1 ) ? a : `0${a}`;
    return '#' + colorConvert.hsv.hex(hue, sat, val).toLowerCase() + ((aa === '0' || aa === 'ff') ? '' : aa);
  }

  parseCssString(str: string) {
    const result = parseColor(str);
    if (!result.hsv) {
      // @ts-ignore
      this.input.native.value = this._color;
      return;
    }
    // basic color information
    this.hue = result.hsv[0];
    this.saturation = result.hsv[1];
    this.value = result.hsv[2];
    this.transparency = Math.floor(result.rgba[3] * 100);

    // update UI
    this.curColor = result.hex;
    const rect = this.panel.getBoundingClientRect();
    this.strawLeft = Math.floor((this.saturation / 100) * rect.width);
    this.strawTop = Math.floor((1 - this.value / 100) * rect.height);
  }

  /**
   * Format color circlely in formats hsl->hex->rgba->hsl...
   * @param {string} str
   * @param {'hsl' | 'hex' | 'rgb' | ''} format color format
   * @param {boolean} set set result to _color
   * @param {boolean} emit if true will emit 'changed' event
   * @return {string} next color
   */
  format(set: boolean = false, emit: boolean = false) {
    let result: string;
    if (this.colorfmt === 'hsl') {
      const c = colorConvert.hsv.hsl(this.hue, this.saturation, this.value);
      const aa = this.transparency / 100;
      result = `hsla(${c[0]},${c[1]}%,${c[2]}%,${aa})`
    } else if (this.colorfmt === 'hex') {
      result = this.getColorHex(true);
    } else if (this.colorfmt === 'rgb') {
      const c = colorConvert.hsv.rgb(this.hue, this.saturation, this.value);
      result = `rgba(${c[0]},${c[1]},${c[2]},${this.transparency / 100})`;
    }
    if (set) this._color = result;
    if (emit) this.changed.emit(this._color);
    return result;
  }

  nextFormat() {
    this.colorfmtIndex++;
    if (this.colorfmtIndex >= ColorFormat.length) {
      this.colorfmtIndex = 0;
    }
    this.colorfmt = ColorFormat[this.colorfmtIndex];
    this.format(true, true);
  }

  selectAll(e: MouseEvent) {
    // @ts-ignore
    this.input.native.select();
    if (e.metaKey || e.ctrlKey) {
      document.execCommand('copy');
    }
  }

  render() {
    return (
      <Host>
        <div class="az-color-picker_panel"
          ref={(el) => this.panel = el}
          onMouseDown={this.onMouseDown}
          style={{backgroundColor: this.curColor}}>
          <div class="az-color-picker_straw" style={{left: `${this.strawLeft}px`, top: `${this.strawTop}px`}}></div>
        </div>
        <div>
          <az-slider class="spectrum-h" min="0" max="360" value={this.hue} onInput={(e) => this.onHueChange(e)}></az-slider>
          <az-slider class="checkerboard" min="0" max="100" value={this.transparency} onInput={(e) => this.onTransparentcyChange(e)}></az-slider>
          <div class="az-color-picker_value" style={{display: this.showinput ? '' : 'none'}}>
            <span class="az-color-picker_current-color"
              onClick={() => this.nextFormat()}>
              <i style={{backgroundColor: this._color, opacity: `${this.transparency / 100}`}}></i>
            </span>
            <az-input class="az-color-picker_color-value"
              readonly={this.readonly}
              spellcheck={false}
              ref={(el: any) => this.input = el}
              type="text"
              value={this._color}
              onClick={(e) => this.selectAll(e)}
              onChange={(e) => this.onCssStringChange(e)}></az-input>
          </div>
        </div>
      </Host>
    );
  }
}

const confine = (value: number, min:number, max: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};