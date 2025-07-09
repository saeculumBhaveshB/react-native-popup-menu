import React, { useCallback } from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  View,
  GestureResponderEvent,
} from 'react-native';
import type { ListItemProps } from './types';

export const ListItem: React.FC<ListItemProps> = ({ item, onPress }) => {
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      const { pageX, pageY } = event.nativeEvent;
      onPress(item, { x: pageX, y: pageY });
    },
    [item, onPress],
  );

  return (
    <TouchableHighlight
      onPress={handlePress}
      underlayColor="#f0f0f0"
      style={styles.container}
    >
      <View>
        <Text style={styles.text}>{item.text}</Text>
        <View style={styles.separator} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
    color: '#000000',
  },
  separator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
});
