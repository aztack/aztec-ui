/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  ComponentStyleType,
} from './global/typing';
import {
  AzTreeItem,
} from './components/tree/az-tree-item';
import {
  AzTree,
} from './components/tree/az-tree';

export namespace Components {
  interface AzButton {
    'caption': string;
    /**
    * Button type
    */
    'type': ComponentStyleType;
  }
  interface AzCheckbox {
    'caption': string;
    'checked': boolean;
    'indeterminate': boolean;
    'toggle': () => Promise<void>;
  }
  interface AzIcon {
    'color': string;
    'height': number | string;
    'icon': string;
    'width': number | string;
  }
  interface AzInput {
    'caption': string;
    'type': string;
    'value': string;
  }
  interface AzPanel {
    'caption': string;
  }
  interface AzSection {
    'caption': string;
    'collapsable': boolean;
    'collapse': () => Promise<void>;
    'collapsed': boolean;
    'expand': () => Promise<void>;
  }
  interface AzSelect {}
  interface AzTabs {
    'activeIndex': number;
    'addItem': (it: any) => Promise<void>;
    'items': any[];
    'removeItem': (it: any) => Promise<void>;
    'removeItemAt': (index: number) => Promise<void>;
  }
  interface AzTree {
    'addItem': (itemOrCaption: string | AzTreeItem, parent?: AzTreeItem) => Promise<AzTreeItem>;
    'caption': string;
    'roots': AzTreeItem[];
    'selecting': boolean;
  }
  interface AzTreeItem {
    'addItem': (item: string | AzTreeItem) => Promise<void>;
    'caption': string;
    'children': AzTreeItem[];
    'expanded': boolean;
    'level': number;
    'selected': false;
    'tree': AzTree;
  }
}

declare global {


  interface HTMLAzButtonElement extends Components.AzButton, HTMLStencilElement {}
  var HTMLAzButtonElement: {
    prototype: HTMLAzButtonElement;
    new (): HTMLAzButtonElement;
  };

  interface HTMLAzCheckboxElement extends Components.AzCheckbox, HTMLStencilElement {}
  var HTMLAzCheckboxElement: {
    prototype: HTMLAzCheckboxElement;
    new (): HTMLAzCheckboxElement;
  };

  interface HTMLAzIconElement extends Components.AzIcon, HTMLStencilElement {}
  var HTMLAzIconElement: {
    prototype: HTMLAzIconElement;
    new (): HTMLAzIconElement;
  };

  interface HTMLAzInputElement extends Components.AzInput, HTMLStencilElement {}
  var HTMLAzInputElement: {
    prototype: HTMLAzInputElement;
    new (): HTMLAzInputElement;
  };

  interface HTMLAzPanelElement extends Components.AzPanel, HTMLStencilElement {}
  var HTMLAzPanelElement: {
    prototype: HTMLAzPanelElement;
    new (): HTMLAzPanelElement;
  };

  interface HTMLAzSectionElement extends Components.AzSection, HTMLStencilElement {}
  var HTMLAzSectionElement: {
    prototype: HTMLAzSectionElement;
    new (): HTMLAzSectionElement;
  };

  interface HTMLAzSelectElement extends Components.AzSelect, HTMLStencilElement {}
  var HTMLAzSelectElement: {
    prototype: HTMLAzSelectElement;
    new (): HTMLAzSelectElement;
  };

  interface HTMLAzTabsElement extends Components.AzTabs, HTMLStencilElement {}
  var HTMLAzTabsElement: {
    prototype: HTMLAzTabsElement;
    new (): HTMLAzTabsElement;
  };

  interface HTMLAzTreeElement extends Components.AzTree, HTMLStencilElement {}
  var HTMLAzTreeElement: {
    prototype: HTMLAzTreeElement;
    new (): HTMLAzTreeElement;
  };

  interface HTMLAzTreeItemElement extends Components.AzTreeItem, HTMLStencilElement {}
  var HTMLAzTreeItemElement: {
    prototype: HTMLAzTreeItemElement;
    new (): HTMLAzTreeItemElement;
  };
  interface HTMLElementTagNameMap {
    'az-button': HTMLAzButtonElement;
    'az-checkbox': HTMLAzCheckboxElement;
    'az-icon': HTMLAzIconElement;
    'az-input': HTMLAzInputElement;
    'az-panel': HTMLAzPanelElement;
    'az-section': HTMLAzSectionElement;
    'az-select': HTMLAzSelectElement;
    'az-tabs': HTMLAzTabsElement;
    'az-tree': HTMLAzTreeElement;
    'az-tree-item': HTMLAzTreeItemElement;
  }
}

declare namespace LocalJSX {
  interface AzButton extends JSXBase.HTMLAttributes<HTMLAzButtonElement> {
    'caption'?: string;
    /**
    * Button type
    */
    'type'?: ComponentStyleType;
  }
  interface AzCheckbox extends JSXBase.HTMLAttributes<HTMLAzCheckboxElement> {
    'caption'?: string;
    'checked'?: boolean;
    'indeterminate'?: boolean;
    'onChanged'?: (event: CustomEvent<any>) => void;
  }
  interface AzIcon extends JSXBase.HTMLAttributes<HTMLAzIconElement> {
    'color'?: string;
    'height'?: number | string;
    'icon'?: string;
    'width'?: number | string;
  }
  interface AzInput extends JSXBase.HTMLAttributes<HTMLAzInputElement> {
    'caption'?: string;
    'type'?: string;
    'value'?: string;
  }
  interface AzPanel extends JSXBase.HTMLAttributes<HTMLAzPanelElement> {
    'caption'?: string;
  }
  interface AzSection extends JSXBase.HTMLAttributes<HTMLAzSectionElement> {
    'caption'?: string;
    'collapsable'?: boolean;
    'collapsed'?: boolean;
  }
  interface AzSelect extends JSXBase.HTMLAttributes<HTMLAzSelectElement> {}
  interface AzTabs extends JSXBase.HTMLAttributes<HTMLAzTabsElement> {
    'activeIndex'?: number;
    'items'?: any[];
  }
  interface AzTree extends JSXBase.HTMLAttributes<HTMLAzTreeElement> {
    'caption'?: string;
    'roots'?: AzTreeItem[];
    'selecting'?: boolean;
  }
  interface AzTreeItem extends JSXBase.HTMLAttributes<HTMLAzTreeItemElement> {
    'caption'?: string;
    'children'?: AzTreeItem[];
    'expanded'?: boolean;
    'level'?: number;
    'selected'?: false;
    'tree'?: AzTree;
  }

  interface IntrinsicElements {
    'az-button': AzButton;
    'az-checkbox': AzCheckbox;
    'az-icon': AzIcon;
    'az-input': AzInput;
    'az-panel': AzPanel;
    'az-section': AzSection;
    'az-select': AzSelect;
    'az-tabs': AzTabs;
    'az-tree': AzTree;
    'az-tree-item': AzTreeItem;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


