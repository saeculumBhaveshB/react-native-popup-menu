import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { BedButtonProps } from './types';
import { bedManagementStyles } from './styles';

export const BedButton: React.FC<BedButtonProps> = ({
  bed,
  isSelected,
  onPress,
}) => {
  // Don't render if bed number is null
  if (!bed.bedNumber) {
    return null;
  }

  const getButtonStyle = () => {
    if (isSelected) {
      return [
        bedManagementStyles.bedButton,
        bedManagementStyles.bedButtonSelected,
      ];
    }

    if (bed.status === 'AVAILABLE') {
      return [
        bedManagementStyles.bedButton,
        bedManagementStyles.bedButtonAvailable,
      ];
    } else {
      return [
        bedManagementStyles.bedButton,
        bedManagementStyles.bedButtonOccupied,
      ];
    }
  };

  const getTextStyle = () => {
    if (isSelected) {
      return [
        bedManagementStyles.bedNumber,
        bedManagementStyles.bedNumberSelected,
      ];
    }
    return bedManagementStyles.bedNumber;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={() => onPress(bed)}
      activeOpacity={0.7}
    >
      {/* Vertical white bar on the left */}
      <View style={bedManagementStyles.verticalBar} />

      {/* Bed number in the center */}
      <Text style={getTextStyle()}>{bed.bedNumber}</Text>
    </TouchableOpacity>
  );
};
