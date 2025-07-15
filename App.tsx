/**
 * Bed Management App
 * A React Native app for managing hospital bed layouts
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { BedManagementScreen } from './src/components/BedManagement';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <BedManagementScreen />
    </SafeAreaView>
  );
};

export default App;
