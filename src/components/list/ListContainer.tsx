import React, { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { ListContainerProps, ListItem } from './types';
import { ListItem as ListItemComponent } from './ListItem';

export const ListContainer: React.FC<ListContainerProps> = ({
  onItemPress,
}) => {
  const data = useMemo(() => {
    return Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      text: `Item ${index + 1}`,
    }));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListItemComponent item={item} onPress={onItemPress} />
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
  },
});
