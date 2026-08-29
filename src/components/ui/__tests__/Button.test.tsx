import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders correctly with label', async () => {
    await render(<Button label="Submit Test" />);
    expect(screen.getByText('Submit Test')).toBeTruthy();
  });

  it('calls onPress when clicked', async () => {
    const onPressMock = jest.fn();
    await render(<Button label="Click Me" onPress={onPressMock} />);
    
    fireEvent.press(screen.getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when loading', async () => {
    const onPressMock = jest.fn();
    // Use getByTestId if loading hides text, but here we can just use the component structure
    await render(<Button label="Loading" onPress={onPressMock} loading accessibilityRole="button" />);
    
    const button = screen.getByRole('button');
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
