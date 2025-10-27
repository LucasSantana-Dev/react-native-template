import React, { useState } from 'react';

import {
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

import { getCardStyles, getPressableCardStyles } from './styles';
import { CardProps } from './types';

/**
 * Flexible Card component with multiple variants and sections
 *
 * @example
 * ```tsx
 * <Card variant="elevated" size="md">
 *   <Card.Header>
 *     <Text>Card Title</Text>
 *   </Card.Header>
 *   <Card.Body>
 *     <Text>Card content goes here</Text>
 *   </Card.Body>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 *
 * <Card variant="outlined" pressable onPress={handlePress}>
 *   Simple card content
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  size = 'md',
  style,
  header,
  body,
  footer,
  pressable = false,
  onPress,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  testID,
}) => {
  const [pressed, setPressed] = useState(false);

  // Get card styles
  const cardStyles = getCardStyles(variant, size, pressable, disabled);
  const pressableStyles = pressable ? getPressableCardStyles(pressed) : {};

  // Handle press events
  const handlePress = () => {
    if (disabled || !pressable || !onPress) return;
    onPress();
  };

  const handlePressIn = () => {
    if (pressable) setPressed(true);
  };

  const handlePressOut = () => {
    if (pressable) setPressed(false);
  };

  // Render card content
  const renderContent = () => {
    if (header || body || footer) {
      return (
        <>
          {header && (
            <View style={cardStyles.header}>
              {header}
            </View>
          )}
          {body && (
            <View style={cardStyles.body}>
              {body}
            </View>
          )}
          {children && (
            <View style={cardStyles.body}>
              {children}
            </View>
          )}
          {footer && (
            <View style={cardStyles.footer}>
              {footer}
            </View>
          )}
        </>
      );
    }

    return children;
  };

  // Render card container
  const CardContainer = pressable ? TouchableOpacity : View;

  return (
    <CardContainer
      style={[
        cardStyles.card,
        pressableStyles.card,
        style,
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={pressable ? 'button' : undefined}
      testID={testID}
    >
      {renderContent()}
    </CardContainer>
  );
};

// ========== CARD SECTIONS ==========
export const CardHeader: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({
  children,
  style
}) => (
  <View style={style}>
    {children}
  </View>
);

export const CardBody: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({
  children,
  style
}) => (
  <View style={style}>
    {children}
  </View>
);

export const CardFooter: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({
  children,
  style
}) => (
  <View style={style}>
    {children}
  </View>
);

// Create compound component type
interface CardComponent extends React.FC<CardProps> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
}

// Attach sections to main component and cast to compound type
const CardWithSections = Card as CardComponent;
CardWithSections.Header = CardHeader;
CardWithSections.Body = CardBody;
CardWithSections.Footer = CardFooter;

// Export the compound component as the main Card
export { CardWithSections as Card };
export default CardWithSections;
