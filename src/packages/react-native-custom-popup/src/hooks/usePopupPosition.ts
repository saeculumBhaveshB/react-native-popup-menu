import { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { PopupPosition } from '../components/PopupMenu/types';

interface UsePopupPositionProps {
  triggerPosition: PopupPosition;
  popupWidth: number;
  arrowHeight: number;
  margin?: number;
}

interface ArrowPosition {
  x: number;
  y: number;
  direction: 'up' | 'down';
}

export const usePopupPosition = ({
  triggerPosition,
  popupWidth,
  arrowHeight,
  margin = 8,
}: UsePopupPositionProps) => {
  return useMemo(() => {
    const { width: screenWidth, height: screenHeight } =
      Dimensions.get('window');
    const halfPopupWidth = popupWidth / 2;

    // Calculate horizontal position
    let x = triggerPosition.x - halfPopupWidth;
    x = Math.max(margin, Math.min(x, screenWidth - popupWidth - margin));

    // Calculate if popup should appear above or below the trigger
    const spaceBelow = screenHeight - triggerPosition.y;
    const spaceAbove = triggerPosition.y;
    const showBelow = spaceBelow >= spaceAbove;

    // Calculate vertical position
    const y = showBelow
      ? triggerPosition.y + arrowHeight
      : triggerPosition.y - arrowHeight;

    // Calculate arrow position
    const arrowX = triggerPosition.x;
    const arrowY = showBelow ? triggerPosition.y : triggerPosition.y;

    return {
      popupPosition: { x, y },
      arrowPosition: {
        x: arrowX,
        y: arrowY,
        direction: showBelow ? 'up' : 'down',
      } as ArrowPosition,
    };
  }, [triggerPosition, popupWidth, arrowHeight, margin]);
};
