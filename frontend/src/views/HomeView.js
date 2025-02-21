import React from 'react';
import ModelSelector from '../components/ModelSelector';
import ThemeSwitch from '../components/common/ThemeSwitch';

const HomeView = () => {
  return (
    <div className="home-view">
      <header className="home-header">
        <h1>NOVA - Assistant IA pour le développement</h1>
        <div className="header-controls">
          <ThemeSwitch />
        </div>
      </header>
      
      <main className="home-main">
        <section className="model-section">
          <h2>Sélection du modèle</h2>
          <ModelSelector />
        </section>
        
        <section className="features-section">
          <h2>Fonctionnalités</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Chat IA</h3>
              <p>Interaction en langage naturel pour le développement</p>
            </div>
            <div className="feature-card">
              <h3>Diagrammes</h3>
              <p>Création et édition de diagrammes avec Mermaid</p>
            </div>
            <div className="feature-card">
              <h3>Mémoire Contextuelle</h3>
              <p>Conservation du contexte des conversations</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeView;