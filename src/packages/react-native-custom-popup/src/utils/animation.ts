import { Animated } from 'react-native';

export const createSpringAnimation = (
  value: Animated.Value,
  toValue: number,
  tension: number = 40,
  friction: number = 7,
) => {
  return Animated.spring(value, {
    toValue,
    useNativeDriver: true,
    tension,
    friction,
  });
};

export const createFadeAnimation = (
  value: Animated.Value,
  toValue: number,
  duration: number = 200,
) => {
  return Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver: true,
  });
};

export const runParallelAnimations = (
  animations: Animated.CompositeAnimation[],
) => {
  return Animated.parallel(animations).start();
};
