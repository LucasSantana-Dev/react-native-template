import React from 'react';

import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { FieldValues } from 'react-hook-form';

import { renderInputContent, renderInputWithController } from './input-content-renderer';
import { InputProps } from './types';

interface InputRendererProps<T extends FieldValues>
  extends Omit<InputProps<T>, 'onFocus' | 'onBlur'> {
  inputStyles: Record<string, ViewStyle | TextStyle>;
  iconStyles: { container: ViewStyle; icon: TextStyle };
  requiredStyles: Record<string, TextStyle>;
  isFocused: boolean;
  isDisabled: boolean;
  handleFocus: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  handleBlur: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  ref: React.Ref<TextInput>;
}

// Export the render functions
export { renderInputContent, renderInputWithController };

// Main render function for regular inputs
export const renderInput = <T extends FieldValues>(props: InputRendererProps<T>) => {
  return renderInputContent<T>(props);
};

// Main render function for controlled inputs
export const renderControlledInput = <T extends FieldValues>(
  props: InputRendererProps<T> & {
    name: string;
    control: any;
    rules?: any;
    defaultValue?: any;
  },
) => {
  return renderInputWithController(props as any);
};
