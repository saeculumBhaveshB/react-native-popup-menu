import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BedLegend() {
  return (
    <View style={styles.legend}>
      <View style={[styles.legendItem, { borderColor: '#23C16B' }]} />
      <Text style={styles.legendLabel}>Available</Text>
      <View
        style={[
          styles.legendItem,
          { backgroundColor: '#23C16B', borderColor: '#23C16B' },
        ]}
      />
      <Text style={styles.legendLabel}>Occupied</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  legendItem: {
    width: 24,
    height: 16,
    marginHorizontal: 4,
    borderWidth: 2,
    borderRadius: 6,
  },
  legendLabel: { marginRight: 12, fontSize: 15 },
});
