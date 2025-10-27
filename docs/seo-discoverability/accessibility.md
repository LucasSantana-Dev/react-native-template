# Accessibility Guide

This guide covers accessibility implementation, testing, and best practices for the React Native template.

## 🎯 Overview

Accessibility ensures your app is usable by people with disabilities, including those with visual, motor, cognitive, and hearing impairments. This guide covers implementation using React Native's accessibility APIs and best practices.

## 🛠️ Tools and Technologies

### Core Tools

- **React Native Accessibility APIs**: Built-in accessibility features
- **Screen Readers**: VoiceOver (iOS) and TalkBack (Android)
- **Accessibility Testing Tools**: axe-core, React Native Testing Library
- **Color Contrast Tools**: WebAIM Contrast Checker, Color Oracle

### Dependencies

```json
{
  "devDependencies": {
    "@testing-library/react-native": "^12.0.0",
    "jest-axe": "^7.0.0"
  }
}
```

## 🚀 Basic Accessibility Implementation

### 1. Accessibility Props

#### Basic Accessibility Props

```typescript
// components/accessible-button.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface AccessibleButtonProps {
  title: string;
  onPress: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'button' | 'link' | 'tab' | 'menu';
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean;
  };
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  title,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  accessibilityState,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessible={true}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
```

#### Form Accessibility

```typescript
// components/accessible-input.tsx
import React from 'react';
import { TextInput, Text, View } from 'react-native';

interface AccessibleInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  required?: boolean;
}

export const AccessibleInput: React.FC<AccessibleInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  required = false,
}) => {
  return (
    <View>
      <Text
        accessible={true}
        accessibilityLabel={`${label}${required ? ', required' : ''}`}
        accessibilityRole="text"
      >
        {label}
        {required && <Text style={{ color: 'red' }}> *</Text>}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        accessible={true}
        accessibilityLabel={label}
        accessibilityHint={error || `Enter ${label.toLowerCase()}`}
        accessibilityRole="textbox"
        accessibilityState={{
          invalid: !!error,
        }}
        style={[
          styles.input,
          error && styles.inputError,
        ]}
      />
      {error && (
        <Text
          accessible={true}
          accessibilityLabel={`Error: ${error}`}
          accessibilityRole="text"
          style={styles.errorText}
        >
          {error}
        </Text>
      )}
    </View>
  );
};
```

### 2. Screen Reader Support

#### VoiceOver (iOS) Support

```typescript
// components/voiceover-friendly.tsx
import React from 'react';
import { View, Text } from 'react-native';

export const VoiceOverFriendly: React.FC = () => {
  return (
    <View accessible={true} accessibilityLabel="User profile section">
      <Text
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel="User name"
      >
        John Doe
      </Text>
      <Text
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel="User role"
      >
        Software Developer
      </Text>
      <Text
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel="User email"
      >
        john@example.com
      </Text>
    </View>
  );
};
```

#### TalkBack (Android) Support

```typescript
// components/talkback-friendly.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const TalkBackFriendly: React.FC = () => {
  return (
    <View accessible={true} accessibilityLabel="Navigation menu">
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Home"
        accessibilityRole="button"
        accessibilityHint="Navigate to home screen"
      >
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Profile"
        accessibilityRole="button"
        accessibilityHint="Navigate to profile screen"
      >
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## 🎨 Visual Accessibility

### 1. Color Contrast

#### Color Contrast Requirements

```typescript
// utils/color-contrast.ts
export class ColorContrast {
  static calculateContrast(color1: string, color2: string): number {
    // Convert hex to RGB
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);

    // Calculate relative luminance
    const lum1 = this.getRelativeLuminance(rgb1);
    const lum2 = this.getRelativeLuminance(rgb2);

    // Calculate contrast ratio
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  static isAccessible(contrast: number, level: 'AA' | 'AAA' = 'AA'): boolean {
    return level === 'AA' ? contrast >= 4.5 : contrast >= 7;
  }

  private static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }

  private static getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }
}

// Usage example
const contrast = ColorContrast.calculateContrast('#000000', '#ffffff');
const isAccessible = ColorContrast.isAccessible(contrast, 'AA');
```

#### Theme Colors with Accessibility

```typescript
// config/accessible-colors.ts
export const accessibleColors = {
  // Primary colors with sufficient contrast
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrast: '#ffffff', // 4.5:1 contrast ratio
  },

  // Secondary colors
  secondary: {
    main: '#dc004e',
    light: '#ff5983',
    dark: '#9a0036',
    contrast: '#ffffff', // 4.5:1 contrast ratio
  },

  // Text colors
  text: {
    primary: '#000000',
    secondary: '#666666',
    disabled: '#999999',
    contrast: '#ffffff',
  },

  // Background colors
  background: {
    default: '#ffffff',
    paper: '#f5f5f5',
    dark: '#121212',
  },
} as const;
```

### 2. Font Size and Scaling

#### Dynamic Font Scaling

```typescript
// hooks/use-font-scale.ts
import { useWindowDimensions } from 'react-native';

export const useFontScale = () => {
  const { fontScale } = useWindowDimensions();

  const getScaledFontSize = (baseSize: number): number => {
    return Math.max(baseSize * fontScale, 12); // Minimum 12px
  };

  return { fontScale, getScaledFontSize };
};

// Usage in components
const MyComponent = () => {
  const { getScaledFontSize } = useFontScale();

  return (
    <Text style={{ fontSize: getScaledFontSize(16) }}>
      This text scales with system font size
    </Text>
  );
};
```

#### Accessible Typography

```typescript
// styles/typography.ts
export const accessibleTypography = {
  // Headings with proper hierarchy
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
    letterSpacing: 0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
    letterSpacing: 0.25,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: 0,
  },

  // Body text
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },

  // Small text
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
} as const;
```

## 🎯 Interactive Accessibility

### 1. Touch Targets

#### Minimum Touch Target Size

```typescript
// utils/accessibility.ts
export const ACCESSIBILITY = {
  MIN_TOUCH_TARGET_SIZE: 44, // 44pt minimum (iOS) / 48dp minimum (Android)
  MIN_TOUCH_TARGET_MARGIN: 8, // 8pt minimum margin between targets
} as const;

// components/accessible-touch-target.tsx
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface AccessibleTouchTargetProps {
  children: React.ReactNode;
  onPress: () => void;
  minSize?: number;
}

export const AccessibleTouchTarget: React.FC<AccessibleTouchTargetProps> = ({
  children,
  onPress,
  minSize = ACCESSIBILITY.MIN_TOUCH_TARGET_SIZE,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        minWidth: minSize,
        minHeight: minSize,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </TouchableOpacity>
  );
};
```

### 2. Keyboard Navigation

#### Keyboard Accessible Components

```typescript
// components/keyboard-accessible.tsx
import React, { useRef } from 'react';
import { TextInput, View } from 'react-native';

export const KeyboardAccessible: React.FC = () => {
  const inputRef = useRef<TextInput>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <View>
      <TextInput
        ref={inputRef}
        accessible={true}
        accessibilityLabel="Email input"
        accessibilityHint="Enter your email address"
        accessibilityRole="textbox"
        keyboardType="email-address"
        autoComplete="email"
        returnKeyType="next"
        onSubmitEditing={() => {
          // Handle next input focus
        }}
      />
    </View>
  );
};
```

### 3. Focus Management

#### Focus Management Hook

```typescript
// hooks/use-focus-management.ts
import { useRef, useCallback } from 'react';

export const useFocusManagement = () => {
  const focusableElements = useRef<Array<{ focus: () => void }>>([]);

  const registerElement = useCallback((element: { focus: () => void }) => {
    focusableElements.current.push(element);
  }, []);

  const focusNext = useCallback(() => {
    const currentIndex = focusableElements.current.findIndex(
      (element) => document.activeElement === element
    );
    const nextIndex = (currentIndex + 1) % focusableElements.current.length;
    focusableElements.current[nextIndex]?.focus();
  }, []);

  const focusPrevious = useCallback(() => {
    const currentIndex = focusableElements.current.findIndex(
      (element) => document.activeElement === element
    );
    const previousIndex =
      currentIndex === 0 ? focusableElements.current.length - 1 : currentIndex - 1;
    focusableElements.current[previousIndex]?.focus();
  }, []);

  return {
    registerElement,
    focusNext,
    focusPrevious,
  };
};
```

## 🧪 Accessibility Testing

### 1. Automated Testing

#### Jest Accessibility Testing

```typescript
// __tests__/accessibility.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AccessibleButton } from '@/components/accessible-button';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <AccessibleButton
        title="Test Button"
        onPress={() => {}}
        accessibilityLabel="Test button"
        accessibilityHint="Press to test"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper accessibility labels', () => {
    const { getByLabelText } = render(
      <AccessibleButton
        title="Test Button"
        onPress={() => {}}
        accessibilityLabel="Test button"
        accessibilityHint="Press to test"
      />
    );

    expect(getByLabelText('Test button')).toBeTruthy();
  });
});
```

#### React Native Testing Library

```typescript
// __tests__/accessibility-rntl.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AccessibleInput } from '@/components/accessible-input';

describe('AccessibleInput', () => {
  it('should be accessible to screen readers', () => {
    const { getByLabelText } = render(
      <AccessibleInput
        label="Email"
        value=""
        onChangeText={() => {}}
        required
      />
    );

    const input = getByLabelText('Email, required');
    expect(input).toBeTruthy();
  });

  it('should announce errors to screen readers', () => {
    const { getByLabelText } = render(
      <AccessibleInput
        label="Email"
        value=""
        onChangeText={() => {}}
        error="Invalid email format"
      />
    );

    const error = getByLabelText('Error: Invalid email format');
    expect(error).toBeTruthy();
  });
});
```

### 2. Manual Testing

#### Screen Reader Testing

```typescript
// Testing checklist
const accessibilityChecklist = [
  'All interactive elements have accessibility labels',
  'All images have alt text or are marked as decorative',
  'All form inputs have proper labels and hints',
  'All buttons have descriptive labels and hints',
  'All headings follow proper hierarchy (h1, h2, h3)',
  'All lists are properly structured',
  'All tables have proper headers',
  'All links have descriptive text',
  'All custom components are keyboard accessible',
  'All content is reachable via keyboard navigation',
];
```

#### Color Contrast Testing

```typescript
// utils/color-contrast-test.ts
export const testColorContrast = () => {
  const testCases = [
    { foreground: '#000000', background: '#ffffff', expected: 21 },
    { foreground: '#666666', background: '#ffffff', expected: 5.74 },
    { foreground: '#999999', background: '#ffffff', expected: 2.85 },
  ];

  testCases.forEach(({ foreground, background, expected }) => {
    const contrast = ColorContrast.calculateContrast(foreground, background);
    const isAccessible = ColorContrast.isAccessible(contrast, 'AA');

    console.log(
      `${foreground} on ${background}: ${contrast.toFixed(2)}:1 (${isAccessible ? 'PASS' : 'FAIL'})`
    );
  });
};
```

## 📊 Accessibility Metrics

### 1. WCAG Compliance

#### WCAG 2.1 AA Requirements

```typescript
// WCAG 2.1 AA compliance checklist
const wcagCompliance = {
  // Perceivable
  textAlternatives: 'All images have alt text',
  captions: 'All videos have captions',
  adaptable: 'Content can be presented in different ways',
  distinguishable: 'Content is easy to see and hear',

  // Operable
  keyboardAccessible: 'All functionality is keyboard accessible',
  noSeizures: 'No content causes seizures',
  navigable: 'Users can navigate and find content',

  // Understandable
  readable: 'Text is readable and understandable',
  predictable: 'Content appears and operates predictably',
  inputAssistance: 'Users are helped to avoid and correct mistakes',

  // Robust
  compatible: 'Content is compatible with assistive technologies',
} as const;
```

### 2. Accessibility Score

#### Accessibility Scoring

```typescript
// utils/accessibility-score.ts
export class AccessibilityScore {
  static calculate(component: any): number {
    let score = 100;

    // Check for required accessibility props
    if (!component.props.accessible) score -= 20;
    if (!component.props.accessibilityLabel) score -= 20;
    if (!component.props.accessibilityRole) score -= 10;

    // Check for color contrast
    if (!this.hasGoodContrast(component)) score -= 15;

    // Check for touch target size
    if (!this.hasProperTouchTarget(component)) score -= 15;

    // Check for keyboard accessibility
    if (!this.isKeyboardAccessible(component)) score -= 10;

    // Check for screen reader support
    if (!this.hasScreenReaderSupport(component)) score -= 10;

    return Math.max(score, 0);
  }

  private static hasGoodContrast(component: any): boolean {
    // Implementation for color contrast checking
    return true;
  }

  private static hasProperTouchTarget(component: any): boolean {
    // Implementation for touch target size checking
    return true;
  }

  private static isKeyboardAccessible(component: any): boolean {
    // Implementation for keyboard accessibility checking
    return true;
  }

  private static hasScreenReaderSupport(component: any): boolean {
    // Implementation for screen reader support checking
    return true;
  }
}
```

## 🚨 Common Issues

### 1. Missing Accessibility Labels

**Problem**: Interactive elements without accessibility labels

**Solution**: Add proper accessibility labels

```typescript
// ❌ Bad - Missing accessibility label
<TouchableOpacity onPress={handlePress}>
  <Text>Submit</Text>
</TouchableOpacity>

// ✅ Good - With accessibility label
<TouchableOpacity
  onPress={handlePress}
  accessible={true}
  accessibilityLabel="Submit form"
  accessibilityHint="Press to submit the form"
>
  <Text>Submit</Text>
</TouchableOpacity>
```

### 2. Poor Color Contrast

**Problem**: Text not readable due to poor color contrast

**Solution**: Use colors with sufficient contrast

```typescript
// ❌ Bad - Poor contrast
const styles = StyleSheet.create({
  text: {
    color: '#999999', // Poor contrast on white background
  },
});

// ✅ Good - Good contrast
const styles = StyleSheet.create({
  text: {
    color: '#333333', // Good contrast on white background
  },
});
```

### 3. Small Touch Targets

**Problem**: Touch targets too small for easy interaction

**Solution**: Ensure minimum touch target size

```typescript
// ❌ Bad - Small touch target
<TouchableOpacity style={{ width: 20, height: 20 }}>
  <Text>X</Text>
</TouchableOpacity>

// ✅ Good - Proper touch target size
<TouchableOpacity style={{
  width: 44,
  height: 44,
  justifyContent: 'center',
  alignItems: 'center',
}}>
  <Text>X</Text>
</TouchableOpacity>
```

## 📈 Success Metrics

### Accessibility Compliance

- **WCAG 2.1 AA compliance**: 100%
- **Screen reader compatibility**: 100%
- **Keyboard navigation**: 100%
- **Color contrast**: 100% meets AA standards

### User Experience

- **Accessibility score**: > 90%
- **User satisfaction**: > 4.5 stars
- **Support tickets**: < 1% accessibility-related
- **User retention**: > 80% among accessibility users

## 🎉 Best Practices

### Do's

- Add accessibility labels to all interactive elements
- Ensure sufficient color contrast ratios
- Provide keyboard navigation support
- Test with real screen readers
- Use semantic HTML elements
- Provide alternative text for images
- Test with users with disabilities

### Don'ts

- Don't rely only on color to convey information
- Don't use small touch targets
- Don't ignore keyboard navigation
- Don't forget to test with assistive technologies
- Don't use generic accessibility labels
- Don't ignore user feedback
- Don't forget to update accessibility as you add features

Remember: Accessibility is not just about compliance—it's about creating inclusive experiences that work for everyone. Focus on making your app usable by people with diverse abilities and needs.
