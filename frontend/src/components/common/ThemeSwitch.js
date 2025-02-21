import React from 'react';
import useThemeStore from '../../store/themeStore';
import './ThemeSwitch.css';

const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button 
      className="theme-switch"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeSwitch;