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

  const handleItemPress = useCallback((id: number) => {
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
          setPopupPosition({ x: pageX, y: pageY + height });
          setSelectedItem(id);
          setIsPopupVisible(true);
        },
      );
    }
  }, []);

  const handlePopupClose = useCallback(() => {
    logger.debug('Popup closed');
    setIsPopupVisible(false);
    setSelectedItem(null);
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
        <TouchableOpacity onPress={toggleRTL} style={styles.rtlButton}>
          <Text>Toggle RTL</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {items.map(item => (
          <TouchableOpacity
            key={item.id}
            ref={ref => {
              if (ref) {
                itemRefs.current[item.id] = ref;
              }
            }}
            style={styles.item}
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

      <TouchableOpacity
        style={styles.errorButton}
        onPress={simulateError}
        accessible={true}
        accessibilityLabel="Simulate error"
        accessibilityHint="Triggers an error to test error boundary"
      >
        <Text>Simulate Error</Text>
      </TouchableOpacity>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rtlButton: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  itemValue: {
    fontSize: 14,
    color: '#666',
  },
  errorButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ff5252',
    padding: 12,
    borderRadius: 8,
  },
});

export default App;
