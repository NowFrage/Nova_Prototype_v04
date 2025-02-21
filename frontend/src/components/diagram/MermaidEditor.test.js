import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import MermaidEditor from './MermaidEditor';

// Mock plus précis de mermaid
jest.mock('mermaid', () => {
  const actualMermaid = jest.requireActual('mermaid');
  return {
    ...actualMermaid,
  initialize: jest.fn(),
  render: jest.fn().mockImplementation((id, code) => {
      if (code.includes('invalid')) {
        return Promise.reject(new Error('Invalid diagram'));
      }
    return Promise.resolve({
        svg: `<div>${code}</div>`
    });
  })
  };
  });

describe('MermaidEditor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders textarea for diagram input', () => {
    render(<MermaidEditor />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('updates diagram on valid input change', async () => {
    render(<MermaidEditor />);
    const textarea = screen.getByRole('textbox');

    await act(async () => {
      fireEvent.change(textarea, { 
        target: { value: 'graph TD\nA-->B' } 
      });
    });

    await waitFor(() => {
      const preview = screen.getByTestId('diagram-preview');
      expect(preview.innerHTML).toContain('graph TD');
  });
});

  it('shows error message for invalid diagram', async () => {
    render(<MermaidEditor />);
    const textarea = screen.getByRole('textbox');
    
    await act(async () => {
      fireEvent.change(textarea, { 
        target: { value: 'invalid diagram' } 
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Erreur de syntaxe dans le diagramme')).toBeInTheDocument();
    });
  });
});