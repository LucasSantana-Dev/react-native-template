import { fireEvent, render } from '@testing-library/react-native';

import { Button } from '@/components/ui/button';

describe.skip('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('renders with different variants', () => {
    const { getByText: getByTextPrimary } = render(<Button variant="primary">Primary</Button>);
    const { getByText: getByTextSecondary } = render(
      <Button variant="secondary">Secondary</Button>
    );

    expect(getByTextPrimary('Primary')).toBeTruthy();
    expect(getByTextSecondary('Secondary')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const { getByText: getByTextSm } = render(<Button size="sm">Small</Button>);
    const { getByText: getByTextLg } = render(<Button size="lg">Large</Button>);

    expect(getByTextSm('Small')).toBeTruthy();
    expect(getByTextLg('Large')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Press Me</Button>);

    fireEvent.press(getByText('Press Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button disabled onPress={onPress}>
        Disabled
      </Button>
    );

    fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const { getByTestId } = render(
      <Button loading testID="loading-button">
        Loading
      </Button>
    );

    expect(getByTestId('loading-button')).toBeTruthy();
  });

  it('renders with icon', () => {
    const { getByText } = render(<Button icon="🔍">Search</Button>);

    expect(getByText('Search')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByText } = render(<Button style={customStyle}>Styled</Button>);

    expect(getByText('Styled')).toBeTruthy();
  });

  it('has proper accessibility props', () => {
    const { getByLabelText } = render(
      <Button accessibilityLabel="Test button" accessibilityHint="Press to test">
        Test
      </Button>
    );

    expect(getByLabelText('Test button')).toBeTruthy();
  });
});
