/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useCallback, useRef, useMemo } from 'react';
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
  StatusBar,
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
const POPUP_HEIGHT = 100; // Approximate height of the popup including input
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0;

const EXTRA_BOTTOM_SPACE = 150; // Extra space for the last item
const SCROLL_ADJUSTMENT_DELAY = 100;

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

  // Add this state to track keyboard visibility
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

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

  // Function to ensure item and popup are visible when keyboard shows
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
          const visibleAreaTop = HEADER_HEIGHT + STATUS_BAR_HEIGHT;
          const visibleAreaBottom = screenHeight - keyboardHeight;
          const visibleHeight = visibleAreaBottom - visibleAreaTop;

          if (Platform.OS === 'ios') {
            // iOS: Special handling for items near the bottom
            // const isLastItem = itemId === TEST_ITEMS.length;
            const isLastItem = itemId === TEST_ITEMS[TEST_ITEMS.length - 1].id;

            if (isLastItem) {
              // For the last item, we need to ensure extra space at the bottom
              const extraScrollSpace = EXTRA_BOTTOM_SPACE;
              const totalNeededHeight =
                itemBottom + POPUP_HEIGHT + extraScrollSpace;

              // Calculate initial scroll position
              const initialScroll = Math.max(
                0,
                scrollOffset + (totalNeededHeight - visibleHeight),
              );

              // Immediate scroll to bring content into view
              scrollViewRef.current?.scrollTo({
                y: initialScroll,
                animated: false,
              });

              // First adjustment with delay
              setTimeout(() => {
                const adjustedScroll = initialScroll + KEYBOARD_PADDING;
                scrollViewRef.current?.scrollTo({
                  y: adjustedScroll,
                  animated: true,
                });

                // Second adjustment to ensure visibility
                setTimeout(() => {
                  itemRef.measure(
                    (
                      x2: number,
                      y2: number,
                      width2: number,
                      height2: number,
                      pageX2: number,
                      pageY2: number,
                    ) => {
                      const newItemBottom = pageY2 + height2;
                      const newVisibleBottom = screenHeight - keyboardHeight;

                      if (
                        newItemBottom >
                        newVisibleBottom - POPUP_HEIGHT - KEYBOARD_PADDING
                      ) {
                        const finalScroll =
                          adjustedScroll +
                          (newItemBottom -
                            (newVisibleBottom -
                              POPUP_HEIGHT -
                              KEYBOARD_PADDING));

                        scrollViewRef.current?.scrollTo({
                          y: finalScroll,
                          animated: true,
                        });
                      }

                      // Update popup position
                      setPopupPosition({
                        x: pageX2 + width2 + 10,
                        y: Math.min(
                          pageY2 + height2 / 2,
                          newVisibleBottom - POPUP_HEIGHT - KEYBOARD_PADDING,
                        ),
                      });
                    },
                  );
                }, SCROLL_ADJUSTMENT_DELAY);
              }, SCROLL_ADJUSTMENT_DELAY);
            } else {
              // Existing logic for non-last items
              const isLastItem = itemId === TEST_ITEMS.length;

              if (isLastItem) {
                // For the last item, calculate the total content height needed
                const totalNeededHeight =
                  itemBottom + POPUP_HEIGHT + KEYBOARD_PADDING * 3;
                const availableHeight = visibleAreaBottom - visibleAreaTop;

                // Calculate how much we need to scroll
                const targetScroll = Math.max(
                  0,
                  scrollOffset + (totalNeededHeight - availableHeight),
                );

                // First immediate scroll to bring most of the content into view
                scrollViewRef.current?.scrollTo({
                  y: targetScroll - KEYBOARD_PADDING * 2,
                  animated: false,
                });

                // Then adjust with animation for final position
                requestAnimationFrame(() => {
                  scrollViewRef.current?.scrollTo({
                    y: targetScroll,
                    animated: true,
                  });

                  // Update popup position after the scroll animation
                  setTimeout(() => {
                    itemRef.measure(
                      (
                        x: number,
                        y: number,
                        width: number,
                        height: number,
                        pageX: number,
                        pageY: number,
                      ) => {
                        const finalVisibleBottom =
                          screenHeight - keyboardHeight;
                        setPopupPosition({
                          x: pageX + width + 10,
                          y: Math.min(
                            pageY + height / 2,
                            finalVisibleBottom -
                              POPUP_HEIGHT -
                              KEYBOARD_PADDING,
                          ),
                        });
                      },
                    );
                  }, 300);
                });
              } else if (itemBottom + POPUP_HEIGHT > visibleAreaBottom) {
                // For items that would be hidden by keyboard
                const targetScroll = Math.max(
                  0,
                  scrollOffset +
                    (itemBottom + POPUP_HEIGHT - visibleAreaBottom) +
                    KEYBOARD_PADDING * 2,
                );

                scrollViewRef.current?.scrollTo({
                  y: targetScroll - KEYBOARD_PADDING,
                  animated: false,
                });

                setTimeout(() => {
                  scrollViewRef.current?.scrollTo({
                    y: targetScroll,
                    animated: true,
                  });

                  // Update popup position after scroll
                  setTimeout(() => {
                    updatePopupPosition(itemId);
                  }, 300);
                }, 50);
              } else if (itemTop < visibleAreaTop) {
                // For items above visible area
                const targetScroll = Math.max(
                  0,
                  scrollOffset - (visibleAreaTop - itemTop) - KEYBOARD_PADDING,
                );
                scrollViewRef.current?.scrollTo({
                  y: targetScroll,
                  animated: true,
                });

                // Update popup position after scroll
                setTimeout(() => {
                  updatePopupPosition(itemId);
                }, 300);
              }
            }
          } else {
            // Android: Keep existing behavior
            if (itemBottom + POPUP_HEIGHT > visibleAreaBottom) {
              const targetScroll =
                scrollOffset +
                (itemBottom + POPUP_HEIGHT - visibleAreaBottom) +
                KEYBOARD_PADDING;
              scrollViewRef.current?.scrollTo({
                y: targetScroll,
                animated: false,
              });

              setTimeout(() => {
                updatePopupPosition(itemId);
              }, 50);
            }
          }
        },
      );
    },
    [scrollOffset, updatePopupPosition],
  );

  // Update keyboard event handlers
  React.useEffect(() => {
    const keyboardWillShow = (e: KeyboardEvent) => {
      setIsKeyboardVisible(true);
      if (!selectedItem || !scrollViewRef.current) return;

      if (Platform.OS === 'ios') {
        const keyboardHeight = e.endCoordinates.height;
        const screenHeight = SCREEN_HEIGHT;
        const isLastItem = selectedItem === TEST_ITEMS.length;

        if (isLastItem) {
          // Pre-emptive scroll for last item
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
                const itemBottom = pageY + height;
                const visibleBottom = screenHeight - keyboardHeight;

                // Aggressive initial scroll
                const quickScroll = Math.max(
                  0,
                  scrollOffset +
                    (itemBottom -
                      (visibleBottom - POPUP_HEIGHT - EXTRA_BOTTOM_SPACE)),
                );

                // Immediate aggressive scroll
                scrollViewRef.current?.scrollTo({
                  y: quickScroll,
                  animated: false,
                });

                // Delayed final adjustment
                setTimeout(() => {
                  ensureItemVisible(selectedItem, keyboardHeight, screenHeight);
                }, SCROLL_ADJUSTMENT_DELAY);
              },
            );
          }
        } else {
          ensureItemVisible(selectedItem, keyboardHeight, screenHeight);
        }
      } else {
        // Android: Keep existing behavior
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
      setIsKeyboardVisible(false);
      if (!selectedItem || !scrollViewRef.current) return;

      if (Platform.OS === 'ios') {
        // iOS: Restore scroll position smoothly
        if (lastMeasuredItemPosition.current?.originalScrollY !== undefined) {
          scrollViewRef.current.scrollTo({
            y: lastMeasuredItemPosition.current.originalScrollY,
            animated: true,
          });

          // Update popup position after scroll
          setTimeout(() => {
            updatePopupPosition(selectedItem);
          }, 300);
        }
      } else {
        // Android: Keep existing behavior
        if (lastMeasuredItemPosition.current?.originalScrollY !== undefined) {
          scrollViewRef.current.scrollTo({
            y: lastMeasuredItemPosition.current.originalScrollY,
            animated: false,
          });

          // Update popup position after scroll
          setTimeout(() => {
            updatePopupPosition(selectedItem);
          }, 50);
        }
      }
    };

    const keyboardDidShow = (e: KeyboardEvent) => {
      setIsKeyboardVisible(true);
      if (!selectedItem || !scrollViewRef.current) return;

      if (Platform.OS === 'ios') {
        const keyboardHeight = e.endCoordinates.height;
        const screenHeight = SCREEN_HEIGHT;
        const isLastItem = selectedItem === TEST_ITEMS.length;

        if (isLastItem) {
          // Pre-emptive scroll for last item
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
                const itemBottom = pageY + height;
                const visibleBottom = screenHeight - keyboardHeight;

                // Aggressive initial scroll
                const quickScroll = Math.max(
                  0,
                  scrollOffset +
                    (itemBottom -
                      (visibleBottom - POPUP_HEIGHT - EXTRA_BOTTOM_SPACE)),
                );

                // Immediate aggressive scroll
                scrollViewRef.current?.scrollTo({
                  y: quickScroll,
                  animated: false,
                });

                // Delayed final adjustment
                setTimeout(() => {
                  ensureItemVisible(selectedItem, keyboardHeight, screenHeight);
                }, SCROLL_ADJUSTMENT_DELAY);
              },
            );
          }
        } else {
          ensureItemVisible(selectedItem, keyboardHeight, screenHeight);
        }
      } else {
        // Android: Keep existing behavior
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

    const keyboardDidHide = () => {
      setIsKeyboardVisible(false);
      if (!selectedItem || !scrollViewRef.current) return;

      if (Platform.OS === 'ios') {
        // iOS: Restore scroll position smoothly
        if (lastMeasuredItemPosition.current?.originalScrollY !== undefined) {
          scrollViewRef.current.scrollTo({
            y: lastMeasuredItemPosition.current.originalScrollY,
            animated: true,
          });

          // Update popup position after scroll
          setTimeout(() => {
            updatePopupPosition(selectedItem);
          }, 300);
        }
      } else {
        // Android: Keep existing behavior
        if (lastMeasuredItemPosition.current?.originalScrollY !== undefined) {
          scrollViewRef.current.scrollTo({
            y: lastMeasuredItemPosition.current.originalScrollY,
            animated: false,
          });

          // Update popup position after scroll
          setTimeout(() => {
            updatePopupPosition(selectedItem);
          }, 50);
        }
      }
    };

    if (Platform.OS === 'ios') {
      const showSubscription = Keyboard.addListener(
        'keyboardWillShow',
        keyboardWillShow,
      );
      const hideSubscription = Keyboard.addListener(
        'keyboardWillHide',
        keyboardWillHide,
      );
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    } else {
      const showSubscription = Keyboard.addListener(
        'keyboardDidShow',
        keyboardDidShow,
      );
      const hideSubscription = Keyboard.addListener(
        'keyboardDidHide',
        keyboardDidHide,
      );
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, [selectedItem, updatePopupPosition, ensureItemVisible, scrollOffset]);

  // Calculate dynamic contentContainerStyle
  const scrollViewContentStyle = useMemo(() => {
    const baseStyle = {};

    if (Platform.OS === 'ios' && isKeyboardVisible) {
      return {
        ...baseStyle,
        paddingBottom: EXTRA_BOTTOM_SPACE + POPUP_HEIGHT + 100,
      };
    }

    return baseStyle;
  }, [isKeyboardVisible]);

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
        contentContainerStyle={scrollViewContentStyle}
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
