import React, { useState, useCallback, useMemo } from 'react';
import {
  TextInput,
  View,
  Platform,
  InputAccessoryView,
  Button,
} from 'react-native';
import type { PopupInputProps } from './types';
import { createStyles } from './styles';
import { useKeyboard } from '../../hooks/useKeyboard';

const INPUT_ACCESSORY_ID = 'PopupInputAccessoryView';

export const PopupInput: React.FC<PopupInputProps> = React.memo(
  ({
    value,
    onChange,
    containerStyle,
    inputStyle,
    borderColor = '#e0e0e0',
    focusedBorderColor = '#007AFF',
    borderWidth = 1,
    borderRadius = 4,
    padding = 12,
    ...textInputProps
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const { dismissKeyboard } = useKeyboard();

    // Memoize styles to prevent recalculation
    const styles = useMemo(
      () =>
        createStyles({
          borderColor: isFocused ? focusedBorderColor : borderColor,
          borderWidth,
          borderRadius,
          padding,
        }),
      [
        isFocused,
        focusedBorderColor,
        borderColor,
        borderWidth,
        borderRadius,
        padding,
      ],
    );

    // Memoize container styles
    const containerStyles = useMemo(
      () => [styles.container, containerStyle],
      [styles.container, containerStyle],
    );

    // Memoize input styles
    const inputStyles = useMemo(
      () => [styles.input, inputStyle],
      [styles.input, inputStyle],
    );

    const handleFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    const handleChangeText = useCallback(
      (text: string) => {
        onChange(text);
      },
      [onChange],
    );

    const handleDone = useCallback(() => {
      dismissKeyboard();
    }, [dismissKeyboard]);

    // Memoize input props
    const inputProps = useMemo(
      () => ({
        value,
        onChangeText: handleChangeText,
        onFocus: handleFocus,
        onBlur: handleBlur,
        style: inputStyles,
        placeholderTextColor: '#999999',
        inputAccessoryViewID:
          Platform.OS === 'ios' ? INPUT_ACCESSORY_ID : undefined,
        ...textInputProps,
      }),
      [
        value,
        handleChangeText,
        handleFocus,
        handleBlur,
        inputStyles,
        textInputProps,
      ],
    );

    return (
      <View style={containerStyles}>
        <TextInput {...inputProps} />
        {Platform.OS === 'ios' && (
          <InputAccessoryView nativeID={INPUT_ACCESSORY_ID}>
            <View style={styles.accessoryContainer}>
              <Button onPress={handleDone} title="Done" />
            </View>
          </InputAccessoryView>
        )}
      </View>
    );
  },
);
