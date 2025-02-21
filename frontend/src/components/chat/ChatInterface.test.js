import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import ChatInterface from './ChatInterface';
import { chatService } from '../../services/apiChat';

// Mock du service API
jest.mock('../../services/apiChat', () => ({
  chatService: {
    sendMessage: jest.fn(() => new Promise(resolve => setTimeout(() => resolve({ message: 'Response message' }), 100)))
  }
}));

// Mock du store
jest.mock('../../store/modelStore', () => ({
  __esModule: true,
  default: () => ({
    selectedModel: 'gpt-3.5-turbo'
  })
}));

describe('ChatInterface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input field and send button', () => {
    render(<ChatInterface />);
    expect(screen.getByPlaceholderText('Tapez votre message...')).toBeInTheDocument();
    expect(screen.getByText('Envoyer')).toBeInTheDocument();
  });

  it('handles message input', () => {
    render(<ChatInterface />);
    const input = screen.getByPlaceholderText('Tapez votre message...');
    fireEvent.change(input, { target: { value: 'Test message' } });
    expect(input.value).toBe('Test message');
  });

  it('disables input and button while loading', async () => {
    render(<ChatInterface />);
    const input = screen.getByPlaceholderText('Tapez votre message...');
    const button = screen.getByText('Envoyer');
    const form = screen.getByTestId('chat-form');

    // Simuler l'envoi du message
    fireEvent.change(input, { target: { value: 'Test message' } });
    
    // Utiliser act pour envelopper les actions asynchrones
    await act(async () => {
    fireEvent.submit(form);
  });

    // Attendre que l'état de chargement soit appliqué
    await waitFor(() => {
      const disabledInput = screen.getByPlaceholderText('Tapez votre message...');
      const disabledButton = screen.getByText('Envoyer');
      expect(disabledInput).toHaveAttribute('disabled');
      expect(disabledButton).toHaveAttribute('disabled');
});

    // Attendre la réponse simulée
    await waitFor(() => {
      const enabledInput = screen.getByPlaceholderText('Tapez votre message...');
      expect(enabledInput).not.toHaveAttribute('disabled');
    }, { timeout: 2000 });
});
  });
