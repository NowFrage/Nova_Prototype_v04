import React, { useState, useEffect } from 'react';
import { memoryService } from '../../services/memoryService';
import './MemoryPanel.css';

const MemoryPanel = ({ isOpen, onClose }) => {
  const [memories, setMemories] = useState([]);
  const [activeTab, setActiveTab] = useState('history');
  useEffect(() => {
    if (isOpen) {
      loadMemories();
    }
  }, [isOpen]);

  const loadMemories = async () => {
    try {
      const data = await memoryService.getMemories();
      setMemories(data);
    } catch (error) {
      console.error('Erreur lors du chargement des mémoires:', error);
    }
  };

  return (
    <div className={`memory-panel ${isOpen ? 'open' : ''}`}>
      <div className="memory-header">
        <h3>Mémoire</h3>
        <button className="close-button" onClick={onClose}>✕</button>
      </div>

      <div className="memory-tabs">
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Historique
        </button>
        <button
          className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          Résumé
        </button>
        <button
          className={`tab-button ${activeTab === 'context' ? 'active' : ''}`}
          onClick={() => setActiveTab('context')}
        >
          Contexte IA
        </button>
      </div>

      <div className="memory-content">
        {activeTab === 'history' && (
          <div className="memory-list">
            {memories.map((memory) => (
              <div key={memory.id} className="memory-item">
                <div className="memory-item-header">
                  <span className="memory-timestamp">
                    {new Date(memory.timestamp).toLocaleString()}
                  </span>
                  <span className="memory-type">{memory.type}</span>
                </div>
                <div className="memory-item-content">{memory.content}</div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'summary' && (
          <div className="memory-summary">
            {/* Contenu du résumé */}
          </div>
        )}
        
        {activeTab === 'context' && (
          <div className="memory-context">
            {/* Contexte IA */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryPanel;