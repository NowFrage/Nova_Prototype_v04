import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MemoryPanel from './MemoryPanel';

describe('MemoryPanel', () => {
  it('renders toggle button', () => {
    const { getByRole } = render(<MemoryPanel />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('toggles panel visibility', () => {
    const { getByRole, container } = render(<MemoryPanel />);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(container.querySelector('.visible')).toBeInTheDocument();
  });
});