import { Input } from '@/components/ui/input';

describe('Input Component', () => {
  // Basic Rendering Tests
  it('renders with placeholder', () => {
    const input = <Input placeholder="Enter text" />;
    expect(input).toBeDefined();
    expect(input.props.placeholder).toBe('Enter text');
  });

  it('renders with label', () => {
    const input = <Input label="Email" placeholder="Enter email" />;
    expect(input.props.label).toBe('Email');
    expect(input.props.placeholder).toBe('Enter email');
  });

  it('renders with helperText', () => {
    const input = <Input helperText="This is helper text" placeholder="Enter text" />;
    expect(input.props.helperText).toBe('This is helper text');
    expect(input.props.placeholder).toBe('Enter text');
  });

  it('renders with error message', () => {
    const input = <Input error="This field is required" placeholder="Enter text" />;
    expect(input.props.error).toBe('This field is required');
    expect(input.props.placeholder).toBe('Enter text');
  });

  // Icon Tests
  it('renders with leftIcon as ReactNode', () => {
    const input = <Input leftIcon="🔍" placeholder="Search" />;
    expect(input.props.leftIcon).toBe('🔍');
    expect(input.props.placeholder).toBe('Search');
  });

  it('renders with rightIcon as ReactNode', () => {
    const input = <Input rightIcon="👁️" placeholder="Password" />;
    expect(input.props.rightIcon).toBe('👁️');
    expect(input.props.placeholder).toBe('Password');
  });

  // Interaction Tests
  it('handles text input via onChangeText', () => {
    const onChangeText = jest.fn();
    const input = <Input placeholder="Enter text" onChangeText={onChangeText} />;

    expect(input.props.onChangeText).toBe(onChangeText);
    expect(input.props.placeholder).toBe('Enter text');
  });

  it('handles focus events', () => {
    const onFocus = jest.fn();
    const input = <Input placeholder="Enter text" onFocus={onFocus} />;

    expect(input.props.onFocus).toBe(onFocus);
    expect(input.props.placeholder).toBe('Enter text');
  });

  it('handles blur events', () => {
    const onBlur = jest.fn();
    const input = <Input placeholder="Enter text" onBlur={onBlur} />;

    expect(input.props.onBlur).toBe(onBlur);
    expect(input.props.placeholder).toBe('Enter text');
  });

  // State Tests
  it('is disabled when disabled prop is true', () => {
    const input = <Input disabled placeholder="Disabled input" />;

    expect(input.props.disabled).toBe(true);
    expect(input.props.placeholder).toBe('Disabled input');
  });

  it('is readonly when readonly prop is true', () => {
    const input = <Input readonly placeholder="Readonly input" />;

    expect(input.props.readonly).toBe(true);
    expect(input.props.placeholder).toBe('Readonly input');
  });

  it('renders with different visual states', () => {
    const focusedInput = <Input state="focused" placeholder="Focused input" />;
    const errorInput = <Input state="error" placeholder="Error input" />;
    const disabledInput = <Input state="disabled" placeholder="Disabled input" />;

    expect(focusedInput.props.state).toBe('focused');
    expect(errorInput.props.state).toBe('error');
    expect(disabledInput.props.state).toBe('disabled');
  });

  // Variant Tests
  it('renders with different variants', () => {
    const defaultInput = <Input variant="default" placeholder="Default input" />;
    const outlineInput = <Input variant="outline" placeholder="Outline input" />;
    const filledInput = <Input variant="filled" placeholder="Filled input" />;

    expect(defaultInput.props.variant).toBe('default');
    expect(outlineInput.props.variant).toBe('outline');
    expect(filledInput.props.variant).toBe('filled');
  });

  // Accessibility Tests
  it('has proper accessibility props', () => {
    const input = (
      <Input
        label="Email"
        accessibilityLabel="Email input"
        accessibilityHint="Enter your email address"
        placeholder="Enter email"
      />
    );

    expect(input.props.label).toBe('Email');
    expect(input.props.accessibilityLabel).toBe('Email input');
    expect(input.props.accessibilityHint).toBe('Enter your email address');
    expect(input.props.placeholder).toBe('Enter email');
  });
});
