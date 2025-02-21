import React from 'react';
import './IconButton.css';

const IconButton = ({ icon, label, onClick, active }) => {
  return (
    <button 
      className={`icon-button ${active ? 'active' : ''}`}
      onClick={onClick}
      title={label}
    >
      <span className="icon-wrapper">{icon}</span>
      <span className="icon-tooltip">{label}</span>
    </button>
  );
};

export default IconButton;