import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatView from '../ChatView';

// Mock des composants et du store
jest.mock('../../components/chat/ChatInterface', () => {
  return function MockChatInterface() {
    return <div data-testid="chat-interface">ChatInterface Mock</div>;
  };
});

jest.mock('../../components/memory/MemoryPanel', () => {
  return function MockMemoryPanel() {
    return <div data-testid="memory-panel">MemoryPanel Mock</div>;
  };
});

jest.mock('../../store/modelStore', () => ({
  __esModule: true,
  default: () => ({
    selectedModel: 'gpt-3.5-turbo'
  })
}));

describe('ChatView', () => {
  it('renders with selected model in header', () => {
    render(<ChatView />);
    expect(screen.getByText('Chat avec gpt-3.5-turbo')).toBeInTheDocument();
  });

  it('renders ChatInterface component', () => {
    render(<ChatView />);
    expect(screen.getByTestId('chat-interface')).toBeInTheDocument();
  });

  it('renders MemoryPanel component', () => {
    render(<ChatView />);
    expect(screen.getByTestId('memory-panel')).toBeInTheDocument();
  });
});