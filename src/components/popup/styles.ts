import { StyleSheet } from 'react-native';

export const POPUP_WIDTH = 250;
export const ARROW_HEIGHT = 12;
export const ARROW_WIDTH = 24;

export default StyleSheet.create({
  container: {
    position: 'absolute',
    width: POPUP_WIDTH,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    margin: 12,
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
