import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ModelSelector from './ModelSelector';

describe('ModelSelector', () => {
  it('renders all available models', () => {
    const { getByRole } = render(<ModelSelector />);
    const select = getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('changes selected model', () => {
    const { getByRole } = render(<ModelSelector />);
    const select = getByRole('combobox');
    fireEvent.change(select, { target: { value: 'ollama' } });
    expect(select.value).toBe('ollama');
  });
});