import { Keyboard, Platform } from 'react-native';

export const createKeyboardConfig = () => {
  const keyboardDidShow = (event: any) => {
    const keyboardHeight = event.endCoordinates.height;
    return keyboardHeight;
  };

  const keyboardDidHide = () => {
    return 0;
  };

  const addKeyboardListeners = (
    onShow: (height: number) => void,
    onHide: () => void,
  ) => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      event => onShow(keyboardDidShow(event)),
    );

    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => onHide(),
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  };

  return {
    addKeyboardListeners,
  };
};
