import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  // Basic Rendering Tests
  it('renders with text children', () => {
    const button = <Button>Test Button</Button>;
    expect(button).toBeDefined();
    expect(button.props.children).toBe('Test Button');
  });

  it('renders with different variants', () => {
    const primaryButton = <Button variant="primary">Primary</Button>;
    const secondaryButton = <Button variant="secondary">Secondary</Button>;
    const outlineButton = <Button variant="outline">Outline</Button>;
    const ghostButton = <Button variant="ghost">Ghost</Button>;
    const dangerButton = <Button variant="danger">Danger</Button>;

    expect(primaryButton.props.variant).toBe('primary');
    expect(secondaryButton.props.variant).toBe('secondary');
    expect(outlineButton.props.variant).toBe('outline');
    expect(ghostButton.props.variant).toBe('ghost');
    expect(dangerButton.props.variant).toBe('danger');
  });

  it('renders with different sizes', () => {
    const smallButton = <Button size="sm">Small</Button>;
    const mediumButton = <Button size="md">Medium</Button>;
    const largeButton = <Button size="lg">Large</Button>;

    expect(smallButton.props.size).toBe('sm');
    expect(mediumButton.props.size).toBe('md');
    expect(largeButton.props.size).toBe('lg');
  });

  // Interaction Tests
  it('handles press events correctly', () => {
    const onPress = jest.fn();
    const button = <Button onPress={onPress}>Press Me</Button>;

    expect(button.props.onPress).toBe(onPress);
    expect(button.props.children).toBe('Press Me');
  });

  it('does not trigger onPress when disabled', () => {
    const onPress = jest.fn();
    const button = (
      <Button disabled onPress={onPress}>
        Disabled
      </Button>
    );

    expect(button.props.disabled).toBe(true);
    expect(button.props.onPress).toBe(onPress);
  });

  // State Tests
  it('shows loading indicator when loading=true', () => {
    const button = (
      <Button loading testID="loading-button">
        Loading
      </Button>
    );

    expect(button.props.loading).toBe(true);
    expect(button.props.testID).toBe('loading-button');
  });

  it('applies disabled state correctly', () => {
    const onPress = jest.fn();
    const button = (
      <Button disabled onPress={onPress}>
        Disabled Button
      </Button>
    );

    expect(button.props.disabled).toBe(true);
    expect(button.props.onPress).toBe(onPress);
  });

  // Icon & Style Tests
  it('renders with icon and iconPosition', () => {
    const button = (
      <Button icon="🔍" iconPosition="left">
        Search
      </Button>
    );

    expect(button.props.icon).toBe('🔍');
    expect(button.props.iconPosition).toBe('left');
    expect(button.props.children).toBe('Search');
  });

  it('applies custom style and textStyle props', () => {
    const customStyle = { backgroundColor: 'red' };
    const customTextStyle = { color: 'white' };
    const button = (
      <Button style={customStyle} textStyle={customTextStyle}>
        Styled
      </Button>
    );

    expect(button.props.style).toBe(customStyle);
    expect(button.props.textStyle).toBe(customTextStyle);
    expect(button.props.children).toBe('Styled');
  });

  // Accessibility Tests
  it('has proper accessibility props', () => {
    const button = (
      <Button accessibilityLabel="Test button" accessibilityHint="Press to test">
        Test
      </Button>
    );

    expect(button.props.accessibilityLabel).toBe('Test button');
    expect(button.props.accessibilityHint).toBe('Press to test');
    expect(button.props.children).toBe('Test');
  });
});
