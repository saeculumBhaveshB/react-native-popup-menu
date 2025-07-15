import React from 'react';
import { View } from 'react-native';
import { BedLayout } from './types';
import { BedButton } from './BedButton';
import { bedManagementStyles } from './styles';

interface BedGridProps {
  bedLayouts: BedLayout[];
  selectedBed: BedLayout | null;
  onBedPress: (bed: BedLayout) => void;
}

export const BedGrid: React.FC<BedGridProps> = ({
  bedLayouts,
  selectedBed,
  onBedPress,
}) => {
  // Group beds by row number
  const bedsByRow = bedLayouts.reduce((acc, bed) => {
    const row = bed.rowNumber;
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(bed);
    return acc;
  }, {} as Record<number, BedLayout[]>);

  // Sort beds within each row by column number
  Object.keys(bedsByRow).forEach(rowKey => {
    const row = parseInt(rowKey);
    bedsByRow[row].sort((a, b) => a.columnNumber - b.columnNumber);
  });

  // Get sorted row numbers
  const rowNumbers = Object.keys(bedsByRow)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <View style={bedManagementStyles.bedGrid}>
      {rowNumbers.map(rowNumber => (
        <View key={rowNumber} style={bedManagementStyles.bedRow}>
          {bedsByRow[rowNumber].map(bed => (
            <BedButton
              key={bed.bedUuid}
              bed={bed}
              isSelected={selectedBed?.bedUuid === bed.bedUuid}
              onPress={onBedPress}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
