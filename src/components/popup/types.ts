export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PopupMenuProps {
  isVisible: boolean;
  position: Position;
  onClose: () => void;
  onInputChange: (text: string) => void;
  inputValue: string;
}

export interface PopupInputProps {
  value: string;
  onChange: (text: string) => void;
  onSubmitEditing: () => void;
}

export interface PopupArrowProps {
  direction: 'up' | 'down';
  color?: string;
}

export interface CloseButtonProps {
  onPress: () => void;
}
