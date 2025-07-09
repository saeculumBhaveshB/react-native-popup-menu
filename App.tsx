/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  I18nManager,
  type View as ViewType,
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { PopupMenu } from './src/packages/react-native-custom-popup/src/components/PopupMenu';
import { PopupInput } from './src/packages/react-native-custom-popup/src/components/PopupInput';
import { logger } from './src/packages/react-native-custom-popup/src/utils/logger';

const TEST_ITEMS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  value: '',
}));

const App = () => {
  const [items, setItems] = useState(TEST_ITEMS);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const itemRefs = useRef<{ [key: number]: ViewType }>({});
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const lastMeasuredItemPosition = useRef<{
    y: number;
    height: number;
    originalScrollY: number;
  } | null>(null);

  // Enable LayoutAnimation for smooth transitions
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, []);

  // Track scroll position
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  // Function to measure and update popup position
  const updatePopupPosition = useCallback((itemId: number) => {
    const itemRef = itemRefs.current[itemId];
    if (itemRef) {
      itemRef.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          logger.debug('Updating popup position', {
            pageX,
            pageY,
            width,
            height,
          });

          setPopupPosition({
            x: pageX + width + 10,
            y: pageY + height / 2,
          });
        },
      );
    }
  }, []);

  // Handle keyboard events
  React.useEffect(() => {
    const keyboardWillShow = (e: KeyboardEvent) => {
      if (!selectedItem || !scrollViewRef.current) return;

      // Get current scroll position
      const currentScrollY = scrollOffset;

      // Store original position if not already stored
      if (!lastMeasuredItemPosition.current?.originalScrollY) {
        lastMeasuredItemPosition.current = {
          ...lastMeasuredItemPosition.current!,
          originalScrollY: currentScrollY,
        };
      }

      const itemRef = itemRefs.current[selectedItem];
      if (itemRef) {
        itemRef.measure(
          (
            x: number,
            y: number,
            width: number,
            height: number,
            pageX: number,
            pageY: number,
          ) => {
            const keyboardHeight = e.endCoordinates.height;
            const screenHeight = e.endCoordinates.screenY - keyboardHeight;
            const itemBottom = pageY + height;

            // Calculate how much we need to scroll
            if (itemBottom > screenHeight) {
              const scrollOffset = itemBottom - screenHeight + 50;

              // Scroll instantly
              scrollViewRef.current?.scrollTo({
                y: scrollOffset,
                animated: false,
              });

              // Update positions after a small delay to ensure scroll is complete
              setTimeout(() => {
                updatePopupPosition(selectedItem);
              }, 50);
            }
          },
        );
      }
    };

    const keyboardWillHide = () => {
      if (
        !selectedItem ||
        !scrollViewRef.current ||
        !lastMeasuredItemPosition.current
      )
        return;

      const { originalScrollY } = lastMeasuredItemPosition.current;

      // Restore original scroll position instantly
      scrollViewRef.current.scrollTo({
        y: originalScrollY,
        animated: false,
      });

      // Update popup position after scroll is complete
      setTimeout(() => {
        updatePopupPosition(selectedItem);
      }, 50);
    };

    const keyboardShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardWillShow,
    );
    const keyboardHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardWillHide,
    );

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, [selectedItem, updatePopupPosition, scrollOffset]);

  const handleItemPress = useCallback(
    (id: number) => {
      logger.debug('Item pressed', { id });
      const itemRef = itemRefs.current[id];
      if (itemRef) {
        itemRef.measure(
          (
            x: number,
            y: number,
            width: number,
            height: number,
            pageX: number,
            pageY: number,
          ) => {
            logger.debug('Item position measured', {
              pageX,
              pageY,
              width,
              height,
            });

            // Store the measured position and current scroll position
            lastMeasuredItemPosition.current = {
              y: pageY,
              height,
              originalScrollY: scrollOffset,
            };

            setPopupPosition({
              x: pageX + width + 10,
              y: pageY + height / 2,
            });
            setSelectedItem(id);
            setIsPopupVisible(true);
          },
        );
      }
    },
    [scrollOffset],
  );

  const handlePopupClose = useCallback(() => {
    logger.debug('Popup closed');
    setIsPopupVisible(false);
    setSelectedItem(null);
    lastMeasuredItemPosition.current = null;
    Keyboard.dismiss();
  }, []);

  const handleInputChange = useCallback(
    (text: string) => {
      if (selectedItem !== null) {
        logger.debug('Input changed', { itemId: selectedItem, text });
        setItems(prev =>
          prev.map(item =>
            item.id === selectedItem ? { ...item, value: text } : item,
          ),
        );
      }
    },
    [selectedItem],
  );

  const toggleRTL = useCallback(() => {
    logger.info('Toggling RTL mode');
    I18nManager.forceRTL(!I18nManager.isRTL);
    // Reload app to apply RTL changes
    if (Platform.OS === 'android') {
      logger.debug('Reloading app for RTL changes');
      require('react-native').NativeModules.DevSettings.reload();
    }
  }, []);

  const simulateError = useCallback(() => {
    logger.warn('Simulating error');
    throw new Error('Test error for error boundary');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popup Menu Test App</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="always"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {items.map(item => (
          <TouchableOpacity
            key={item.id}
            ref={ref => {
              if (ref) {
                itemRefs.current[item.id] = ref;
              }
            }}
            style={[
              styles.item,
              selectedItem === item.id && styles.selectedItem,
            ]}
            onPress={() => handleItemPress(item.id)}
            accessible={true}
            accessibilityLabel={`Item ${item.id}`}
            accessibilityHint="Double tap to edit value"
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
            {item.value ? (
              <Text style={styles.itemValue}>{item.value}</Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <PopupMenu
        isVisible={isPopupVisible}
        position={popupPosition}
        onClose={handlePopupClose}
      >
        <PopupInput
          value={
            selectedItem
              ? items.find(i => i.id === selectedItem)?.value || ''
              : ''
          }
          onChange={handleInputChange}
          placeholder="Enter value..."
          accessible={true}
          accessibilityLabel="Value input"
          accessibilityHint="Enter a value for the selected item"
        />
      </PopupMenu>

      {/* <TouchableOpacity
        style={styles.errorButton}
        onPress={simulateError}
        accessible={true}
        accessibilityLabel="Simulate error"
        accessibilityHint="Triggers an error to test error boundary"
      >
        <Text>Simulate Error</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  itemTitle: {
    fontSize: 16,
  },
  itemValue: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  rtlButton: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  errorButton: {
    padding: 8,
    backgroundColor: '#ffcdd2',
    borderRadius: 4,
    margin: 16,
    alignItems: 'center',
  },
});

export default App;
