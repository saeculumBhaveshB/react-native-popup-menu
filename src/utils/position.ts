import { Dimensions } from 'react-native';
import type { Position } from '../components/popup/types';
import { POPUP_WIDTH, ARROW_HEIGHT } from '../components/popup/styles';

const SCREEN_PADDING = 16;

export const calculatePopupPosition = (itemPosition: Position) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Calculate horizontal position
  let x = itemPosition.x + (itemPosition.width - POPUP_WIDTH) / 2;
  x = Math.max(
    SCREEN_PADDING,
    Math.min(x, screenWidth - POPUP_WIDTH - SCREEN_PADDING),
  );

  // Calculate vertical position
  const spaceAbove = itemPosition.y;
  const spaceBelow = screenHeight - (itemPosition.y + itemPosition.height);

  const showAbove = spaceBelow < 200 && spaceAbove > spaceBelow;

  const y = showAbove
    ? itemPosition.y - ARROW_HEIGHT
    : itemPosition.y + itemPosition.height + ARROW_HEIGHT;

  return {
    x,
    y,
    showAbove,
  };
};
