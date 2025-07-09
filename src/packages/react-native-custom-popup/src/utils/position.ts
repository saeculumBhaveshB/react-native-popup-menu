import { Dimensions } from 'react-native';
import { PopupPosition } from '../components/PopupMenu/types';

export const calculatePopupPosition = (
  triggerPosition: PopupPosition,
  popupWidth: number,
  popupHeight: number,
  margin: number = 8,
) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const halfPopupWidth = popupWidth / 2;

  // Calculate horizontal position
  let x = triggerPosition.x - halfPopupWidth;
  x = Math.max(margin, Math.min(x, screenWidth - popupWidth - margin));

  // Calculate vertical position
  const spaceBelow = screenHeight - triggerPosition.y;
  const spaceAbove = triggerPosition.y;
  const showBelow = spaceBelow >= popupHeight + margin;

  const y = showBelow
    ? triggerPosition.y + margin
    : triggerPosition.y - popupHeight - margin;

  return {
    x,
    y,
    showBelow,
  };
};
