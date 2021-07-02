import { Component, Prop, Element, h, Host, Watch } from '@stencil/core';

@Component({
  tag: 'az-progress-bar',
  styleUrl: 'az-progress-bar.styl',
  shadow: false
})
export class AzProgressBar {
  @Element() el: HTMLElement;

  @Prop() caption: string = '';
  @Prop({reflect: true, mutable: true}) value: number = 50;
  @Prop({reflect: true, mutable: true}) max: number = 100;
  @Prop({reflect: true, mutable: true}) min: number = 0;

  componentDidLoad() {}

  @Watch('value')
  onValueChanged(newValue) {
    if (newValue > this.max || newValue < this.min) {
      this.value = Math.max(Math.min(this.value, this.max), this.min);
    }
  }

  render() {
    return (
      <Host>
        {this.caption && <span class="az-progress-bar__caption az-caption">{this.caption}</span>}
        <progress max={this.max} value={this.value}></progress>
      </Host>
    )
  }
}
