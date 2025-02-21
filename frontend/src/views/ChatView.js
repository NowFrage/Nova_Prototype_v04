import React from 'react';
import ChatInterface from '../components/chat/ChatInterface';
import MemoryPanel from '../components/memory/MemoryPanel';
import useModelStore from '../store/modelStore';

const ChatView = () => {
  const { selectedModel } = useModelStore();

  return (
    <div className="chat-view">
      <div className="chat-container">
        <header className="chat-header">
          <h2>Chat avec {selectedModel}</h2>
        </header>
        
        <div className="chat-layout">
          <main className="chat-main">
            <ChatInterface />
          </main>
          
          <aside className="chat-sidebar">
            <MemoryPanel />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ChatView;