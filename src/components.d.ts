/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ComponentSize, ComponentStyle, ModifierCombinations, Placement, PositionHorizontal } from "./global/typing";
import { ButtonConfig } from "./components/dialog/az-dialog";
import { IFormItem } from "./components/form/az-form";
import { AzInputType } from "./components/input/az-input";
import { ButtonConfig as ButtonConfig1 } from "./components/notification/az-notification";
import { TabItemConfig } from "./components/tabs/az-tabs";
import { AzTreeItem, IAzTreeItem } from "./components/tree/az-tree-item";
import { SerializeOptions, TreeItemVisitor } from "./components/tree/az-tree";
export namespace Components {
    interface AzButton {
        "caption": string;
        "circle": boolean;
        "disabled": boolean;
        "icon": string;
        "iconPosition": PositionHorizontal;
        "round": boolean;
        "size": ComponentSize;
        /**
          * Button type
         */
        "type": ComponentStyle;
    }
    interface AzCheckbox {
        "caption": string;
        "checked": boolean;
        "indeterminate": boolean;
        "toJson": (detailed?: boolean) => Promise<{ tag: string; caption: string; checked: boolean; } & { indeterminate: boolean; }>;
        "toggle": () => Promise<void>;
    }
    interface AzColorPicker {
        "caption": string;
        "color": string;
        "colorfmt": string;
        "readonly": boolean;
        "showinput": boolean;
    }
    interface AzContextualMenu {
        "caption": string;
        "closedelay": number;
        "closeevent": string;
        "modifiers": ModifierCombinations;
        "parent": string;
        "popupalign": string;
        "triggerevent": string;
    }
    interface AzDialog {
        "buttons": ButtonConfig[];
        "canclose": (reason: string) => boolean;
        "caption": string;
        "clickmaskclose": boolean;
        "closable": boolean;
        "close": (reason?: string) => Promise<void>;
        "content": string;
        "fixed": boolean;
        "hide": () => Promise<this>;
        "mask": boolean;
        "modal": boolean;
        "show": () => Promise<this>;
    }
    interface AzForm {
        "caption": string;
        "deserialize": (items: IFormItem[]) => Promise<void>;
        "fromJson": (data: Record<string, any>) => Promise<void>;
        "items": IFormItem[];
        "labelPosition": 'left' | 'right' | 'top';
        "serialize": (detailed?: boolean) => Promise<any[]>;
        "toJson": (initialValue?: {}, root?: string) => Promise<any>;
    }
    interface AzGroup {
        "caption": string;
        "itemEvent": string;
        "itemProp": string;
        "itemSelector": string;
        "itemValue": any;
        "limit": number;
    }
    interface AzHr {
        "caption": string;
        "captionPosition": PositionHorizontal;
        "icon": string;
        "iconPosition": PositionHorizontal;
    }
    interface AzIcon {
        "caption": string;
        "color": string;
        "height": number | string;
        "hoverEffect": 'border' | 'background' | string | undefined;
        "icon": string;
        "register": boolean;
        "svgAttr": Record<string, string>;
        "tag": string;
        "wait": boolean;
        "width": number | string;
    }
    interface AzInput {
        "autocapitalize": string;
        "autocomplete": string;
        "autocorrect": string;
        "caption": string;
        "clear": () => Promise<void>;
        "clearable": boolean;
        "constrain": boolean;
        "max": number;
        "min": number;
        "popupalign": string;
        "readonly": boolean;
        "spellcheck": boolean;
        "toJson": (detailed?: boolean) => Promise<{ tag: string; caption: string; value: string; } & { type: AzInputType; clearable: boolean; }>;
        "type": AzInputType;
        "value": string;
    }
    interface AzMenuItem {
        "action": string;
        "caption": string;
        "extraIcon": string;
        "extraText": string;
        "icon": string;
        "type": ComponentStyle;
    }
    interface AzNotification {
        "buttons": ButtonConfig[];
        "caption": string;
        "closable": boolean;
        "close": (reason?: string) => Promise<void>;
        "html": string;
        "icon": string;
        "indicator": boolean;
        "message": string;
        "placement": Placement;
        "show": () => Promise<void>;
        "timeout": number;
        "type": ComponentStyle;
    }
    interface AzPanel {
        "basis": string;
        "caption": string;
        "direction": 'vertical' | 'horizontal';
        "maxHeight": string;
        "maxWidth": string;
        "minHeight": string;
        "minWidth": string;
    }
    interface AzProgressBar {
        "caption": string;
        "max": number;
        "min": number;
        "value": number;
    }
    interface AzRadio {
        "caption": string;
        "checked": boolean;
        "toggle": () => Promise<void>;
        "type": ComponentStyle;
    }
    interface AzSection {
        "arrowPosition": 'left' | 'right';
        "caption": string;
        "captionPosition": PositionHorizontal;
        "collapsable": boolean;
        "collapse": () => Promise<void>;
        "collapsed": boolean;
        "expand": () => Promise<void>;
        "icon": string;
        "iconPosition": PositionHorizontal;
    }
    interface AzSelect {
    }
    interface AzSlider {
        "caption": string;
        "max": string | number;
        "min": string | number;
        "value": string | number;
    }
    interface AzSplitter {
        "direction": 'horizontal' | 'vertical';
        "disabled": boolean;
        "gap": number;
    }
    interface AzSwitch {
        "caption": string;
        "size": ComponentSize;
        "toJson": (detailed?: boolean) => Promise<{ tag: string; caption: string; value: boolean; } & { type: ComponentStyle; size: ComponentSize; }>;
        "type": ComponentStyle;
        "value": boolean;
    }
    interface AzTabs {
        "activeIndex": number;
        "addItem": (it: TabItemConfig | string) => Promise<void>;
        "indicator": boolean;
        "items": TabItemConfig[];
        "removeItem": (caption: string) => Promise<void>;
        "removeItemAt": (index: number) => Promise<void>;
    }
    interface AzToolbar {
        "caption": string;
        "direction": string;
    }
    interface AzTooltip {
        "caption": string;
        "delay": number;
        "isShow": boolean;
        "placement": 'top' | 'bottom' | 'left' | 'right';
        "trigger": 'hover' | 'click' | 'manual';
    }
    interface AzTree {
        "DndDataType": string;
        "activeItem": AzTreeItem;
        "activeOnMiddleButtonDown": boolean;
        "addItem": (itemOrCaption: AzTreeItem | string, parent?: AzTreeItem | number, attrs?: any) => Promise<AzTreeItem>;
        "caption": string;
        "checkedItems": Set<AzTreeItem>;
        "clearActiveItem": () => Promise<void>;
        "collapsAll": () => Promise<void>;
        "expandAll": (level: number) => Promise<void>;
        "find": (predicate: TreeItemVisitor) => Promise<any>;
        "findAll": (predicate: TreeItemVisitor) => Promise<any[]>;
        "fromJson": (items: IAzTreeItem[]) => Promise<void>;
        "icon": string;
        "iconPosition": PositionHorizontal;
        "itemDraggable": boolean;
        "items": AzTreeItem[];
        "removeItem": (indexOrItem: number | AzTreeItem) => Promise<void>;
        "selecting": boolean;
        "setActiveItem": (item: AzTreeItem, clear?: boolean) => Promise<void>;
        "toJson": (opts?: SerializeOptions) => Promise<(string | Record<keyof IAzTreeItem, any>)[]>;
        "traverse": (visit: TreeItemVisitor) => Promise<void>;
    }
}
declare global {
    interface HTMLAzButtonElement extends Components.AzButton, HTMLStencilElement {
    }
    var HTMLAzButtonElement: {
        prototype: HTMLAzButtonElement;
        new (): HTMLAzButtonElement;
    };
    interface HTMLAzCheckboxElement extends Components.AzCheckbox, HTMLStencilElement {
    }
    var HTMLAzCheckboxElement: {
        prototype: HTMLAzCheckboxElement;
        new (): HTMLAzCheckboxElement;
    };
    interface HTMLAzColorPickerElement extends Components.AzColorPicker, HTMLStencilElement {
    }
    var HTMLAzColorPickerElement: {
        prototype: HTMLAzColorPickerElement;
        new (): HTMLAzColorPickerElement;
    };
    interface HTMLAzContextualMenuElement extends Components.AzContextualMenu, HTMLStencilElement {
    }
    var HTMLAzContextualMenuElement: {
        prototype: HTMLAzContextualMenuElement;
        new (): HTMLAzContextualMenuElement;
    };
    interface HTMLAzDialogElement extends Components.AzDialog, HTMLStencilElement {
    }
    var HTMLAzDialogElement: {
        prototype: HTMLAzDialogElement;
        new (): HTMLAzDialogElement;
    };
    interface HTMLAzFormElement extends Components.AzForm, HTMLStencilElement {
    }
    var HTMLAzFormElement: {
        prototype: HTMLAzFormElement;
        new (): HTMLAzFormElement;
    };
    interface HTMLAzGroupElement extends Components.AzGroup, HTMLStencilElement {
    }
    var HTMLAzGroupElement: {
        prototype: HTMLAzGroupElement;
        new (): HTMLAzGroupElement;
    };
    interface HTMLAzHrElement extends Components.AzHr, HTMLStencilElement {
    }
    var HTMLAzHrElement: {
        prototype: HTMLAzHrElement;
        new (): HTMLAzHrElement;
    };
    interface HTMLAzIconElement extends Components.AzIcon, HTMLStencilElement {
    }
    var HTMLAzIconElement: {
        prototype: HTMLAzIconElement;
        new (): HTMLAzIconElement;
    };
    interface HTMLAzInputElement extends Components.AzInput, HTMLStencilElement {
    }
    var HTMLAzInputElement: {
        prototype: HTMLAzInputElement;
        new (): HTMLAzInputElement;
    };
    interface HTMLAzMenuItemElement extends Components.AzMenuItem, HTMLStencilElement {
    }
    var HTMLAzMenuItemElement: {
        prototype: HTMLAzMenuItemElement;
        new (): HTMLAzMenuItemElement;
    };
    interface HTMLAzNotificationElement extends Components.AzNotification, HTMLStencilElement {
    }
    var HTMLAzNotificationElement: {
        prototype: HTMLAzNotificationElement;
        new (): HTMLAzNotificationElement;
    };
    interface HTMLAzPanelElement extends Components.AzPanel, HTMLStencilElement {
    }
    var HTMLAzPanelElement: {
        prototype: HTMLAzPanelElement;
        new (): HTMLAzPanelElement;
    };
    interface HTMLAzProgressBarElement extends Components.AzProgressBar, HTMLStencilElement {
    }
    var HTMLAzProgressBarElement: {
        prototype: HTMLAzProgressBarElement;
        new (): HTMLAzProgressBarElement;
    };
    interface HTMLAzRadioElement extends Components.AzRadio, HTMLStencilElement {
    }
    var HTMLAzRadioElement: {
        prototype: HTMLAzRadioElement;
        new (): HTMLAzRadioElement;
    };
    interface HTMLAzSectionElement extends Components.AzSection, HTMLStencilElement {
    }
    var HTMLAzSectionElement: {
        prototype: HTMLAzSectionElement;
        new (): HTMLAzSectionElement;
    };
    interface HTMLAzSelectElement extends Components.AzSelect, HTMLStencilElement {
    }
    var HTMLAzSelectElement: {
        prototype: HTMLAzSelectElement;
        new (): HTMLAzSelectElement;
    };
    interface HTMLAzSliderElement extends Components.AzSlider, HTMLStencilElement {
    }
    var HTMLAzSliderElement: {
        prototype: HTMLAzSliderElement;
        new (): HTMLAzSliderElement;
    };
    interface HTMLAzSplitterElement extends Components.AzSplitter, HTMLStencilElement {
    }
    var HTMLAzSplitterElement: {
        prototype: HTMLAzSplitterElement;
        new (): HTMLAzSplitterElement;
    };
    interface HTMLAzSwitchElement extends Components.AzSwitch, HTMLStencilElement {
    }
    var HTMLAzSwitchElement: {
        prototype: HTMLAzSwitchElement;
        new (): HTMLAzSwitchElement;
    };
    interface HTMLAzTabsElement extends Components.AzTabs, HTMLStencilElement {
    }
    var HTMLAzTabsElement: {
        prototype: HTMLAzTabsElement;
        new (): HTMLAzTabsElement;
    };
    interface HTMLAzToolbarElement extends Components.AzToolbar, HTMLStencilElement {
    }
    var HTMLAzToolbarElement: {
        prototype: HTMLAzToolbarElement;
        new (): HTMLAzToolbarElement;
    };
    interface HTMLAzTooltipElement extends Components.AzTooltip, HTMLStencilElement {
    }
    var HTMLAzTooltipElement: {
        prototype: HTMLAzTooltipElement;
        new (): HTMLAzTooltipElement;
    };
    interface HTMLAzTreeElement extends Components.AzTree, HTMLStencilElement {
    }
    var HTMLAzTreeElement: {
        prototype: HTMLAzTreeElement;
        new (): HTMLAzTreeElement;
    };
    interface HTMLElementTagNameMap {
        "az-button": HTMLAzButtonElement;
        "az-checkbox": HTMLAzCheckboxElement;
        "az-color-picker": HTMLAzColorPickerElement;
        "az-contextual-menu": HTMLAzContextualMenuElement;
        "az-dialog": HTMLAzDialogElement;
        "az-form": HTMLAzFormElement;
        "az-group": HTMLAzGroupElement;
        "az-hr": HTMLAzHrElement;
        "az-icon": HTMLAzIconElement;
        "az-input": HTMLAzInputElement;
        "az-menu-item": HTMLAzMenuItemElement;
        "az-notification": HTMLAzNotificationElement;
        "az-panel": HTMLAzPanelElement;
        "az-progress-bar": HTMLAzProgressBarElement;
        "az-radio": HTMLAzRadioElement;
        "az-section": HTMLAzSectionElement;
        "az-select": HTMLAzSelectElement;
        "az-slider": HTMLAzSliderElement;
        "az-splitter": HTMLAzSplitterElement;
        "az-switch": HTMLAzSwitchElement;
        "az-tabs": HTMLAzTabsElement;
        "az-toolbar": HTMLAzToolbarElement;
        "az-tooltip": HTMLAzTooltipElement;
        "az-tree": HTMLAzTreeElement;
    }
}
declare namespace LocalJSX {
    interface AzButton {
        "caption"?: string;
        "circle"?: boolean;
        "disabled"?: boolean;
        "icon"?: string;
        "iconPosition"?: PositionHorizontal;
        "round"?: boolean;
        "size"?: ComponentSize;
        /**
          * Button type
         */
        "type"?: ComponentStyle;
    }
    interface AzCheckbox {
        "caption"?: string;
        "checked"?: boolean;
        "indeterminate"?: boolean;
        "onChanged"?: (event: CustomEvent<any>) => void;
    }
    interface AzColorPicker {
        "caption"?: string;
        "color"?: string;
        "colorfmt"?: string;
        "onChanged"?: (event: CustomEvent<any>) => void;
        "readonly"?: boolean;
        "showinput"?: boolean;
    }
    interface AzContextualMenu {
        "caption"?: string;
        "closedelay"?: number;
        "closeevent"?: string;
        "modifiers"?: ModifierCombinations;
        "onHidden"?: (event: CustomEvent<any>) => void;
        "onShowed"?: (event: CustomEvent<any>) => void;
        "parent"?: string;
        "popupalign"?: string;
        "triggerevent"?: string;
    }
    interface AzDialog {
        "buttons"?: ButtonConfig[];
        "canclose"?: (reason: string) => boolean;
        "caption"?: string;
        "clickmaskclose"?: boolean;
        "closable"?: boolean;
        "content"?: string;
        "fixed"?: boolean;
        "mask"?: boolean;
        "modal"?: boolean;
        "onClosed"?: (event: CustomEvent<any>) => void;
        "onHid"?: (event: CustomEvent<any>) => void;
    }
    interface AzForm {
        "caption"?: string;
        "items"?: IFormItem[];
        "labelPosition"?: 'left' | 'right' | 'top';
    }
    interface AzGroup {
        "caption"?: string;
        "itemEvent"?: string;
        "itemProp"?: string;
        "itemSelector"?: string;
        "itemValue"?: any;
        "limit"?: number;
    }
    interface AzHr {
        "caption"?: string;
        "captionPosition"?: PositionHorizontal;
        "icon"?: string;
        "iconPosition"?: PositionHorizontal;
    }
    interface AzIcon {
        "caption"?: string;
        "color"?: string;
        "height"?: number | string;
        "hoverEffect"?: 'border' | 'background' | string | undefined;
        "icon"?: string;
        "register"?: boolean;
        "svgAttr"?: Record<string, string>;
        "tag"?: string;
        "wait"?: boolean;
        "width"?: number | string;
    }
    interface AzInput {
        "autocapitalize"?: string;
        "autocomplete"?: string;
        "autocorrect"?: string;
        "caption"?: string;
        "clearable"?: boolean;
        "constrain"?: boolean;
        "max"?: number;
        "min"?: number;
        "popupalign"?: string;
        "readonly"?: boolean;
        "spellcheck"?: boolean;
        "type"?: AzInputType;
        "value"?: string;
    }
    interface AzMenuItem {
        "action"?: string;
        "caption"?: string;
        "extraIcon"?: string;
        "extraText"?: string;
        "icon"?: string;
        "onSelected"?: (event: CustomEvent<any>) => void;
        "type"?: ComponentStyle;
    }
    interface AzNotification {
        "buttons"?: ButtonConfig[];
        "caption"?: string;
        "closable"?: boolean;
        "html"?: string;
        "icon"?: string;
        "indicator"?: boolean;
        "message"?: string;
        "onClosed"?: (event: CustomEvent<any>) => void;
        "onShowed"?: (event: CustomEvent<any>) => void;
        "placement"?: Placement;
        "timeout"?: number;
        "type"?: ComponentStyle;
    }
    interface AzPanel {
        "basis"?: string;
        "caption"?: string;
        "direction"?: 'vertical' | 'horizontal';
        "maxHeight"?: string;
        "maxWidth"?: string;
        "minHeight"?: string;
        "minWidth"?: string;
    }
    interface AzProgressBar {
        "caption"?: string;
        "max"?: number;
        "min"?: number;
        "value"?: number;
    }
    interface AzRadio {
        "caption"?: string;
        "checked"?: boolean;
        "onChanged"?: (event: CustomEvent<any>) => void;
        "type"?: ComponentStyle;
    }
    interface AzSection {
        "arrowPosition"?: 'left' | 'right';
        "caption"?: string;
        "captionPosition"?: PositionHorizontal;
        "collapsable"?: boolean;
        "collapsed"?: boolean;
        "icon"?: string;
        "iconPosition"?: PositionHorizontal;
    }
    interface AzSelect {
    }
    interface AzSlider {
        "caption"?: string;
        "max"?: string | number;
        "min"?: string | number;
        "value"?: string | number;
    }
    interface AzSplitter {
        "direction"?: 'horizontal' | 'vertical';
        "disabled"?: boolean;
        "gap"?: number;
    }
    interface AzSwitch {
        "caption"?: string;
        "onChanged"?: (event: CustomEvent<any>) => void;
        "size"?: ComponentSize;
        "type"?: ComponentStyle;
        "value"?: boolean;
    }
    interface AzTabs {
        "activeIndex"?: number;
        "indicator"?: boolean;
        "items"?: TabItemConfig[];
        "onClosed"?: (event: CustomEvent<any>) => void;
    }
    interface AzToolbar {
        "caption"?: string;
        "direction"?: string;
    }
    interface AzTooltip {
        "caption"?: string;
        "delay"?: number;
        "isShow"?: boolean;
        "placement"?: 'top' | 'bottom' | 'left' | 'right';
        "trigger"?: 'hover' | 'click' | 'manual';
    }
    interface AzTree {
        "DndDataType"?: string;
        "activeItem"?: AzTreeItem;
        "activeOnMiddleButtonDown"?: boolean;
        "caption"?: string;
        "checkedItems"?: Set<AzTreeItem>;
        "icon"?: string;
        "iconPosition"?: PositionHorizontal;
        "itemDraggable"?: boolean;
        "items"?: AzTreeItem[];
        "onCollapsed"?: (event: CustomEvent<any>) => void;
        "onExpanded"?: (event: CustomEvent<any>) => void;
        "onInserted"?: (event: CustomEvent<any>) => void;
        "onItemdragover"?: (event: CustomEvent<any>) => void;
        "onItemdrop"?: (event: CustomEvent<any>) => void;
        "onItemremoved"?: (event: CustomEvent<any>) => void;
        "onItemremoving"?: (event: CustomEvent<any>) => void;
        "onSelected"?: (event: CustomEvent<any>) => void;
        "selecting"?: boolean;
    }
    interface IntrinsicElements {
        "az-button": AzButton;
        "az-checkbox": AzCheckbox;
        "az-color-picker": AzColorPicker;
        "az-contextual-menu": AzContextualMenu;
        "az-dialog": AzDialog;
        "az-form": AzForm;
        "az-group": AzGroup;
        "az-hr": AzHr;
        "az-icon": AzIcon;
        "az-input": AzInput;
        "az-menu-item": AzMenuItem;
        "az-notification": AzNotification;
        "az-panel": AzPanel;
        "az-progress-bar": AzProgressBar;
        "az-radio": AzRadio;
        "az-section": AzSection;
        "az-select": AzSelect;
        "az-slider": AzSlider;
        "az-splitter": AzSplitter;
        "az-switch": AzSwitch;
        "az-tabs": AzTabs;
        "az-toolbar": AzToolbar;
        "az-tooltip": AzTooltip;
        "az-tree": AzTree;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "az-button": LocalJSX.AzButton & JSXBase.HTMLAttributes<HTMLAzButtonElement>;
            "az-checkbox": LocalJSX.AzCheckbox & JSXBase.HTMLAttributes<HTMLAzCheckboxElement>;
            "az-color-picker": LocalJSX.AzColorPicker & JSXBase.HTMLAttributes<HTMLAzColorPickerElement>;
            "az-contextual-menu": LocalJSX.AzContextualMenu & JSXBase.HTMLAttributes<HTMLAzContextualMenuElement>;
            "az-dialog": LocalJSX.AzDialog & JSXBase.HTMLAttributes<HTMLAzDialogElement>;
            "az-form": LocalJSX.AzForm & JSXBase.HTMLAttributes<HTMLAzFormElement>;
            "az-group": LocalJSX.AzGroup & JSXBase.HTMLAttributes<HTMLAzGroupElement>;
            "az-hr": LocalJSX.AzHr & JSXBase.HTMLAttributes<HTMLAzHrElement>;
            "az-icon": LocalJSX.AzIcon & JSXBase.HTMLAttributes<HTMLAzIconElement>;
            "az-input": LocalJSX.AzInput & JSXBase.HTMLAttributes<HTMLAzInputElement>;
            "az-menu-item": LocalJSX.AzMenuItem & JSXBase.HTMLAttributes<HTMLAzMenuItemElement>;
            "az-notification": LocalJSX.AzNotification & JSXBase.HTMLAttributes<HTMLAzNotificationElement>;
            "az-panel": LocalJSX.AzPanel & JSXBase.HTMLAttributes<HTMLAzPanelElement>;
            "az-progress-bar": LocalJSX.AzProgressBar & JSXBase.HTMLAttributes<HTMLAzProgressBarElement>;
            "az-radio": LocalJSX.AzRadio & JSXBase.HTMLAttributes<HTMLAzRadioElement>;
            "az-section": LocalJSX.AzSection & JSXBase.HTMLAttributes<HTMLAzSectionElement>;
            "az-select": LocalJSX.AzSelect & JSXBase.HTMLAttributes<HTMLAzSelectElement>;
            "az-slider": LocalJSX.AzSlider & JSXBase.HTMLAttributes<HTMLAzSliderElement>;
            "az-splitter": LocalJSX.AzSplitter & JSXBase.HTMLAttributes<HTMLAzSplitterElement>;
            "az-switch": LocalJSX.AzSwitch & JSXBase.HTMLAttributes<HTMLAzSwitchElement>;
            "az-tabs": LocalJSX.AzTabs & JSXBase.HTMLAttributes<HTMLAzTabsElement>;
            "az-toolbar": LocalJSX.AzToolbar & JSXBase.HTMLAttributes<HTMLAzToolbarElement>;
            "az-tooltip": LocalJSX.AzTooltip & JSXBase.HTMLAttributes<HTMLAzTooltipElement>;
            "az-tree": LocalJSX.AzTree & JSXBase.HTMLAttributes<HTMLAzTreeElement>;
        }
    }
}
