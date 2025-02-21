import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DiagramView from '../DiagramView';

// Mock du composant MermaidEditor
jest.mock('../../components/diagram/MermaidEditor', () => {
  return function MockMermaidEditor({ value, onChange, diagramType }) {
    return (
      <div data-testid="mermaid-editor" data-diagram-type={diagramType}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-testid="mermaid-input"
        />
      </div>
    );
  };
});

describe('DiagramView', () => {
  it('renders diagram type selector with all options', () => {
    render(<DiagramView />);
    const selector = screen.getByRole('combobox');
    expect(selector).toBeInTheDocument();
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4); // flowchart, sequence, class, state
    expect(options[0]).toHaveValue('flowchart');
  });

  it('updates diagram type when selection changes', () => {
    render(<DiagramView />);
    const selector = screen.getByRole('combobox');
    
    fireEvent.change(selector, { target: { value: 'sequence' } });
    const editor = screen.getByTestId('mermaid-editor');
    expect(editor).toHaveAttribute('data-diagram-type', 'sequence');
  });

  it('passes diagram content to MermaidEditor', () => {
    render(<DiagramView />);
    const input = screen.getByTestId('mermaid-input');
    
    fireEvent.change(input, { target: { value: 'graph TD;' } });
    expect(input).toHaveValue('graph TD;');
  });
});