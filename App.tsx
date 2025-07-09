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
  Dimensions,
} from 'react-native';
import { PopupMenu } from './src/packages/react-native-custom-popup/src/components/PopupMenu';
import { PopupInput } from './src/packages/react-native-custom-popup/src/components/PopupInput';
import { logger } from './src/packages/react-native-custom-popup/src/utils/logger';

const TEST_ITEMS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  value: '',
}));

const SCREEN_HEIGHT = Dimensions.get('window').height;
const HEADER_HEIGHT = 60; // Height of the "Popup Menu Test App" header
const KEYBOARD_PADDING = 20;

const App = () => {
  const [items, setItems] = useState(TEST_ITEMS);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const itemRefs = useRef<{ [key: number]: ViewType }>({});
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
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

  // Track scroll position and content size
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollViewLayout = useCallback((event: any) => {
    setScrollViewHeight(event.nativeEvent.layout.height);
  }, []);

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

  // Function to ensure item is visible when keyboard shows
  const ensureItemVisible = useCallback(
    (itemId: number, keyboardHeight: number, screenHeight: number) => {
      const itemRef = itemRefs.current[itemId];
      if (!itemRef || !scrollViewRef.current) return;

      itemRef.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          const itemTop = pageY;
          const itemBottom = pageY + height;
          const visibleAreaTop = HEADER_HEIGHT;
          const visibleAreaBottom = screenHeight - keyboardHeight;
          const visibleHeight = visibleAreaBottom - visibleAreaTop;

          if (Platform.OS === 'ios') {
            // iOS: Calculate the ideal position to keep the item visible
            const idealPosition = Math.max(0, itemTop - visibleHeight / 3);
            scrollViewRef.current?.scrollTo({
              y: idealPosition,
              animated: true,
            });
          } else {
            // Android: Adjust scroll only if item would be hidden by keyboard
            if (itemBottom > visibleAreaBottom) {
              const scrollOffset =
                itemBottom - visibleAreaBottom + KEYBOARD_PADDING;
              scrollViewRef.current?.scrollTo({
                y: scrollOffset,
                animated: false,
              });
            }
          }

          // Update popup position after scroll
          setTimeout(
            () => {
              updatePopupPosition(itemId);
            },
            Platform.OS === 'ios' ? 300 : 50,
          );
        },
      );
    },
    [updatePopupPosition],
  );

  // Handle keyboard events
  React.useEffect(() => {
    const keyboardWillShow = (e: KeyboardEvent) => {
      if (!selectedItem || !scrollViewRef.current) return;

      if (Platform.OS === 'ios') {
        const keyboardHeight = e.endCoordinates.height;
        const screenHeight = SCREEN_HEIGHT;
        ensureItemVisible(selectedItem, keyboardHeight, screenHeight);
      } else {
        // Android: Store current scroll position and handle visibility
        const currentScrollY = scrollOffset;
        if (!lastMeasuredItemPosition.current?.originalScrollY) {
          lastMeasuredItemPosition.current = {
            ...lastMeasuredItemPosition.current!,
            originalScrollY: currentScrollY,
          };
        }

        const keyboardHeight = e.endCoordinates.height;
        const screenHeight = e.endCoordinates.screenY;
        ensureItemVisible(selectedItem, keyboardHeight, screenHeight);
      }
    };

    const keyboardWillHide = () => {
      if (!selectedItem || !scrollViewRef.current) return;

      if (Platform.OS === 'ios') {
        // iOS: Restore scroll position smoothly
        if (lastMeasuredItemPosition.current?.originalScrollY !== undefined) {
          scrollViewRef.current.scrollTo({
            y: lastMeasuredItemPosition.current.originalScrollY,
            animated: true,
          });
        }
      } else {
        // Android: Restore original scroll position
        if (lastMeasuredItemPosition.current?.originalScrollY !== undefined) {
          scrollViewRef.current.scrollTo({
            y: lastMeasuredItemPosition.current.originalScrollY,
            animated: false,
          });
        }
      }

      // Update popup position after scroll
      setTimeout(
        () => {
          updatePopupPosition(selectedItem);
        },
        Platform.OS === 'ios' ? 300 : 50,
      );
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
  }, [selectedItem, updatePopupPosition, ensureItemVisible]);

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
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustKeyboardInsets={false}
        keyboardDismissMode="none"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onLayout={handleScrollViewLayout}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  item: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  selectedItem: {
    backgroundColor: '#F0F0F0',
  },
  itemTitle: {
    fontSize: 16,
    color: '#000000',
  },
  itemValue: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
});

export default App;
