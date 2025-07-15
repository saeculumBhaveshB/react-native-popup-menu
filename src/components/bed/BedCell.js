import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Helper function to get bed status colors
const getStatusColor = status => {
  if (status === 'OCCUPIED') return '#23C16B';
  if (status === 'AVAILABLE') return '#fff';
  return '#f0f0f0';
};

const getBorderColor = status => {
  if (status === 'OCCUPIED' || status === 'AVAILABLE') return '#23C16B';
  return '#ddd';
};

export default function BedCell({ bed }) {
  if (!bed.bedNumber) return <View style={styles.emptyCell} />;

  return (
    <View
      style={[
        styles.bedCell,
        {
          backgroundColor: getStatusColor(bed.status),
          borderColor: getBorderColor(bed.status),
        },
      ]}
    >
      <Text
        style={{
          color: bed.status === 'OCCUPIED' ? '#fff' : '#23C16B',
          fontWeight: 'bold',
        }}
      >
        {bed.bedNumber}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bedCell: {
    width: 80,
    height: 48,
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCell: {
    width: 80,
    height: 48,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },
});
