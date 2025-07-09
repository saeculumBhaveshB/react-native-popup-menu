import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export interface PopupInputProps extends Omit<TextInputProps, 'style'> {
  /**
   * Current value of the input
   */
  value: string;

  /**
   * Called when the input text changes
   */
  onChangeText: (text: string) => void;

  /**
   * Optional custom styles for the input container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Optional custom styles for the text input
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * Optional custom border color for the input
   * @default '#e0e0e0'
   */
  borderColor?: string;

  /**
   * Optional custom border width for the input
   * @default 1
   */
  borderWidth?: number;

  /**
   * Optional custom border radius for the input
   * @default 4
   */
  borderRadius?: number;

  /**
   * Optional custom padding for the input
   * @default 12
   */
  padding?: number;
}
