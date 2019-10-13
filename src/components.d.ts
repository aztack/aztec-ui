/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  ComponentSize,
  ComponentStyle,
} from './global/typing';
import {
  AzTreeItem,
} from './components/tree/az-tree-item';

export namespace Components {
  interface AzButton {
    'caption': string;
    'circle': boolean;
    'disabled': boolean;
    'icon': string;
    'iconPosition': string;
    'round': boolean;
    'size': ComponentSize;
    /**
    * Button type
    */
    'type': ComponentStyle;
  }
  interface AzCheckbox {
    'caption': string;
    'checked': boolean;
    'indeterminate': boolean;
  }
  interface AzColorPicker {
    'caption': string;
    'color': string;
  }
  interface AzDialog {
    'caption': string;
    'fixed': boolean;
  }
  interface AzIcon {
    'color': string;
    'height': number | string;
    'icon': string;
    'register': boolean;
    'width': number | string;
  }
  interface AzInput {
    'autocapitalize': string;
    'autocomplete': string;
    'autocorrect': string;
    'caption': string;
    'native': HTMLInputElement;
    'spellcheck': boolean;
    'type': string;
    'value': string;
  }
  interface AzPanel {
    'caption': string;
  }
  interface AzProgressBar {
    'caption': string;
    'max': number;
    'value': number;
  }
  interface AzSection {
    'caption': string;
    'collapsable': boolean;
    'collapsed': boolean;
  }
  interface AzSelect {}
  interface AzSlider {
    'caption': string;
    'max': string | number;
    'min': string | number;
    'value': string | number;
  }
  interface AzSplitter {
    'direction': 'horizontal' | 'vertical';
    'disabled': boolean;
    'gap': number;
  }
  interface AzSwitch {
    'caption': string;
    'size': ComponentSize;
    'type': ComponentStyle;
    'value': boolean;
  }
  interface AzTabs {
    'activeIndex': number;
    'items': any[];
  }
  interface AzToolbarButton {
    'caption': string;
    'icon': string;
    'type': ComponentStyle;
  }
  interface AzTooltip {
    'caption': string;
    'delay': number;
    'isShow': boolean;
    'placement': 'top' | 'bottom' | 'left' | 'right';
    'trigger': 'hover' | 'click' | 'manual';
  }
  interface AzTree {
    'addItem': (itemOrCaption: string | AzTreeItem, parent?: number | AzTreeItem, attrs?: any) => Promise<AzTreeItem>;
    'caption': string;
    'roots': AzTreeItem[];
    'selecting': boolean;
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

  interface HTMLAzColorPickerElement extends Components.AzColorPicker, HTMLStencilElement {}
  var HTMLAzColorPickerElement: {
    prototype: HTMLAzColorPickerElement;
    new (): HTMLAzColorPickerElement;
  };

  interface HTMLAzDialogElement extends Components.AzDialog, HTMLStencilElement {}
  var HTMLAzDialogElement: {
    prototype: HTMLAzDialogElement;
    new (): HTMLAzDialogElement;
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

  interface HTMLAzProgressBarElement extends Components.AzProgressBar, HTMLStencilElement {}
  var HTMLAzProgressBarElement: {
    prototype: HTMLAzProgressBarElement;
    new (): HTMLAzProgressBarElement;
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

  interface HTMLAzSliderElement extends Components.AzSlider, HTMLStencilElement {}
  var HTMLAzSliderElement: {
    prototype: HTMLAzSliderElement;
    new (): HTMLAzSliderElement;
  };

  interface HTMLAzSplitterElement extends Components.AzSplitter, HTMLStencilElement {}
  var HTMLAzSplitterElement: {
    prototype: HTMLAzSplitterElement;
    new (): HTMLAzSplitterElement;
  };

  interface HTMLAzSwitchElement extends Components.AzSwitch, HTMLStencilElement {}
  var HTMLAzSwitchElement: {
    prototype: HTMLAzSwitchElement;
    new (): HTMLAzSwitchElement;
  };

  interface HTMLAzTabsElement extends Components.AzTabs, HTMLStencilElement {}
  var HTMLAzTabsElement: {
    prototype: HTMLAzTabsElement;
    new (): HTMLAzTabsElement;
  };

  interface HTMLAzToolbarButtonElement extends Components.AzToolbarButton, HTMLStencilElement {}
  var HTMLAzToolbarButtonElement: {
    prototype: HTMLAzToolbarButtonElement;
    new (): HTMLAzToolbarButtonElement;
  };

  interface HTMLAzTooltipElement extends Components.AzTooltip, HTMLStencilElement {}
  var HTMLAzTooltipElement: {
    prototype: HTMLAzTooltipElement;
    new (): HTMLAzTooltipElement;
  };

  interface HTMLAzTreeElement extends Components.AzTree, HTMLStencilElement {}
  var HTMLAzTreeElement: {
    prototype: HTMLAzTreeElement;
    new (): HTMLAzTreeElement;
  };
  interface HTMLElementTagNameMap {
    'az-button': HTMLAzButtonElement;
    'az-checkbox': HTMLAzCheckboxElement;
    'az-color-picker': HTMLAzColorPickerElement;
    'az-dialog': HTMLAzDialogElement;
    'az-icon': HTMLAzIconElement;
    'az-input': HTMLAzInputElement;
    'az-panel': HTMLAzPanelElement;
    'az-progress-bar': HTMLAzProgressBarElement;
    'az-section': HTMLAzSectionElement;
    'az-select': HTMLAzSelectElement;
    'az-slider': HTMLAzSliderElement;
    'az-splitter': HTMLAzSplitterElement;
    'az-switch': HTMLAzSwitchElement;
    'az-tabs': HTMLAzTabsElement;
    'az-toolbar-button': HTMLAzToolbarButtonElement;
    'az-tooltip': HTMLAzTooltipElement;
    'az-tree': HTMLAzTreeElement;
  }
}

declare namespace LocalJSX {
  interface AzButton {
    'caption'?: string;
    'circle'?: boolean;
    'disabled'?: boolean;
    'icon'?: string;
    'iconPosition'?: string;
    'round'?: boolean;
    'size'?: ComponentSize;
    /**
    * Button type
    */
    'type'?: ComponentStyle;
  }
  interface AzCheckbox {
    'caption'?: string;
    'checked'?: boolean;
    'indeterminate'?: boolean;
    'onChanged'?: (event: CustomEvent<any>) => void;
  }
  interface AzColorPicker {
    'caption'?: string;
    'color'?: string;
    'onChanged'?: (event: CustomEvent<any>) => void;
  }
  interface AzDialog {
    'caption'?: string;
    'fixed'?: boolean;
    'onClosed'?: (event: CustomEvent<any>) => void;
  }
  interface AzIcon {
    'color'?: string;
    'height'?: number | string;
    'icon'?: string;
    'register'?: boolean;
    'width'?: number | string;
  }
  interface AzInput {
    'autocapitalize'?: string;
    'autocomplete'?: string;
    'autocorrect'?: string;
    'caption'?: string;
    'native'?: HTMLInputElement;
    'spellcheck'?: boolean;
    'type'?: string;
    'value'?: string;
  }
  interface AzPanel {
    'caption'?: string;
  }
  interface AzProgressBar {
    'caption'?: string;
    'max'?: number;
    'value'?: number;
  }
  interface AzSection {
    'caption'?: string;
    'collapsable'?: boolean;
    'collapsed'?: boolean;
  }
  interface AzSelect {}
  interface AzSlider {
    'caption'?: string;
    'max'?: string | number;
    'min'?: string | number;
    'value'?: string | number;
  }
  interface AzSplitter {
    'direction'?: 'horizontal' | 'vertical';
    'disabled'?: boolean;
    'gap'?: number;
  }
  interface AzSwitch {
    'caption'?: string;
    'onChanged'?: (event: CustomEvent<any>) => void;
    'size'?: ComponentSize;
    'type'?: ComponentStyle;
    'value'?: boolean;
  }
  interface AzTabs {
    'activeIndex'?: number;
    'items'?: any[];
  }
  interface AzToolbarButton {
    'caption'?: string;
    'icon'?: string;
    'type'?: ComponentStyle;
  }
  interface AzTooltip {
    'caption'?: string;
    'delay'?: number;
    'isShow'?: boolean;
    'placement'?: 'top' | 'bottom' | 'left' | 'right';
    'trigger'?: 'hover' | 'click' | 'manual';
  }
  interface AzTree {
    'caption'?: string;
    'onCollapsed'?: (event: CustomEvent<any>) => void;
    'onExpanded'?: (event: CustomEvent<any>) => void;
    'onInserted'?: (event: CustomEvent<any>) => void;
    'onSelected'?: (event: CustomEvent<any>) => void;
    'roots'?: AzTreeItem[];
    'selecting'?: boolean;
  }

  interface IntrinsicElements {
    'az-button': AzButton;
    'az-checkbox': AzCheckbox;
    'az-color-picker': AzColorPicker;
    'az-dialog': AzDialog;
    'az-icon': AzIcon;
    'az-input': AzInput;
    'az-panel': AzPanel;
    'az-progress-bar': AzProgressBar;
    'az-section': AzSection;
    'az-select': AzSelect;
    'az-slider': AzSlider;
    'az-splitter': AzSplitter;
    'az-switch': AzSwitch;
    'az-tabs': AzTabs;
    'az-toolbar-button': AzToolbarButton;
    'az-tooltip': AzTooltip;
    'az-tree': AzTree;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'az-button': LocalJSX.AzButton & JSXBase.HTMLAttributes<HTMLAzButtonElement>;
      'az-checkbox': LocalJSX.AzCheckbox & JSXBase.HTMLAttributes<HTMLAzCheckboxElement>;
      'az-color-picker': LocalJSX.AzColorPicker & JSXBase.HTMLAttributes<HTMLAzColorPickerElement>;
      'az-dialog': LocalJSX.AzDialog & JSXBase.HTMLAttributes<HTMLAzDialogElement>;
      'az-icon': LocalJSX.AzIcon & JSXBase.HTMLAttributes<HTMLAzIconElement>;
      'az-input': LocalJSX.AzInput & JSXBase.HTMLAttributes<HTMLAzInputElement>;
      'az-panel': LocalJSX.AzPanel & JSXBase.HTMLAttributes<HTMLAzPanelElement>;
      'az-progress-bar': LocalJSX.AzProgressBar & JSXBase.HTMLAttributes<HTMLAzProgressBarElement>;
      'az-section': LocalJSX.AzSection & JSXBase.HTMLAttributes<HTMLAzSectionElement>;
      'az-select': LocalJSX.AzSelect & JSXBase.HTMLAttributes<HTMLAzSelectElement>;
      'az-slider': LocalJSX.AzSlider & JSXBase.HTMLAttributes<HTMLAzSliderElement>;
      'az-splitter': LocalJSX.AzSplitter & JSXBase.HTMLAttributes<HTMLAzSplitterElement>;
      'az-switch': LocalJSX.AzSwitch & JSXBase.HTMLAttributes<HTMLAzSwitchElement>;
      'az-tabs': LocalJSX.AzTabs & JSXBase.HTMLAttributes<HTMLAzTabsElement>;
      'az-toolbar-button': LocalJSX.AzToolbarButton & JSXBase.HTMLAttributes<HTMLAzToolbarButtonElement>;
      'az-tooltip': LocalJSX.AzTooltip & JSXBase.HTMLAttributes<HTMLAzTooltipElement>;
      'az-tree': LocalJSX.AzTree & JSXBase.HTMLAttributes<HTMLAzTreeElement>;
    }
  }
}


