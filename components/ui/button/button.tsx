import React from 'react';

import { TouchableOpacity } from 'react-native';

import { renderButtonContent } from './button-helpers';
import { createButtonProps } from './button-utils';
import { ButtonProps } from './types';

/**
 * Production-ready Button component with multiple variants, sizes, and states
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onPress={handlePress}>
 *   Click me
 * </Button>
 *
 * <Button variant="outline" size="lg" icon="add" iconPosition="left">
 *   Add Item
 * </Button>
 *
 * <Button variant="danger" size="sm" loading disabled>
 *   Delete
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = props => {
  // Get all button configuration using helper
  const { isDisabled, buttonStyles, buttonContentProps, handlePress } = createButtonProps(props);

  return (
    <TouchableOpacity
      style={[buttonStyles.button, props.style]}
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityLabel={props.accessibilityLabel}
      accessibilityHint={props.accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{
        disabled: isDisabled,
        busy: props.loading,
      }}
      testID={props.testID}
      {...props}
    >
      {renderButtonContent(buttonContentProps)}
    </TouchableOpacity>
  );
};

export default Button;
