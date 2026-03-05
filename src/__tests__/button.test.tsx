import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { Button } from '@/components/button';

jest.mock('@/hooks/use-theme-color', () => ({
  useThemeColor: () => '#0a7ea4',
}));

describe('Button', () => {
  it('renders the label', () => {
    render(<Button label="Submit" />);
    expect(screen.getByText('Submit')).toBeTruthy();
  });

  it('shows "Loading…" when loading is true', () => {
    render(<Button label="Submit" loading />);
    expect(screen.getByText('Loading…')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(<Button label="Submit" onPress={onPress} />);
    fireEvent.press(screen.getByText('Submit'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(<Button label="Submit" onPress={onPress} disabled />);
    fireEvent.press(screen.getByText('Submit'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const onPress = jest.fn();
    render(<Button label="Submit" onPress={onPress} loading />);
    fireEvent.press(screen.getByText('Loading…'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders secondary variant', () => {
    render(<Button label="Cancel" variant="secondary" />);
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('renders ghost variant', () => {
    render(<Button label="Skip" variant="ghost" />);
    expect(screen.getByText('Skip')).toBeTruthy();
  });
});
