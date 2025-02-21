import React, { useState } from 'react';
import MermaidEditor from '../components/diagram/MermaidEditor';

const DiagramView = () => {
  const [currentDiagram, setCurrentDiagram] = useState('');
  const [diagramType, setDiagramType] = useState('flowchart');

  const diagramTypes = [
    { id: 'flowchart', label: 'Flowchart' },
    { id: 'sequence', label: 'Sequence Diagram' },
    { id: 'class', label: 'Class Diagram' },
    { id: 'state', label: 'State Diagram' }
  ];

  return (
    <div className="diagram-view">
      <header className="diagram-header">
        <h2>Éditeur de Diagrammes</h2>
        <select 
          value={diagramType} 
          onChange={(e) => setDiagramType(e.target.value)}
          className="diagram-type-selector"
        >
          {diagramTypes.map(type => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
      </header>

      <main className="diagram-main">
        <MermaidEditor 
          value={currentDiagram}
          onChange={setCurrentDiagram}
          diagramType={diagramType}
        />
      </main>
    </div>
  );
};

export default DiagramView;