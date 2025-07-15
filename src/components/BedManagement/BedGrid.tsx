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
  // Find the maximum row and column numbers to create the grid
  const maxRow = Math.max(...bedLayouts.map(bed => bed.rowNumber));
  const maxColumn = Math.max(...bedLayouts.map(bed => bed.columnNumber));

  // Create a grid matrix
  const gridMatrix: (BedLayout | null)[][] = [];

  // Initialize the grid with null values
  for (let row = 1; row <= maxRow; row++) {
    gridMatrix[row] = [];
    for (let col = 1; col <= maxColumn; col++) {
      gridMatrix[row][col] = null;
    }
  }

  // Fill the grid with bed data
  bedLayouts.forEach(bed => {
    gridMatrix[bed.rowNumber][bed.columnNumber] = bed;
  });

  return (
    <View style={bedManagementStyles.bedGrid}>
      {Array.from({ length: maxRow }, (_, rowIndex) => {
        const rowNumber = rowIndex + 1;
        return (
          <View key={rowNumber} style={bedManagementStyles.bedRow}>
            {Array.from({ length: maxColumn }, (_, colIndex) => {
              const columnNumber = colIndex + 1;
              const bed = gridMatrix[rowNumber][columnNumber];

              if (bed && bed.bedNumber) {
                // Render bed button for valid beds
                return (
                  <BedButton
                    key={bed.bedUuid || `${rowNumber}-${columnNumber}`}
                    bed={bed}
                    isSelected={selectedBed?.bedUuid === bed.bedUuid}
                    onPress={onBedPress}
                  />
                );
              } else {
                // Render empty space for null beds or empty positions
                return (
                  <View
                    key={`empty-${rowNumber}-${columnNumber}`}
                    style={bedManagementStyles.emptySpace}
                  />
                );
              }
            })}
          </View>
        );
      })}
    </View>
  );
};
