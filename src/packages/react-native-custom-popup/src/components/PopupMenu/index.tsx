import React, { useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import { PopupMenuProps } from './types';
import { createStyles } from './styles';
import { PopupArrow } from '../PopupArrow';
import { CloseButton } from '../CloseButton';
import { usePopupAnimation } from '../../hooks/usePopupAnimation';
import { usePopupPosition } from '../../hooks/usePopupPosition';
import { useKeyboard } from '../../hooks/useKeyboard';
import { ErrorBoundary } from '../ErrorBoundary';

const PopupMenuWithErrorBoundary: React.FC<PopupMenuProps> = props => (
  <ErrorBoundary>
    <PopupMenu {...props} />
  </ErrorBoundary>
);

export { PopupMenuWithErrorBoundary as PopupMenu };
