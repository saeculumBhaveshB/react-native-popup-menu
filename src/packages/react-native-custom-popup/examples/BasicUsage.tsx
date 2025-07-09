import React, { useState } from 'react';
import { View } from 'react-native';
import { PopupMenu, PopupInput } from 'react-native-custom-popup';

const BasicUsage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [itemPosition, setItemPosition] = useState({ x: 0, y: 0 });

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  return (
    <View>
      <PopupMenu
        isVisible={isVisible}
        position={itemPosition}
        onClose={handleClose}
      >
        <PopupInput
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text..."
        />
      </PopupMenu>
    </View>
  );
};

export default BasicUsage;
