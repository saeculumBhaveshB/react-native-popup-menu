import { TextInputProps } from 'react-native';

export interface PopupInputProps
  extends Omit<TextInputProps, 'style' | 'onChangeText' | 'onChange'> {
  value: string;
  onChange: (text: string) => void;
  containerStyle?: TextInputProps['style'];
  inputStyle?: TextInputProps['style'];
  borderColor?: string;
  focusedBorderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
}
