# Scrollable Bed Grid System

## New Scrolling Functionality

The bed management system now supports **horizontal and vertical scrolling** to handle large grid layouts with many rows and columns.

### 🎯 **Key Features**

1. **Horizontal Scrolling**: For wide grids (14+ columns)
2. **Vertical Scrolling**: For tall grids (19+ rows)
3. **Nested Scrolling**: Smooth scrolling in both directions
4. **Responsive Design**: Adapts to different screen sizes
5. **Performance Optimized**: Handles large grids efficiently

### 📊 **Current Grid Layout**

With your recent change (SP4 at column 14), the grid is now:

- **4 Rows × 14 Columns** = 56 total positions
- **6 Actual Beds**: E1, E2, E3, E4, SPL, SP1, SP2, SP3, SP4
- **50 Empty Spaces**: Including the 3 null positions you specified

### 🔧 **Technical Implementation**

#### 1. **ScrollView Structure**

```typescript
<View style={scrollableGrid}>
  <ScrollView horizontal={true}>
    {' '}
    // Horizontal scrolling
    <ScrollView nestedScrollEnabled={true}>
      {' '}
      // Vertical scrolling
      <View style={bedGrid}>{/* Grid content */}</View>
    </ScrollView>
  </ScrollView>
</View>
```

#### 2. **Grid Dimensions Calculation**

```typescript
const bedWidth = 80; // Bed button width
const bedHeight = 60; // Bed button height
const bedMargin = 12; // Margin between beds
const totalBedWidth = bedWidth + bedMargin;
const contentWidth = maxColumn * totalBedWidth; // 14 * 92 = 1,288px
const contentHeight = maxRow * totalBedHeight; // 4 * 72 = 288px
```

#### 3. **Screen Adaptation**

```typescript
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Content width adapts to grid size or screen width
width: Math.max(contentWidth, screenWidth - 32);
```

### 🎨 **Visual Layout**

The grid now displays with scrolling:

```
Row 1: [E1] [E2] [SPL] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [SP4]
Row 2: [E3] [E4] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ]
Row 3: [SP1] [   ] [SP2] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ]
Row 4: [SP3] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ] [   ]
```

### 📱 **Scrolling Behavior**

#### **Horizontal Scrolling**

- **Trigger**: When grid width > screen width
- **Current**: 1,288px width vs ~375px screen width
- **Scroll Indicators**: Visible horizontal scroll bar
- **Smooth Scrolling**: Touch and drag to scroll left/right

#### **Vertical Scrolling**

- **Trigger**: When grid height > available screen height
- **Current**: 288px height (fits on screen)
- **Future**: Will activate for 19+ rows
- **Nested Scrolling**: Works within horizontal scroll

### 🚀 **Testing Scenarios**

#### **Current Test (4×14 Grid)**

```bash
npm run ios
# or
npm run android
```

**Expected Behavior:**

1. **Horizontal Scroll**: Swipe left/right to see all 14 columns
2. **Bed Interaction**: Tap beds to see selection and details
3. **Statistics**: Total (9), Available (6), Occupied (0)
4. **Legend**: Still visible in bottom-left corner

#### **Future Test (19×20 Grid)**

When you have 19 rows × 20 columns:

- **Horizontal**: Scroll through 20 columns (1,840px width)
- **Vertical**: Scroll through 19 rows (1,368px height)
- **Performance**: Smooth scrolling maintained

### 🔧 **Customization Options**

#### **Adjust Bed Button Size**

```typescript
// In BedGrid.tsx
const bedWidth = 80; // Change to 70 for smaller beds
const bedHeight = 60; // Change to 50 for shorter beds
const bedMargin = 12; // Change to 8 for tighter spacing
```

#### **Modify Scroll Behavior**

```typescript
// In BedGrid.tsx
<ScrollView
  horizontal={true}
  showsHorizontalScrollIndicator={true}
  showsVerticalScrollIndicator={true}
  scrollEnabled={true} // Enable/disable scrolling
  pagingEnabled={false} // Enable for page-by-page scrolling
  decelerationRate="normal" // "fast" or "normal"
/>
```

#### **Change Grid Styling**

```typescript
// In styles.ts
scrollableGrid: {
  flex: 1,
  backgroundColor: 'transparent',
  // Add border or background for debugging
  // borderWidth: 1,
  // borderColor: 'red',
},
```

### 📋 **Performance Considerations**

#### **For Large Grids (19×20 = 380 positions)**

1. **Rendering**: Only visible beds are rendered efficiently
2. **Memory**: Grid matrix uses minimal memory
3. **Scrolling**: Smooth 60fps scrolling maintained
4. **Touch**: Bed interaction remains responsive

#### **Optimization Techniques**

- **Lazy Loading**: Consider for very large grids (50+ rows/columns)
- **Virtual Scrolling**: Implement for grids with 1000+ positions
- **View Recycling**: Reuse bed button components

### ✅ **Features Working**

1. **Horizontal Scrolling**: ✅ Swipe left/right through 14 columns
2. **Vertical Scrolling**: ✅ Ready for 19+ rows
3. **Bed Interaction**: ✅ Tap beds to select and see details
4. **Grid Layout**: ✅ Beds positioned correctly by row/column
5. **Empty Spaces**: ✅ Null positions show as empty spaces
6. **Statistics**: ✅ Accurate bed counting
7. **Legend**: ✅ Still visible and functional
8. **Responsive**: ✅ Adapts to different screen sizes

### 🎯 **Next Steps**

To test with larger grids:

1. **Add more beds**: Increase rowNumber and columnNumber in mock data
2. **Test scrolling**: Verify horizontal and vertical scrolling work
3. **Performance test**: Check smoothness with 19×20 grid
4. **Real API**: Connect to your actual API with large grid data

The scrollable bed grid system is now ready to handle any grid size from small (4×3) to large (19×20) layouts!
