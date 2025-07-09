import React, { useEffect } from 'react';
import { View, Modal, TouchableWithoutFeedback, Animated } from 'react-native';
import { PopupMenuProps } from './types';
import { createStyles } from './styles';
import { PopupArrow } from '../PopupArrow';
import { CloseButton } from '../CloseButton';
import { usePopupAnimation } from '../../hooks/usePopupAnimation';
import { usePopupPosition } from '../../hooks/usePopupPosition';

export const PopupMenu: React.FC<PopupMenuProps> = ({
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
  const styles = createStyles({
    width,
    borderRadius,
    backgroundColor,
    shadowColor,
  });
  const { scale, opacity, startAnimation } = usePopupAnimation();
  const { popupPosition, arrowPosition } = usePopupPosition({
    triggerPosition: position,
    popupWidth: width,
    arrowHeight,
  });

  useEffect(() => {
    if (isVisible) {
      startAnimation(true);
    }
  }, [isVisible, startAnimation]);

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1 }}>
          <Animated.View
            style={[
              styles.container,
              {
                transform: [{ scale }],
                opacity,
                left: popupPosition.x,
                top: popupPosition.y,
              },
              style,
            ]}
          >
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
