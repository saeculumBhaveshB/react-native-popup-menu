# React Native Custom Popup

A highly customizable popup menu component for React Native with text input support.

## Features

- 📱 Works on both iOS and Android
- 🎯 Precise positioning with arrow pointer
- ⌨️ Keyboard-aware with smooth animations
- 🎨 Highly customizable styling
- 📝 Built-in text input support
- 🔒 TypeScript support
- ♿ Accessibility support

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
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handlePress = event => {
    const { pageX, pageY, width, height } = event.nativeEvent;
    setPosition({ x: pageX, y: pageY, width, height });
    setIsVisible(true);
  };

  return (
    <>
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
          onChangeText={setInputValue}
          placeholder="Enter text..."
        />
      </PopupMenu>
    </>
  );
};
```

## Props

### PopupMenu Props

| Prop            | Type          | Required | Default         | Description                    |
| --------------- | ------------- | -------- | --------------- | ------------------------------ |
| isVisible       | boolean       | Yes      | -               | Controls popup visibility      |
| position        | PopupPosition | Yes      | -               | Target element position        |
| onClose         | () => void    | Yes      | -               | Called when popup should close |
| children        | ReactNode     | Yes      | -               | Popup content                  |
| style           | ViewStyle     | No       | -               | Custom container styles        |
| backgroundColor | string        | No       | 'white'         | Popup background color         |
| width           | number        | No       | 250             | Popup width                    |
| borderRadius    | number        | No       | 8               | Popup border radius            |
| showArrow       | boolean       | No       | true            | Show/hide arrow pointer        |
| arrowColor      | string        | No       | backgroundColor | Arrow pointer color            |

### PopupInput Props

| Prop           | Type                   | Required | Default   | Description            |
| -------------- | ---------------------- | -------- | --------- | ---------------------- |
| value          | string                 | Yes      | -         | Input value            |
| onChangeText   | (text: string) => void | Yes      | -         | Value change handler   |
| containerStyle | ViewStyle              | No       | -         | Input container styles |
| inputStyle     | TextStyle              | No       | -         | Text input styles      |
| borderColor    | string                 | No       | '#e0e0e0' | Input border color     |
| borderWidth    | number                 | No       | 1         | Input border width     |
| borderRadius   | number                 | No       | 4         | Input border radius    |
| padding        | number                 | No       | 12        | Input padding          |

## Custom Styling Example

```typescript
<PopupMenu
  isVisible={isVisible}
  position={position}
  onClose={handleClose}
  backgroundColor="#f8f9fa"
  borderRadius={12}
  width={300}
  style={{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  }}
>
  <PopupInput
    value={inputValue}
    onChangeText={setInputValue}
    placeholder="Custom styled input..."
    borderColor="#007AFF"
    borderRadius={8}
    padding={16}
    containerStyle={{ margin: 12 }}
    inputStyle={{ fontSize: 16 }}
  />
</PopupMenu>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
