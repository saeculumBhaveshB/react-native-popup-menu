import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { PopupArrowProps } from './types';

export const PopupArrow: React.FC<PopupArrowProps> = ({
  position,
  height,
  backgroundColor,
}) => {
  const width = height * 2;
  const path =
    position.direction === 'up'
      ? `M0 ${height} L${width / 2} 0 L${width} ${height} Z`
      : `M0 0 L${width / 2} ${height} L${width} 0 Z`;

  return (
    <View
      style={{
        position: 'absolute',
        left: position.x - width / 2,
        top: position.y - (position.direction === 'up' ? 0 : height),
      }}
    >
      <Svg width={width} height={height}>
        <Path d={path} fill={backgroundColor} />
      </Svg>
    </View>
  );
};
