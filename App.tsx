/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ListContainer } from './src/components/list/ListContainer';
import type { ListItem } from './src/components/list/types';

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Generate 100 items for the list
const generateItems = (): ListItem[] => {
  return Array.from({ length: 100 }, (_, index) => ({
    id: `item-${index + 1}`,
    text: `Item ${index + 1}`,
  }));
};

const App = () => {
  const [items] = useState<ListItem[]>(generateItems());
  const [selectedItem, setSelectedItem] = useState<{
    item: ListItem;
    position: Position;
  } | null>(null);

  const handleItemPress = useCallback((item: ListItem, position: Position) => {
    setSelectedItem({ item, position });
    console.log('Selected item:', item.text, 'at position:', position);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ListContainer items={items} onItemPress={handleItemPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
