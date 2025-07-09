import React, { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import type { ListContainerProps, ListItem } from './types';
import { ListItem as ListItemComponent } from './ListItem';

export const ListContainer: React.FC<ListContainerProps> = ({
  items,
  onItemPress,
}) => {
  const renderItem = ({ item }: { item: ListItem }) => (
    <ListItemComponent item={item} onPress={onItemPress} />
  );

  const keyExtractor = (item: ListItem) => item.id;

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.container}
      windowSize={5}
      maxToRenderPerBatch={10}
      removeClippedSubviews={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
