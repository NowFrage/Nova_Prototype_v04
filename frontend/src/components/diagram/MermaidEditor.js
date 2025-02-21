import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import TabManager from './TabManager';
import './MermaidEditor.css';

const DEFAULT_DIAGRAM = `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[OK]
    B -->|No| D[Cancel]`;

const MermaidEditor = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Diagramme 1', content: DEFAULT_DIAGRAM }
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const previewRef = useRef(null);
  const editorRef = useRef(null);

  const getCurrentTab = () => tabs.find(tab => tab.id === activeTab);

  const handleMouseDown = e => {
    if (e.button === 1 || e.button === 0) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - pan.x,
        y: e.clientY - pan.y
      });
    }
  };

  const handleMouseMove = e => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = e => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 2));
    }
  };

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme:
        document.documentElement.getAttribute('data-theme') === 'dark'
          ? 'dark'
          : 'default',
      securityLevel: 'loose',
      fontFamily: 'var(--font-family)'
    });
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
    const currentTab = getCurrentTab();
        if (!currentTab) return;
        
        const { svg } = await mermaid.render('preview', currentTab.content);
        if (previewRef.current) {
          previewRef.current.innerHTML = svg;
    }
        setError(null);
      } catch (err) {
        setError(err.message || 'Erreur de syntaxe dans le diagramme');
      }
  };

    const timeoutId = setTimeout(() => {
      renderDiagram();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [tabs, activeTab]);

  const handleTabChange = tabId => {
    setActiveTab(tabId);
  };

  const handleNewTab = () => {
    const newId = Math.max(...tabs.map(t => t.id)) + 1;
    setTabs([
      ...tabs,
      {
        id: newId,
        title: `Diagramme ${newId}`,
        content: DEFAULT_DIAGRAM
      }
    ]);
    setActiveTab(newId);
};

  const handleTabClose = tabId => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId) {
      setActiveTab(newTabs[0].id);
    }
  };

  const handleContentChange = content => {
    setTabs(
      tabs.map(tab => (tab.id === activeTab ? { ...tab, content } : tab))
    );
  };

  const handleCopy = () => {
    const currentTab = getCurrentTab();
    if (currentTab) {
      navigator.clipboard.writeText(currentTab.content);
    }
  };

  const handleClear = () => {
    if (window.confirm('Voulez-vous vraiment effacer le diagramme ?')) {
      handleContentChange('');
    }
  };

  return (
    <div className="mermaid-editor">
      <div className="editor-toolbar">
        <h3>Éditeur Mermaid</h3>
        <div className="toolbar-buttons">
          <button type="button" onClick={handleCopy} className="toolbar-button">
            Copier
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="toolbar-button"
          >
            Effacer
          </button>
          <div className="zoom-controls">
            <button
              onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
              className="toolbar-button"
            >
              -
            </button>
            <span>{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
              className="toolbar-button"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <TabManager
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onTabClose={handleTabClose}
        onNewTab={handleNewTab}
      />

      <div className="editor-content">
        <div className="code-panel">
          <textarea
            ref={editorRef}
            value={getCurrentTab()?.content || ''}
            onChange={e => handleContentChange(e.target.value)}
            placeholder="Entrez votre diagramme Mermaid ici..."
            className="code-editor"
            spellCheck="false"
          />
          {error && <div className="error-message">Erreur : {error}</div>}
        </div>

        <div
          className="preview-panel"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            ref={previewRef}
            className="mermaid-preview"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MermaidEditor;