import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
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

  // Calculate grid dimensions
  const bedWidth = 80; // Width of each bed button
  const bedHeight = 60; // Height of each bed button
  const bedMargin = 12; // Margin between beds
  const totalBedWidth = bedWidth + bedMargin;
  const totalBedHeight = bedHeight + 12; // 12 is marginBottom from bedRow

  // Calculate content size
  const contentWidth = maxColumn * totalBedWidth;
  const contentHeight = maxRow * totalBedHeight;

  // Get screen dimensions
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

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
    <View style={bedManagementStyles.scrollableGrid}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          width: Math.max(contentWidth, screenWidth - 32), // 32 for container padding
        }}
      >
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            minHeight: contentHeight,
          }}
        >
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
        </ScrollView>
      </ScrollView>
    </View>
  );
};
