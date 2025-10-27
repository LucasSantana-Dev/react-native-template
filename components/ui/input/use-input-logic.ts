import { useState } from 'react';

import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { FieldValues } from 'react-hook-form';

import { InputProps } from './types';

interface UseInputLogicProps<T extends FieldValues>
  extends Omit<InputProps<T>, 'onFocus' | 'onBlur'> {
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export const useInputLogic = <T extends FieldValues>({
  error,
  state = 'default',
  disabled = false,
  readonly = false,
  onFocus,
  onBlur,
}: UseInputLogicProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);

  // Determine input state
  const inputState = error ? 'error' : isFocused ? 'focused' : state;
  const isDisabled = disabled || readonly;

  // Handle focus events
  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (isDisabled) return;
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (isDisabled) return;
    setIsFocused(false);
    onBlur?.(event);
  };

  return {
    isFocused,
    inputState,
    isDisabled,
    handleFocus,
    handleBlur,
  };
};
