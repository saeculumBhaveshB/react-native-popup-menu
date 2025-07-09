import { StyleSheet } from 'react-native';

export const createStyles = ({
  borderColor = '#e0e0e0',
  borderWidth = 1,
  borderRadius = 4,
  padding = 12,
}) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    input: {
      borderColor,
      borderWidth,
      borderRadius,
      padding,
      fontSize: 16,
      color: '#000000',
      backgroundColor: '#ffffff',
    },
    focused: {
      borderColor: '#007AFF',
    },
    accessoryContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderTopWidth: 1,
      borderTopColor: '#d0d0d0',
    },
  });
