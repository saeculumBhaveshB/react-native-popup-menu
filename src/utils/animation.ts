import { Animated } from 'react-native';

export const createAnimationConfig = () => {
  const opacity = new Animated.Value(0);
  const scale = new Animated.Value(0.95);

  const show = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hide = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  return {
    opacity,
    scale,
    show,
    hide,
  };
};
