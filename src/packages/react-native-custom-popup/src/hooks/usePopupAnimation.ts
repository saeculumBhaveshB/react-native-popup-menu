import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export const usePopupAnimation = (duration = 200) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const startAnimation = useCallback(
    (show: boolean) => {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: show ? 1 : 0,
          useNativeDriver: true,
          tension: 40,
          friction: 7,
        }),
        Animated.timing(opacity, {
          toValue: show ? 1 : 0,
          duration,
          useNativeDriver: true,
        }),
      ]).start();
    },
    [scale, opacity, duration],
  );

  return {
    scale,
    opacity,
    startAnimation,
  };
};
