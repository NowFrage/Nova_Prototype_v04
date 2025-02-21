import React from 'react';
import IconButton from '../components/common/IconButton';
import useThemeStore from '../store/themeStore';
import useMemoryPanelStore from '../store/memoryPanelStore';
import ChatInterface from '../components/chat/ChatInterface';
import MermaidEditor from '../components/diagram/MermaidEditor';
import ModelSelector from '../components/ModelSelector';
import MemoryPanel from '../components/memory/MemoryPanel';
import '../styles/layout.css';

const ThemeIcon = () => (
  <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path className="theme-light-icon" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    <path className="theme-dark-icon" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const MemoryIcon = () => (
  <svg className="memory-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
    <path d="M9 9h6M9 13h6M9 17h6" />
  </svg>
);

const MainLayout = () => {
  const { isDarkMode, toggle: toggleTheme } = useThemeStore();
  const { isOpen: isMemoryOpen, toggle: toggleMemory } = useMemoryPanelStore();

  return (
    <div className="main-layout">
      <header className="main-header">
        <div className="header-left">
          <h1 className="app-title">NOVA</h1>
          <ModelSelector />
        </div>
        <div className="header-right">
          <button 
            className="header-icon-button"
            onClick={toggleMemory}
            title="Mémoire"
          >
            <span className="header-emoji">🧠</span>
          </button>
          <button 
            className="header-icon-button"
            onClick={toggleTheme}
            title={isDarkMode ? "Mode clair" : "Mode sombre"}
          >
            <span className="header-emoji">{isDarkMode ? '🌙' : '☀️'}</span>
          </button>
        </div>
      </header>
      
      <main className="main-content">
        <div className="split-view">
          <div className="chat-section">
            <ChatInterface />
          </div>
          <div className="editor-section">
            <MermaidEditor />
        </div>
        </div>
      </main>

      <MemoryPanel isOpen={isMemoryOpen} onClose={toggleMemory} />
    </div>
  );
};

export default MainLayout;
