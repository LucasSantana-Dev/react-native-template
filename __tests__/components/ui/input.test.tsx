import { fireEvent, render } from '@testing-library/react-native';

import { Input } from '@/components/ui/input';

describe.skip('Input Component', () => {
  it('renders correctly with default props', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText } = render(<Input label="Email" placeholder="Enter email" />);
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders with helper text', () => {
    const { getByText } = render(
      <Input helperText="This is helper text" placeholder="Enter text" />,
    );
    expect(getByText('This is helper text')).toBeTruthy();
  });

  it('renders with error state', () => {
    const { getByText } = render(<Input error="This field is required" placeholder="Enter text" />);
    expect(getByText('This field is required')).toBeTruthy();
  });

  it('renders with left icon', () => {
    const { getByText } = render(<Input leftIcon="🔍" placeholder="Search" />);
    expect(getByText('🔍')).toBeTruthy();
  });

  it('renders with right icon', () => {
    const { getByText } = render(<Input rightIcon="👁️" placeholder="Password" />);
    expect(getByText('👁️')).toBeTruthy();
  });

  it('handles text input', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" onChangeText={onChangeText} />,
    );

    fireEvent.changeText(getByPlaceholderText('Enter text'), 'test input');
    expect(onChangeText).toHaveBeenCalledWith('test input');
  });

  it('handles focus events', () => {
    const onFocus = jest.fn();
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" onFocus={onFocus} />);

    fireEvent(getByPlaceholderText('Enter text'), 'focus');
    expect(onFocus).toHaveBeenCalled();
  });

  it('handles blur events', () => {
    const onBlur = jest.fn();
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" onBlur={onBlur} />);

    fireEvent(getByPlaceholderText('Enter text'), 'blur');
    expect(onBlur).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    const { getByPlaceholderText } = render(<Input disabled placeholder="Disabled input" />);

    const input = getByPlaceholderText('Disabled input');
    expect(input.props.editable).toBe(false);
  });

  it('is readonly when readonly prop is true', () => {
    const { getByPlaceholderText } = render(<Input readonly placeholder="Readonly input" />);

    const input = getByPlaceholderText('Readonly input');
    expect(input.props.editable).toBe(false);
  });

  it('renders with different states', () => {
    const { getByPlaceholderText, rerender } = render(
      <Input state="focused" placeholder="Focused input" />,
    );
    expect(getByPlaceholderText('Focused input')).toBeTruthy();

    rerender(<Input state="error" placeholder="Error input" />);
    expect(getByPlaceholderText('Error input')).toBeTruthy();

    rerender(<Input state="disabled" placeholder="Disabled input" />);
    expect(getByPlaceholderText('Disabled input')).toBeTruthy();
  });

  it('has proper accessibility props', () => {
    const { getByLabelText } = render(
      <Input
        label="Email"
        accessibilityLabel="Email input"
        accessibilityHint="Enter your email address"
        placeholder="Enter email"
      />,
    );

    expect(getByLabelText('Email')).toBeTruthy();
  });
});
