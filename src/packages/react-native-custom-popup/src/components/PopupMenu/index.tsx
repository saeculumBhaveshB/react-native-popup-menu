import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from './styles';
import { PopupArrow } from '../PopupArrow';
import { logger } from '../../utils/logger';
import type { PopupMenuProps } from './types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const POPUP_WIDTH = 250; // Fixed popup width
const ARROW_SIZE = 12; // Size of the arrow pointer

export const PopupMenu: React.FC<PopupMenuProps> = ({
  isVisible,
  position,
  onClose,
  children,
}) => {
  if (!isVisible) return null;

  // Calculate if popup should appear on left or right side
  const shouldShowOnLeft = position.x + POPUP_WIDTH + ARROW_SIZE > SCREEN_WIDTH;

  // Calculate final popup position
  const popupStyle = {
    position: 'absolute' as const,
    left: shouldShowOnLeft
      ? position.x - POPUP_WIDTH - ARROW_SIZE // Show on left
      : position.x, // Show on right
    top: position.y - POPUP_WIDTH / 4, // Center vertically relative to the point
  };

  // Calculate arrow position and direction
  const arrowStyle = {
    position: 'absolute' as const,
    top: POPUP_WIDTH / 4 - ARROW_SIZE / 2, // Align with popup center
    [shouldShowOnLeft ? 'right' : 'left']: -ARROW_SIZE,
    transform: [{ rotate: shouldShowOnLeft ? '0deg' : '180deg' }],
  };

  logger.debug('Rendering popup with position', {
    position,
    shouldShowOnLeft,
    popupStyle,
    arrowStyle,
  });

  return (
    <View style={[styles.container, popupStyle]}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={onClose}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <View style={arrowStyle}>
        <PopupArrow size={ARROW_SIZE} color="#FFFFFF" />
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};
