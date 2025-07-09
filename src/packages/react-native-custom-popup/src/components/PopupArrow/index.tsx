import React, { useMemo } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { PopupArrowProps } from './types';

export const PopupArrow: React.FC<PopupArrowProps> = React.memo(
  ({ position, height, backgroundColor }) => {
    const width = height * 2;

    // Memoize path calculation
    const path = useMemo(() => {
      return position.direction === 'up'
        ? `M0 ${height} L${width / 2} 0 L${width} ${height} Z`
        : `M0 0 L${width / 2} ${height} L${width} 0 Z`;
    }, [position.direction, height, width]);

    // Memoize container style
    const containerStyle = useMemo(
      () => ({
        position: 'absolute' as const,
        left: position.x - width / 2,
        top: position.y - (position.direction === 'up' ? 0 : height),
      }),
      [position.x, position.y, position.direction, width, height],
    );

    return (
      <View style={containerStyle}>
        <Svg width={width} height={height}>
          <Path d={path} fill={backgroundColor} />
        </Svg>
      </View>
    );
  },
);
