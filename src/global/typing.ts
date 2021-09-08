import { forceUpdate } from '@stencil/core';

import { AzDialog } from '../components/dialog/az-dialog';
import { AzIcon } from '../components/icons/az-icon';
import { AzNotification } from '../components/notification/az-notification';
import { get, isNumber, isPlainObject, set, stringToPath } from '../utils';
import { PermutationOfCombination } from '../utils/type-utils';

export type ComponentStyle = 'plain' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
export type ComponentSize = 'extra-small' | 'small' | 'normal' | 'medium' | 'large' | 'extra-large';

export type CenterPlacement = 'center';
export type EdgePlacement = 'top-center' | 'bottom-center' | 'right-center' | 'left-center';
export type CornerPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type Placement = EdgePlacement | CornerPlacement | CenterPlacement;

export type PositionHorizontal = 'left' | 'right' | CenterPlacement;
export type PositionVertical = 'top' | 'bottom' | CenterPlacement;

export type ModifierKeys = 'meta' | 'ctrl' | 'shift' | 'alt';
export type ModifierCombinations = '' | PermutationOfCombination<ModifierKeys>;

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
export enum MouseButton {
  /**
   * Main button pressed, usually the left button or the un-initialized state
   */
  Main = 0,
  /**
   * Auxiliary button pressed, usually the wheel button or the middle button (if present)
   */
  Auxiliary = 1,
  /**
   * Secondary button pressed, usually the right button
   */
  Secondary = 2,
  /**
   * Fourth button, typically the Browser Back button
   */
  Fourth = 3,
  /**
   * Fifth button, typically the Browser Forward button
   */
  Fifth = 4,
};

export type MouseOrKeyboardEvent = MouseEvent | KeyboardEvent;
declare global {
  export interface Window {
    aztec: object & {
      // utils/index.ts
      version: string,
      HTMLInputElementSpecialAttrs: string[],
      utils: {
        get: typeof get,
        set: typeof set,
        isNumber: typeof isNumber
        isPlainObject: typeof isPlainObject,
        forceUpdate: typeof forceUpdate;
        stringToPath: typeof stringToPath,
      },
      debug: Record<string, boolean>,

      icons: string[],
      registerIcon: typeof AzIcon['registerIcon']
      aliasIcon: typeof AzIcon['aliasIcon'],
      deleteIcon: typeof AzIcon['deleteIcon'],
      renameIcon: typeof AzIcon['renameIcon'],

      // az-dialog.tsx
      Dialog: typeof AzDialog
      // az-notification.tsx
      Notification: typeof AzNotification
    };
  }
}
