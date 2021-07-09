import { PermutationOfCombination } from "../utils/type-utils";

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
