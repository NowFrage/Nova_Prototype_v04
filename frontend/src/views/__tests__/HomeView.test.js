import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeView from '../HomeView';

// Mock des composants enfants
jest.mock('../../components/ModelSelector', () => {
  return function MockModelSelector() {
    return <div data-testid="model-selector">ModelSelector Mock</div>;
  };
});

jest.mock('../../components/common/ThemeSwitch', () => {
  return function MockThemeSwitch() {
    return <div data-testid="theme-switch">ThemeSwitch Mock</div>;
  };
});

describe('HomeView', () => {
  it('renders the main title', () => {
    render(<HomeView />);
    expect(screen.getByText('NOVA - Assistant IA pour le développement')).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(<HomeView />);
    expect(screen.getByText('Chat IA')).toBeInTheDocument();
    expect(screen.getByText('Diagrammes')).toBeInTheDocument();
    expect(screen.getByText('Mémoire Contextuelle')).toBeInTheDocument();
  });

  it('renders ModelSelector component', () => {
    render(<HomeView />);
    expect(screen.getByTestId('model-selector')).toBeInTheDocument();
  });

  it('renders ThemeSwitch component', () => {
    render(<HomeView />);
    expect(screen.getByTestId('theme-switch')).toBeInTheDocument();
  });
});