import { Component, Prop, Element, Host,h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { AzTreeItem } from '../../components/tree/az-tree-item';
import { Inject } from '../../utils/utils';

@Component({
  tag: 'az-file-explorer',
  styleUrl: 'az-file-explorer.styl',
  shadow: false
})
export class AzFileExplorer {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop() rootDir: string = './';

  roots: AzTreeItem[] = [];

  @Inject({
    sync: []
  })
  componentDidLoad() {

  }

  render() {
    return (
      <Host class="az-file-explorer az-nw">
        {this.caption && <span class="az-caption">{this.caption}</span>}
        <az-tree roots={this.roots}></az-tree>
      </Host>
    );
  }
}