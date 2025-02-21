import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsView from '../SettingsView';

// Mock des stores
const mockSetModel = jest.fn();
const mockSetTheme = jest.fn();

jest.mock('../../store/modelStore', () => ({
  __esModule: true,
  default: () => ({
    selectedModel: 'gpt-3.5-turbo',
    setModel: mockSetModel
  })
}));

jest.mock('../../store/themeStore', () => ({
  __esModule: true,
  default: () => ({
    theme: 'light',
    setTheme: mockSetTheme
  })
}));

describe('SettingsView', () => {
  beforeEach(() => {
    mockSetModel.mockClear();
    mockSetTheme.mockClear();
  });

  it('renders all settings sections', () => {
    render(<SettingsView />);
    expect(screen.getByText('Modèle IA')).toBeInTheDocument();
    expect(screen.getByText('Interface')).toBeInTheDocument();
  });

  it('updates model selection', () => {
    render(<SettingsView />);
    const modelSelect = screen.getByLabelText('Modèle par défaut');
    
    fireEvent.change(modelSelect, { target: { value: 'gpt-4' } });
    expect(mockSetModel).toHaveBeenCalledWith('gpt-4');
  });

  it('updates theme selection', () => {
    render(<SettingsView />);
    const themeSelect = screen.getByLabelText('Thème');
    
    fireEvent.change(themeSelect, { target: { value: 'dark' } });
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});