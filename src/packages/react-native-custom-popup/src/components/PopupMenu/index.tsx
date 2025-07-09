import React, { useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { CloseButton } from '../CloseButton';
import { PopupArrow } from '../PopupArrow';
import { PopupMenuProps } from './types';
import { usePopupAnimation } from '../../hooks/usePopupAnimation';
import { usePopupPosition } from '../../hooks/usePopupPosition';
import { useKeyboard } from '../../hooks/useKeyboard';
import { createStyles } from './styles';
import { ErrorBoundary } from '../ErrorBoundary';

const PopupMenuComponent: React.FC<PopupMenuProps> = ({
  isVisible,
  position,
  onClose,
  children,
  style,
  width = 250,
  borderRadius = 8,
  backgroundColor = 'white',
  shadowColor = '#000000',
  arrowHeight = 12,
}) => {
  const styles = useMemo(
    () => createStyles({ width, borderRadius, backgroundColor, shadowColor }),
    [width, borderRadius, backgroundColor, shadowColor],
  );

  const { scale, opacity, startAnimation } = usePopupAnimation();
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();

  const { height: screenHeight } = Dimensions.get('window');

  const adjustedPosition = useMemo(() => {
    if (!isKeyboardVisible) return position;

    const keyboardY = screenHeight - keyboardHeight;
    if (position.y + width > keyboardY) {
      return {
        ...position,
        y: keyboardY - width - 20,
      };
    }
    return position;
  }, [position, isKeyboardVisible, keyboardHeight, screenHeight, width]);

  const { popupPosition, arrowPosition } = usePopupPosition({
    triggerPosition: adjustedPosition,
    popupWidth: width,
    arrowHeight,
  });

  const animatedStyles = useMemo(
    () => [
      styles.container,
      {
        transform: [{ scale }],
        opacity,
        left: popupPosition.x,
        top: popupPosition.y,
      },
      style,
    ],
    [styles.container, scale, opacity, popupPosition.x, popupPosition.y, style],
  );

  useEffect(() => {
    if (isVisible) {
      startAnimation(true);
    }
  }, [isVisible, startAnimation]);

  const handleBackdropPress = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} onRequestClose={onClose}>
      <TouchableWithoutFeedback
        onPress={handleBackdropPress}
        testID="popup-backdrop"
      >
        <View style={styles.backdrop}>
          <Animated.View style={animatedStyles} testID="popup-container">
            <CloseButton onPress={onClose} />
            <PopupArrow
              position={arrowPosition}
              height={arrowHeight}
              backgroundColor={backgroundColor}
            />
            <View style={styles.content}>{children}</View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const PopupMenu = (props: PopupMenuProps) => (
  <ErrorBoundary>
    <PopupMenuComponent {...props} />
  </ErrorBoundary>
);

export { PopupMenu };
