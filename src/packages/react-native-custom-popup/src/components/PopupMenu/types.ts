import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface PopupPosition {
  x: number;
  y: number;
}

export interface PopupMenuProps {
  isVisible: boolean;
  position: PopupPosition;
  onClose: () => void;
  children: ReactNode;
  style?: ViewStyle;
  width?: number;
  borderRadius?: number;
  backgroundColor?: string;
  shadowColor?: string;
  arrowHeight?: number;
}
