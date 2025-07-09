import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { CloseButtonProps } from './types';

export const CloseButton: React.FC<CloseButtonProps> = ({
  onPress,
  color = '#000000',
  size = 24,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          width: size + 20,
          height: size + 20,
        },
      ]}
    >
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          fill={color}
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
