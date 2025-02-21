import React, { useState, useRef, useEffect } from 'react';
import { chatService } from '../../services/apiChat';
import useModelStore from '../../store/modelStore';
import Message from './Message';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const { selectedModel } = useModelStore();
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setCurrentFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setCurrentFile(file);
  };

  const removeFile = () => {
    setCurrentFile(null);
    fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!message.trim() && !currentFile) || isLoading) return;

    const userMessage = {
      content: message,
      timestamp: new Date(),
      isUser: true,
      file: currentFile
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setCurrentFile(null);
    setIsLoading(true);

    try {
      const formData = new FormData();
      if (message.trim()) formData.append('message', message);
      if (currentFile) formData.append('file', currentFile);
      
      const response = await chatService.sendMessage(formData, selectedModel);
      const aiMessage = {
        content: response.message,
        timestamp: new Date(),
        isUser: false
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        content: 'Désolé, une erreur est survenue. Veuillez réessayer.',
        timestamp: new Date(),
        isUser: false,
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleAttachment = () => {
    fileInputRef.current.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-interface">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h2>Bienvenue dans NOVA</h2>
            <p>Je suis là pour vous aider à concevoir et développer votre projet.</p>
            <p>Commencez par me décrire votre idée ou posez-moi une question.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <Message key={index} message={msg} isUser={msg.isUser} />
          ))
        )}
        {isLoading && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <form
          className="chat-input-form"
          onSubmit={handleSubmit}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleFileDrop}
        >
          <textarea
            ref={inputRef}
            className="chat-input"
            value={message}
            onChange={handleMessageChange}
            placeholder="Tapez votre message..."
            rows={1}
            onKeyDown={handleKeyDown}
          />
          <div className="chat-buttons">
            <button
              type="button"
              className="attachment-button"
              onClick={handleAttachment}
              title="Ajouter un fichier"
            >
              <span className="header-emoji">⛓️‍💥</span>
            </button>
            <button
              type="submit"
              className="send-button"
              disabled={!message.trim() && !currentFile}
              title="Envoyer"
            >
              <svg
                className="send-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>

      {currentFile && (
        <div className="file-preview">
          <span>📄 {currentFile.name}</span>
          <button type="button" className="remove-file" onClick={removeFile}>
            ✕
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default ChatInterface;