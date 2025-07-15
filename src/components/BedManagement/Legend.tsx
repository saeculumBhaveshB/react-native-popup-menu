import React from 'react';
import { View, Text } from 'react-native';
import { LegendProps } from './types';
import { bedManagementStyles } from './styles';

export const Legend: React.FC<LegendProps> = ({
  availableColor,
  occupiedColor,
}) => {
  return (
    <View style={bedManagementStyles.legend}>
      <Text style={bedManagementStyles.legendTitle}>Status Guide</Text>

      <View style={bedManagementStyles.legendItem}>
        <View
          style={[
            bedManagementStyles.legendColor,
            { backgroundColor: availableColor },
          ]}
        />
        <Text style={bedManagementStyles.legendText}>Available</Text>
      </View>

      <View style={bedManagementStyles.legendItem}>
        <View
          style={[
            bedManagementStyles.legendColor,
            { backgroundColor: occupiedColor },
          ]}
        />
        <Text style={bedManagementStyles.legendText}>Occupied</Text>
      </View>
    </View>
  );
};
