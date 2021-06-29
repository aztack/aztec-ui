import { Component, Prop, Element, h, Method } from '@stencil/core';
import { Inject, set, isNumber, capitalize, decamelize, isPlainObject } from '../../utils';
import parseColor from 'parse-color';

export interface IFormItem {
  name: string;
  tag: string;
  caption?: string;
  props?: Record<string, any>;
  children?: IFormItem[]
}

@Component({
  tag: 'az-form',
  styleUrl: 'az-form.styl',
  shadow: false
})
export class AzForm {
  @Element() el: HTMLElement;

  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) labelPosition: 'left' | 'right' | 'top' = 'left';
  @Prop({mutable: true}) items: IFormItem[] = [];

  @Inject({
    parse: true,
    attrs: true,
    remove: true,
    keep: ['caption', 'label-position']
  })
  componentDidLoad() {}

  @Method()
  async deserialize(items: IFormItem[]) {
    this.items = items;
  }

  @Method()
  async serialize(detailed: boolean = false) {
    const items = this.el.querySelectorAll('az-form-item');
    const promises = Array.from(items).reduce((all: any[], child: HTMLElement) => {
      if (child.children.length && typeof child.children[0]['toJson'] === 'function') {
        const realFormItem = child.children[0];
        const json = realFormItem['toJson'](detailed);
        all.push(json);
      }
      return all;
    }, []);
    return Promise.all(promises);
  }

  @Method()
  async toJson(initialValue = {}, root: string = '') {
    const form = this.el.querySelector('form');
    if (!Array.isArray(initialValue) && !isPlainObject(initialValue)) {
      initialValue = form.dataset.hint === 'array' ? [] : {};
      console.warn(`initialValue must be an array or an object!`);
    }
    const fieldset = form.querySelector('fieldset');
    const items = Array.from(fieldset.children).filter(it => it.tagName === 'AZ-FORM-ITEM');
    const ret = await Array.from(items).reduce((all: any, child: HTMLElement) => {
      const firstChild = child.children[0];
      if (child.children.length && ('value' in firstChild || firstChild.tagName === 'AZ-FORM')) {
        const name = child.getAttribute('name');
        if (!name) return all;
        const realFormItem = firstChild as HTMLElement;
        const key = root ? `${root}.${name}` : name;
        if (realFormItem.tagName === 'AZ-FORM') {
          (realFormItem as HTMLAzFormElement).toJson(initialValue, key);
        } else {
          set(all, key, realFormItem['value']);
        }
      }
      return all;
    }, initialValue);
    return ret;
  }

  @Method()
  async fromJson(data: Record<string, any>) {
    this.items = this.guessSchemaFromJson(data);
  }


  render() {
    const cap = this.caption ? <legend class="az-form__caption az-caption">{this.caption}</legend> : null;
    return (
      <form class={{
        'az-form': true,
        [`label-${this.labelPosition}`]: true
      }}>
        <fieldset>
          {cap}
          {this.items.length > 0 ? tagize(this.items) : <slot></slot>}
        </fieldset>
        <div class="az-form__footer">
          <slot name="footer"></slot>
        </div>
      </form>
    )
  }

  private guessSchemaFromJson(data: Record<string, any>, root: string = '') {
    const items: any[] = [];
    for (let key in data) {
      let item: IFormItem | IFormItem[] | null = null;
      let val = data[key];
      let type = typeof val;
      const name = root ? `${root}.${key}`: key;
      if (type === 'boolean') {
        item = schemas.boolean(key, val);
      } else if (type === 'number') {
        item = schemas.number(key, val);
      } else if (type === 'string') {
        if (!val.length) {
          item = schemas.string(key, val);
        } else {
          if (isNumber(val)) {
            item = schemas.number(key, val);
          } else if (parseColor(val).rgb) {
            item = schemas.color(key, val);
          } else {
            item = schemas.string(key, val);
          }
        }
      } else if (type === 'object') {
        item = schemas.form(name);
        if (Array.isArray(val)) {
          item.props['data-hint'] = 'array';
          item.props.items = val.map((v: any, index) => {
            const form = schemas.form(String(index));
            form.props.items = this.guessSchemaFromJson(v);
            return form;
          }) as IFormItem[];
        } else {
          item.props['data-hint'] = 'object';
          item.props.items = [this.guessSchemaFromJson(val)];
        }
      }
      items.push(item);
    }
    return items;
  }
}

const schemas = {
  boolean(name: string, value: any) {
    const caption = capitalize(decamelize(name));
    return {tag: 'az-switch', name, props: {caption, value, }};
  },
  number(name: string, value: any) {
    const caption = capitalize(decamelize(name));
    return {tag: 'az-input', name, props: {caption, value, type: 'number'}}
  },
  color(name: string, value: any) {
    const caption = capitalize(decamelize(name));
    return {tag: 'az-input', name, props: {caption, value, type: 'color-picker'}}
  },
  string(name: string, value: any) {
    const caption = capitalize(decamelize(name));
    return {tag: 'az-input', name, props: {caption, value, }};
  },
  form(name: string) {
    const caption = capitalize(decamelize(name));
    return {tag: 'az-form', name, props: {caption, items: []}};
  }
}

function tagize(items: IFormItem[]) {
  return items.map((it: IFormItem) => {
    return Array.isArray(it) ? tagize(it) : (<az-form-item class="az-form-item" name={it.name}>
      <it.tag name={it.name} {...it.props}>{it.children && it.children.length ? tagize(it.children) : null}</it.tag>
    </az-form-item>)
  });
}
