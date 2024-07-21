// src/hooks/useDarkMode.js
import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  return [mode, toggleMode];
};