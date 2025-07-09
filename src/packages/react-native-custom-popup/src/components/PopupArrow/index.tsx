import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { PopupArrowProps } from './types';

export const PopupArrow: React.FC<PopupArrowProps> = ({
  size = 12,
  color = '#FFFFFF',
}) => {
  // Calculate points for a triangle
  const points = `${size},0 0,${size} ${size * 2},${size}`;

  return (
    <Svg width={size * 2} height={size} viewBox={`0 0 ${size * 2} ${size}`}>
      <Path d={`M${points}`} fill={color} />
    </Svg>
  );
};
