import { useCallback, useState } from 'react';

import { BlurEvent, FocusEvent } from 'react-native';

import { InputProps } from './types';

interface UseInputStateReturn {
  isFocused: boolean;
  inputState: 'default' | 'focused' | 'error' | 'disabled';
  isDisabled: boolean;
  handleFocus: (event: FocusEvent) => void;
  handleBlur: (event: BlurEvent) => void;
}

export const useInputState = (
  props: Pick<InputProps, 'state' | 'disabled' | 'readonly' | 'error' | 'onFocus' | 'onBlur'>,
): UseInputStateReturn => {
  const [isFocused, setIsFocused] = useState(false);
  const { state, disabled, readonly, error, onFocus, onBlur } = props;

  const isDisabled = Boolean(disabled || readonly);
  const inputState = error ? 'error' : isFocused ? 'focused' : state || 'default';

  const handleFocus = useCallback(
    (event: FocusEvent) => {
      if (isDisabled) return;
      setIsFocused(true);
      onFocus?.(event);
    },
    [isDisabled, onFocus],
  );

  const handleBlur = useCallback(
    (event: BlurEvent) => {
      if (isDisabled) return;
      setIsFocused(false);
      onBlur?.(event);
    },
    [isDisabled, onBlur],
  );

  return {
    isFocused,
    inputState,
    isDisabled,
    handleFocus,
    handleBlur,
  };
};
