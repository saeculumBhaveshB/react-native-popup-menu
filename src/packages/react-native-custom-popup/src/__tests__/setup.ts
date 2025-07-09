import { NativeModules } from 'react-native';

// Mock the Dimensions API
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn().mockReturnValue({
    width: 375,
    height: 812,
    scale: 1,
    fontScale: 1,
  }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock the Keyboard API
NativeModules.Keyboard = {
  addListener: jest.fn(),
  removeListener: jest.fn(),
  dismiss: jest.fn(),
};

// Mock react-native-svg
jest.mock('react-native-svg', () => ({
  Svg: 'Svg',
  Path: 'Path',
}));
