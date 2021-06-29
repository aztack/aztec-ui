import { Component, Element, h } from '@stencil/core';
import { Inject } from '../../utils';

@Component({
  tag: 'az-select',
  styleUrl: 'az-select.styl',
  shadow: false
})
export class AzSelect {
  @Element() el: HTMLElement;
  @Inject({children: [HTMLOptionElement, HTMLOptGroupElement]})

  componentDidLoad() {

  }
  constructor() {
    Object.defineProperty(this.el, 'value', {
      get() {
        return this.querySelector('select').value;
      },
      set(val) {
        this.querySelector('select').value = val;
      }
    });
  }
  render() {
    return (
      <select>
      </select>
    );
  }
}
