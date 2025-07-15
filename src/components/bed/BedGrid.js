import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BedCell from './BedCell'; // Import BedCell component for each cell

export default function BedGrid({ beds }) {
  // Ensure beds is an array, default to an empty array if not
  if (!Array.isArray(beds)) {
    console.error('Beds prop is not an array:', beds);
    beds = [];
  }

  // Prepare a 4x3 grid as per the provided data
  const rows = [[], [], [], []];

  // Fill the rows with bed data from the beds array
  beds.forEach(bed => {
    if (bed.rowNumber && bed.columnNumber) {
      rows[bed.rowNumber - 1][bed.columnNumber - 1] = bed;
    }
  });

  // Fill missing cells with empty objects to maintain the grid
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      if (!rows[r][c]) rows[r][c] = {};
    }
  }

  return (
    <View>
      {rows.map((row, i) => (
        <View style={styles.row} key={i}>
          {row.map((bed, j) => (
            <BedCell bed={bed} key={j} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 18,
    justifyContent: 'center',
  },
});
