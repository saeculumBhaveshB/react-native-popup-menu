# Bed Management System

A React Native application for managing hospital bed layouts with real-time status tracking.

## Features

### 🏥 Bed Layout Display

- **Grid Layout**: Beds are arranged in a grid based on `rowNumber` and `columnNumber` from the API
- **Visual Status Indicators**:
  - 🟢 **Available**: Light green background
  - ⚫ **Occupied**: Light gray background
  - 🟢 **Selected**: Dark green background (when tapped)
- **Bed Information**: Each bed displays its `bedNumber` in the center
- **Touchable Interface**: Each bed is a touchable button that shows details when pressed

### 📊 Statistics Dashboard

- **Total Beds**: Shows the total number of beds in the ward
- **Available Beds**: Count of currently available beds
- **Occupied Beds**: Count of currently occupied beds

### 🎨 Visual Design

- **Color Scheme**: Matches the provided design image
- **Legend**: Bottom-left corner shows color guide for Available/Occupied status
- **Responsive Layout**: Adapts to different screen sizes
- **Modern UI**: Clean, professional hospital management interface

## API Integration

The system is designed to work with the provided API response structure:

```json
{
  "ward": {
    "uuid": "b5da9afd-b29a-4cbf-91c9-ccf2aa5f799e",
    "display": "Emergency",
    "name": "Emergency"
  },
  "totalBeds": 9,
  "occupiedBeds": 1,
  "bedLayouts": [
    {
      "rowNumber": 1,
      "columnNumber": 1,
      "bedNumber": "E1",
      "bedId": 1,
      "bedUuid": "cc318f30-6414-4cb7-883d-de409a344175",
      "status": "Occupied",
      "location": "Emergency Ward",
      "bedType": {
        "name": "Normal",
        "displayName": "NM"
      }
    }
  ]
}
```

### Key Data Points Used:

- **`totalBeds`**: Total number of beds to display
- **`occupiedBeds`**: Number of occupied beds for statistics
- **`bedLayouts`**: Array of bed objects with positioning and status
- **`rowNumber` & `columnNumber`**: Grid positioning
- **`bedNumber`**: Display name in the center of each bed
- **`status`**: "AVAILABLE" or "Occupied" for color coding
- **`bedType`**: Additional bed information

## Component Structure

```
src/components/BedManagement/
├── index.ts                 # Main exports
├── types.ts                 # TypeScript interfaces
├── styles.ts                # Styling definitions
├── BedManagementScreen.tsx  # Main screen component
├── BedGrid.tsx             # Grid layout component
├── BedButton.tsx           # Individual bed button
└── Legend.tsx              # Status legend component
```

## Usage

### Running the App

```bash
# Install dependencies
npm install

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Integration with Real API

To connect to your actual API, replace the mock data in `BedManagementScreen.tsx`:

```typescript
// Replace this mock API call:
const mockApiResponse: BedManagementResponse = { ... };

// With actual API call:
const fetchBedData = async () => {
  try {
    const response = await fetch('your-api-endpoint');
    const data = await response.json();
    setBedData(data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching bed data:', error);
    setLoading(false);
  }
};
```

## Customization

### Colors

Modify colors in `styles.ts`:

```typescript
bedButtonAvailable: {
  backgroundColor: '#90EE90', // Light green for available
  borderColor: '#7FBF7F',     // Border color
},
bedButtonOccupied: {
  backgroundColor: '#D3D3D3', // Light gray for occupied
  borderColor: '#B0B0B0',     // Border color
},
```

### Bed Button Size

Adjust bed button dimensions in `styles.ts`:

```typescript
bedButton: {
  width: 80,    // Adjust width
  height: 60,   // Adjust height
  // ... other styles
},
```

### Layout Spacing

Modify grid spacing in `styles.ts`:

```typescript
bedRow: {
  marginBottom: 12,  // Vertical spacing between rows
},
bedButton: {
  marginRight: 12,   // Horizontal spacing between beds
},
```

## Features Implemented

✅ **Grid Layout**: Beds arranged by row/column from API  
✅ **Status Colors**: Available (green) vs Occupied (gray)  
✅ **Touchable Beds**: Each bed is a button with press feedback  
✅ **Selection State**: Selected bed shows dark green  
✅ **Bed Numbers**: Displayed in center of each bed  
✅ **Legend**: Color guide in bottom-left corner  
✅ **Statistics**: Total, Available, Occupied bed counts  
✅ **Loading State**: Shows loading indicator while fetching data  
✅ **Error Handling**: Graceful error states  
✅ **TypeScript**: Full type safety  
✅ **Responsive Design**: Works on different screen sizes

## Next Steps

To enhance the system, consider adding:

1. **Real-time Updates**: WebSocket connection for live status changes
2. **Bed Details Modal**: Detailed view when bed is tapped
3. **Search/Filter**: Filter beds by status or type
4. **Patient Information**: Show patient details for occupied beds
5. **Bed Assignment**: Allow assigning patients to beds
6. **Multiple Wards**: Support for multiple ward views
7. **Offline Support**: Cache bed data for offline viewing

## Technical Details

- **React Native**: 0.80.1
- **TypeScript**: Full type safety
- **State Management**: React hooks (useState, useEffect)
- **Styling**: StyleSheet with responsive design
- **API Integration**: Fetch API with error handling
- **Performance**: Optimized rendering with proper key props

## Support

For questions or issues with the bed management system, please refer to the component documentation or create an issue in the repository.
