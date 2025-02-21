import React from 'react';
import { useEffect, useState } from 'react';
import MainLayout from './layouts/MainLayout';
import useThemeStore from './store/themeStore';
import './styles/App.css';
import './styles/theme.css';
import './styles/layout.css';

const App = () => {
  const [health, setHealth] = useState(null);
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  useEffect(() => {
    // Vérification de la santé du serveur
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setHealth(data.status))
      .catch(err => console.error('Erreur health check:', err));
  }, []);

  // Mise à jour du thème
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light'
    );
  }, [isDarkMode]);

  return (
    <div
      className="app"
      style={{
        backgroundColor:
          health === 'OK'
            ? isDarkMode
              ? '#264a2d'
              : '#e8f5e9'
            : isDarkMode
              ? '#442326'
              : '#ffebee'
      }}
    >
      <MainLayout />
    </div>
  );
};

export default App;
