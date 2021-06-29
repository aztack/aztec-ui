import { Component, Prop, Element, h, Watch, Host, Method} from '@stencil/core';
import { isNumber } from '../../utils/lang';
import { Inject } from '../../utils';

type MouseOrKeyboardEvent = MouseEvent | KeyboardEvent;
@Component({
  tag: 'az-input',
  styleUrl: 'az-input.styl',
  shadow: false
})
export class AzInput {
  @Element() el: HTMLElement;
  @Prop() caption: string = '';
  @Prop() type: string = '';
  @Prop() value: string = '';
  @Prop({reflect: true}) clearable = false;
  @Prop({reflect: true}) popupalign = 'left top';
  @Prop({reflect: true}) constrain: boolean = false;

  @Prop({reflect: true}) max: number;
  @Prop({reflect: true}) min: number;
  @Prop({reflect: true}) autocomplete: string = 'off';
  @Prop({reflect: true}) autocorrect: string = 'off';
  @Prop({reflect: true}) autocapitalize: string = 'off';
  @Prop({reflect: true}) spellcheck: boolean = true;
  @Prop({reflect: true}) readonly: boolean = false;

  native: HTMLInputElement;
  clearButton: HTMLAzIconElement;
  nativeType: string;
  colorPicker: HTMLAzColorPickerElement;

  constructor() {
    this.onIncreaseButtonClicked = this.onIncreaseButtonClicked.bind(this);
    this.onDecreaseButtonClicked = this.onDecreaseButtonClicked.bind(this);
  }

  @Inject({
    attrs: true,
    parse: false
  })
  componentDidLoad() {
    this.native.addEventListener('change', () => {
      this.value = this.native.value;
    });
    this.native.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.clearable && this.clearButton) this.setClearButtonDisplay();
      if (e.which === 38 || e.detail === 38/* ArrowUp */) {
        this.onIncreaseButtonClicked(e);
        e.preventDefault()
      } else if (e.which === 40 || e.detail === 40/* ArrowDown */) {
        this.onDecreaseButtonClicked(e);
        e.preventDefault()
      }
    });
    this.native.addEventListener('mousedown', () => {
      if (this.type !== 'color-picker' || !this.colorPicker) return;
      if (this.colorPicker.color != this.value) {
        this.colorPicker.color = this.value;
      }
      this.colorPicker.style.display = 'inline-block';
    });
    this.native.addEventListener('blur', () => {
      if (this.type === 'number' && this.constrain === true && isNumber(this.value)) {
        const val = parseFloat(this.value);
        if (this.max != null && val > this.max) {
          this.value = '' + this.max;
        } else if (this.min != null && val < this.min) {
          this.value = '' + this.min;
        }
      }
    });
    document.addEventListener('click', (e: MouseEvent) => {
      if (this.type !== 'color-picker' || !this.colorPicker) return;
      if ((e.target as HTMLElement).closest('az-input')) return;
      this.colorPicker.style.display = 'none';
    });
    if (this.colorPicker) {
      this.colorPicker.addEventListener('changed', (e: any) => {
        this.value = e.detail;
      });
    }
  }

  @Watch('value')
  onValueChange(newValue, oldValue) {
    if (oldValue !== newValue) {
      this.native.value = newValue;
    }
  }

  @Method()
  async clear() {
    this.value = '';
    this.setClearButtonDisplay();
  }

  @Method()
  async toJson(detailed: boolean = false) {
    return Object.assign({
      tag: 'az-input',
      caption: this.caption,
      value: this.value
    }, detailed ? {
      type: this.type,
      clearable: this.clearable
    } : null);
  }

  onIncreaseButtonClicked(e: MouseOrKeyboardEvent) {
    if (!isNumber(this.value)) return;
    let val = parseFloat(this.value) + unit(e);
    if (this.max != undefined && val > this.max) {
      val = this.max;
    }
    const strVal = String(val);
    this.value = strVal.indexOf('.') >= 0 ? val.toFixed(1) : strVal;
  }

  onDecreaseButtonClicked(e: MouseOrKeyboardEvent) {
    if (!isNumber(this.value)) return;
    let val = parseFloat(this.value) - unit(e);
    if (this.min != undefined && val < this.min) {
      val = this.min;
    }
    const strVal = String(val);
    this.value = strVal.indexOf('.') >= 0 ? val.toFixed(1) : strVal;
  }

  setClearButtonDisplay () {
    this.clearButton.style.display = this.native.value && this.native.value.length > 0 ? '' : 'none';
    if (this.type === 'color-picker' && this.colorPicker) {
      this.colorPicker.style.display = 'none';
    }
  }

  render() {
    switch (this.type) {
      case 'color-picker':
        this.nativeType = 'text';
        break;
      default:
        this.nativeType = this.type;
    }
    const colorPicker = this.type === 'color-picker'
      && <az-color-picker showinput={false} ref={el => this.colorPicker = el} class={`color-picker ${this.popupalign}`}></az-color-picker>
    return (<Host class={{
        [`az-input-${this.type}`]: true
      }}>
      {colorPicker}
      {this.caption && <span class='az-input-caption az-caption'>{this.caption}</span>}
      {this.type === 'number' && <span class="az-input__adjustor">
        <az-icon icon="arrow-up" onClick={this.onIncreaseButtonClicked}></az-icon>
        <az-icon icon="arrow-down" onClick={this.onDecreaseButtonClicked}></az-icon>
      </span>}
      {this.type !== 'number' && <az-icon icon="circle-cross" ref={el => this.clearButton = el}
        style={{display: this.clearable && this.value && this.value.length > 0 ? '' : 'none'}}
        class="clear"
        onClick={() => this.clear()}>
      </az-icon>}
      <input ref={el => this.native = el} type={this.nativeType} value={this.value}
        autocomplete={this.autocomplete}
        autocorrect={this.autocorrect}
        autocapitalize={this.autocapitalize}
        spellcheck={this.spellcheck}
      >
      </input>
    </Host>);
  }
}

function unit(e: MouseOrKeyboardEvent) {
  if (e.shiftKey && e.altKey) return 100;
  if (e.shiftKey) return 10;
  if (e.altKey) return 0.1;
  return 1;
}
