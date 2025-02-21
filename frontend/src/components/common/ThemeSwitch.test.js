import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ThemeSwitch from './ThemeSwitch';

describe('ThemeSwitch', () => {
  it('toggles theme when clicked', () => {
    const { getByRole } = render(<ThemeSwitch />);
    const toggle = getByRole('checkbox');
    fireEvent.click(toggle);
    expect(toggle.checked).toBe(true);
  });
});