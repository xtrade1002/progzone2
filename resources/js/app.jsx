import React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap.js';
import App from './App.jsx';

function renderApplication() {
  const container = document.getElementById('app');

  if (!container) {
    if (import.meta?.env?.DEV) {
      console.error('Nem található a gyökérelem az alkalmazás csatolásához.');
    }

    return;
  }

  createRoot(container).render(<App />);
}

renderApplication();

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    renderApplication();
  });
}
