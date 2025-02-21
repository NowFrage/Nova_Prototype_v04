import React from 'react';

const Message = ({ message, isUser }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message-bubble ${isUser ? 'user-message' : 'ai-message'}`}>
      <div className="message-header">
        <div className="message-avatar">
          {isUser ? '👤' : '🤖'}
        </div>
        <span className="message-sender">
          {isUser ? 'Vous' : 'NOVA'}
        </span>
        <span className="message-time">
          {formatTime(message.timestamp)}
        </span>
      </div>
      <div className="message-content">
        {message.content}
      </div>
    </div>
  );
};

export default Message;