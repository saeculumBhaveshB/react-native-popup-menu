import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface PopupPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PopupMenuProps {
  /**
   * Whether the popup is visible
   */
  isVisible: boolean;

  /**
   * Position of the target element that triggered the popup
   */
  position: PopupPosition;

  /**
   * Called when the popup should be closed
   */
  onClose: () => void;

  /**
   * Content to be rendered inside the popup
   */
  children: ReactNode;

  /**
   * Optional custom styles for the popup container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional custom background color for the popup
   * @default 'white'
   */
  backgroundColor?: string;

  /**
   * Optional custom width for the popup
   * @default 250
   */
  width?: number;

  /**
   * Optional custom border radius for the popup
   * @default 8
   */
  borderRadius?: number;

  /**
   * Whether to show the arrow pointer
   * @default true
   */
  showArrow?: boolean;

  /**
   * Optional custom color for the arrow pointer
   * @default same as backgroundColor
   */
  arrowColor?: string;
}
