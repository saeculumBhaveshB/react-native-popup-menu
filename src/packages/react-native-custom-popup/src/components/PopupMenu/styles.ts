import { StyleSheet } from 'react-native';

export const createStyles = ({
  width = 250,
  borderRadius = 8,
  backgroundColor = 'white',
  shadowColor = '#000000',
}) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    container: {
      position: 'absolute',
      width,
      backgroundColor,
      borderRadius,
      shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    content: {
      padding: 16,
    },
  });
