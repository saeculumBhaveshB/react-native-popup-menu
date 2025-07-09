import React, { useCallback, useRef } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import type { ListItemProps } from './types';

export const ListItem: React.FC<ListItemProps> = ({ item, onPress }) => {
  const viewRef = useRef<View>(null);

  const handlePress = useCallback(() => {
    viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
      onPress(item, { x: pageX, y: pageY, width, height });
    });
  }, [item, onPress]);

  return (
    <TouchableHighlight onPress={handlePress} underlayColor="#f0f0f0">
      <View ref={viewRef} style={styles.container}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  text: {
    fontSize: 16,
    color: '#000000',
  },
});
