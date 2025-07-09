import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, Platform } from 'react-native';

interface KeyboardState {
  keyboardHeight: number;
  isKeyboardVisible: boolean;
}

export const useKeyboard = () => {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    keyboardHeight: 0,
    isKeyboardVisible: false,
  });

  useEffect(() => {
    const handleKeyboardShow = (event: KeyboardEvent) => {
      const keyboardHeight = event.endCoordinates.height;
      setKeyboardState({
        keyboardHeight,
        isKeyboardVisible: true,
      });
    };

    const handleKeyboardHide = () => {
      setKeyboardState({
        keyboardHeight: 0,
        isKeyboardVisible: false,
      });
    };

    let showSubscription;
    let hideSubscription;

    if (Platform.OS === 'ios') {
      showSubscription = Keyboard.addListener(
        'keyboardWillShow',
        handleKeyboardShow,
      );
      hideSubscription = Keyboard.addListener(
        'keyboardWillHide',
        handleKeyboardHide,
      );
    } else {
      showSubscription = Keyboard.addListener(
        'keyboardDidShow',
        handleKeyboardShow,
      );
      hideSubscription = Keyboard.addListener(
        'keyboardDidHide',
        handleKeyboardHide,
      );
    }

    return () => {
      showSubscription?.remove();
      hideSubscription?.remove();
    };
  }, []);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return {
    ...keyboardState,
    dismissKeyboard,
  };
};
