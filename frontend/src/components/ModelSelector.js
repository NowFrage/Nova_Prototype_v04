import React, { useState } from 'react';
import './ModelSelector.css';

const ModelSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('ChatGPT 4');

  const models = [
    { id: 'gpt4', name: 'ChatGPT 4', emoji: '🤖' },
    { id: 'gpt3', name: 'ChatGPT 3.5', emoji: '💫' },
    { id: 'claude', name: 'Claude 2', emoji: '🧠' },
    { id: 'llama', name: 'Llama 2', emoji: '🦙' }
  ];

  const handleSelect = (model) => {
                setSelectedModel(model.name);
                setIsOpen(false);
};

  return (
    <div className={`model-selector ${isOpen ? 'open' : ''}`}>
      <button 
        className="model-select-button"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="model-emoji">
          {models.find(m => m.name === selectedModel)?.emoji}
        </span>
        <span className="model-name">{selectedModel}</span>
        <span className="chevron">▾</span>
      </button>

      {isOpen && (
        <div className={`model-dropdown open`}>
          {models.map(model => (
            <button
              key={model.id}
              className={`model-option ${model.name === selectedModel ? 'selected' : ''}`}
              onClick={() => handleSelect(model)}
              type="button"
            >
              <span className="model-emoji">{model.emoji}</span>
              <span className="model-name">{model.name}</span>
              {model.name === selectedModel && (
                <span className="check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;