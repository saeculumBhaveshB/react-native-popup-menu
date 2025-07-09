import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PopupInput } from '../components/PopupInput';
import { Platform } from 'react-native';

describe('PopupInput', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    placeholder: 'Enter text...',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Platform.OS = 'ios';
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<PopupInput {...defaultProps} />);
    expect(getByPlaceholderText('Enter text...')).toBeTruthy();
  });

  it('handles text input correctly', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <PopupInput {...defaultProps} onChange={onChange} />,
    );

    const input = getByPlaceholderText('Enter text...');
    fireEvent.changeText(input, 'test input');
    expect(onChange).toHaveBeenCalledWith('test input');
  });

  it('applies custom styles', () => {
    const customStyle = {
      borderColor: 'red',
      borderWidth: 2,
    };

    const { getByTestId } = render(
      <PopupInput {...defaultProps} inputStyle={customStyle} />,
    );

    const input = getByTestId('popup-input');
    expect(input.props.style).toMatchObject(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });

  it('handles focus state correctly', () => {
    const { getByTestId } = render(<PopupInput {...defaultProps} />);
    const input = getByTestId('popup-input');

    fireEvent(input, 'focus');
    expect(input.props.style).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: '#007AFF',
        }),
      ]),
    );

    fireEvent(input, 'blur');
    expect(input.props.style).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: '#e0e0e0',
        }),
      ]),
    );
  });

  it('shows keyboard accessory view on iOS', () => {
    Platform.OS = 'ios';
    const { getByText } = render(<PopupInput {...defaultProps} />);
    expect(getByText('Done')).toBeTruthy();
  });

  it('does not show keyboard accessory view on Android', () => {
    Platform.OS = 'android';
    const { queryByText } = render(<PopupInput {...defaultProps} />);
    expect(queryByText('Done')).toBeNull();
  });

  it('handles keyboard dismissal', () => {
    const { getByText } = render(<PopupInput {...defaultProps} />);
    const doneButton = getByText('Done');
    fireEvent.press(doneButton);
    // Verify keyboard dismiss was called
    expect(require('react-native').Keyboard.dismiss).toHaveBeenCalled();
  });

  it('handles multiline input', () => {
    const { getByTestId } = render(
      <PopupInput {...defaultProps} multiline numberOfLines={3} />,
    );
    const input = getByTestId('popup-input');
    expect(input.props.multiline).toBe(true);
    expect(input.props.numberOfLines).toBe(3);
  });
});
