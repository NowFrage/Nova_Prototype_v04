import React from 'react';
import useModelStore from '../store/modelStore';
import useThemeStore from '../store/themeStore';

const SettingsView = () => {
  const { selectedModel, setModel } = useModelStore();
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="settings-view">
      <header className="settings-header">
        <h2>Paramètres</h2>
      </header>

      <main className="settings-main">
        <section className="settings-section">
          <h3>Modèle IA</h3>
          <div className="setting-item">
            <label htmlFor="model-select">Modèle par défaut</label>
            <select 
              id="model-select"
              value={selectedModel}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
            </select>
          </div>
        </section>

        <section className="settings-section">
          <h3>Interface</h3>
          <div className="setting-item">
            <label htmlFor="theme-select">Thème</label>
            <select
              id="theme-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
              <option value="system">Système</option>
            </select>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsView;