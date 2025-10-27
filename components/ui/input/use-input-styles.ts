import { useMemo } from 'react';

import { getIconStyles, getInputStyles, getRequiredLabelStyles } from './styles';

interface UseInputStylesProps {
  variant: 'default' | 'outline' | 'filled';
  size: 'sm' | 'md' | 'lg';
  inputState: 'default' | 'focused' | 'error' | 'disabled';
  isDisabled: boolean;
  readonly: boolean;
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}

export const useInputStyles = ({
  variant,
  size,
  inputState,
  isDisabled,
  readonly,
  hasLeftIcon,
  hasRightIcon,
}: UseInputStylesProps) => {
  return useMemo(() => {
    const inputStyles = getInputStyles({
      variant,
      size,
      state: inputState,
      disabled: isDisabled,
      readonly,
      hasLeftIcon,
      hasRightIcon,
    });

    const iconStyles = getIconStyles();
    const requiredStyles = getRequiredLabelStyles();

    return {
      inputStyles,
      iconStyles,
      requiredStyles,
    };
  }, [variant, size, inputState, isDisabled, readonly, hasLeftIcon, hasRightIcon]);
};
