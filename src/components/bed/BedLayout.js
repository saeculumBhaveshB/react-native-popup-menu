import React from 'react';
import { View, StyleSheet } from 'react-native';
import BedLegend from './BedLegend';
import BedGrid from './BedGrid';

export default function BedLayout({ beds }) {
  return (
    <View style={styles.container}>
      <BedLegend />
      <BedGrid beds={beds} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
});
