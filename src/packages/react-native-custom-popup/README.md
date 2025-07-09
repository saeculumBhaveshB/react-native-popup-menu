# React Native Custom Popup

A flexible and customizable popup menu component for React Native with text input support and keyboard handling.

## Features

- 📱 Fully customizable popup menu
- ⌨️ Text input support with keyboard handling
- 🎯 Smart positioning with arrow pointer
- 🔄 Smooth animations
- 📱 Platform-specific behavior (iOS/Android)
- 🎨 Customizable styling
- ✨ TypeScript support

## Installation

```bash
npm install react-native-custom-popup react-native-svg
# or
yarn add react-native-custom-popup react-native-svg
```

## Basic Usage

```typescript
import { PopupMenu, PopupInput } from 'react-native-custom-popup';

const MyComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePress = event => {
    const { pageX, pageY } = event.nativeEvent;
    setPosition({ x: pageX, y: pageY });
    setIsVisible(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>Open Popup</Text>
      </TouchableOpacity>

      <PopupMenu
        isVisible={isVisible}
        position={position}
        onClose={() => setIsVisible(false)}
      >
        <PopupInput
          value={inputValue}
          onChange={setInputValue}
          placeholder="Enter text..."
        />
      </PopupMenu>
    </View>
  );
};
```

## Components

### PopupMenu

The main container component for the popup.

#### Props

| Prop            | Type                     | Required | Default   | Description                            |
| --------------- | ------------------------ | -------- | --------- | -------------------------------------- |
| isVisible       | boolean                  | Yes      | -         | Controls the visibility of the popup   |
| position        | { x: number; y: number } | Yes      | -         | Position where the popup should appear |
| onClose         | () => void               | Yes      | -         | Callback when popup should close       |
| children        | ReactNode                | Yes      | -         | Content to display inside the popup    |
| width           | number                   | No       | 250       | Width of the popup                     |
| borderRadius    | number                   | No       | 8         | Border radius of the popup             |
| backgroundColor | string                   | No       | 'white'   | Background color of the popup          |
| shadowColor     | string                   | No       | '#000000' | Shadow color of the popup              |
| arrowHeight     | number                   | No       | 12        | Height of the arrow pointer            |

### PopupInput

A customizable text input component designed for the popup.

#### Props

| Prop               | Type                   | Required | Default   | Description                   |
| ------------------ | ---------------------- | -------- | --------- | ----------------------------- |
| value              | string                 | Yes      | -         | Current value of the input    |
| onChange           | (text: string) => void | Yes      | -         | Callback when text changes    |
| placeholder        | string                 | No       | -         | Placeholder text              |
| borderColor        | string                 | No       | '#e0e0e0' | Border color in normal state  |
| focusedBorderColor | string                 | No       | '#007AFF' | Border color when focused     |
| borderWidth        | number                 | No       | 1         | Width of the border           |
| borderRadius       | number                 | No       | 4         | Border radius of the input    |
| padding            | number                 | No       | 12        | Internal padding of the input |

## Platform Specific Notes

### iOS

- Uses `keyboardWillShow/Hide` events for smoother animations
- Includes a "Done" button in the keyboard accessory view
- Supports keyboard accessory view customization

### Android

- Uses `keyboardDidShow/Hide` events
- Native keyboard handling behavior
- Supports custom input accessories through native options

## Example App

Check out the [example](../../../examples/BasicUsage.tsx) for a complete implementation.

## Contributing

We welcome contributions! Please see our [contributing guide](CONTRIBUTING.md) for details.

## License

MIT
