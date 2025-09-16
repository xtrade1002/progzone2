import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

if (typeof window !== 'undefined' && window.location.pathname === '/') {
  window.history.replaceState(null, '', '/home');
}

const container = document.getElementById('app');

if (container) {
  createRoot(container).render(<App />);
}
