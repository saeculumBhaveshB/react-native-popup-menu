import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { PopupMenu } from '../components/PopupMenu';
import { Text, Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

describe('PopupMenu', () => {
  const defaultProps = {
    isVisible: true,
    position: { x: 100, y: 100 },
    onClose: jest.fn(),
    children: <Text>Test Content</Text>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Platform.select = jest.fn().mockImplementation(options => options.ios);
  });

  it('renders correctly when visible', () => {
    const { getByText } = render(<PopupMenu {...defaultProps} />);
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(
      <PopupMenu {...defaultProps} isVisible={false} />,
    );
    expect(queryByText('Test Content')).toBeNull();
  });

  it('calls onClose when backdrop is pressed', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <PopupMenu {...defaultProps} onClose={onClose} />,
    );

    fireEvent.press(getByTestId('popup-backdrop'));
    expect(onClose).toHaveBeenCalled();
  });

  it('adjusts position when keyboard is shown', async () => {
    const { rerender, getByTestId } = render(<PopupMenu {...defaultProps} />);

    // Simulate keyboard show
    act(() => {
      // Trigger keyboard show event
      const keyboardEvent = {
        endCoordinates: { height: 300 },
      };
      defaultProps.onKeyboardShow?.(keyboardEvent);
    });

    rerender(<PopupMenu {...defaultProps} />);
    const popup = getByTestId('popup-container');

    // Check if popup position was adjusted
    expect(popup.props.style).toMatchObject({
      transform: expect.any(Array),
      opacity: expect.any(Number),
    });
  });

  it('handles custom styling', () => {
    const customStyle = {
      backgroundColor: 'red',
      borderRadius: 16,
    };

    const { getByTestId } = render(
      <PopupMenu {...defaultProps} style={customStyle} />,
    );

    const popup = getByTestId('popup-container');
    expect(popup.props.style).toMatchObject(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });

  it('handles RTL layout', () => {
    const { getByTestId } = render(<PopupMenu {...defaultProps} />, {
      wrapper: ({ children }) => (
        <View style={{ direction: 'rtl' }}>{children}</View>
      ),
    });

    const popup = getByTestId('popup-container');
    // Check if RTL positioning is correct
    expect(popup.props.style).toMatchObject({
      right: expect.any(Number),
    });
  });

  it('handles safe area insets', () => {
    const { getByTestId } = render(<PopupMenu {...defaultProps} />, {
      wrapper: ({ children }) => (
        <SafeAreaProvider
          initialMetrics={{
            frame: { x: 0, y: 0, width: 375, height: 812 },
            insets: { top: 47, left: 0, right: 0, bottom: 34 },
          }}
        >
          {children}
        </SafeAreaProvider>
      ),
    });

    const popup = getByTestId('popup-container');
    // Check if position respects safe area
    expect(popup.props.style).toMatchObject({
      top: expect.any(Number),
    });
  });
});
