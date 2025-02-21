import React from 'react';
import './TabManager.css';

const TabManager = ({ tabs, activeTab, onTabChange, onTabClose, onNewTab }) => {
  return (
    <div className="tab-manager">
      <div className="tabs-list">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-title">{tab.title}</span>
            <button
              className="close-tab"
              onClick={e => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
            >
              ✕
            </button>
          </div>
        ))}
        <button className="new-tab" onClick={onNewTab}>
          +
        </button>
      </div>
    </div>
  );
};

export default TabManager;