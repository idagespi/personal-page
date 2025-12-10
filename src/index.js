import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Basic Tailwind setup (you'd typically put @tailwind directives in a separate CSS file,
// but for simplicity, we assume the build tool handles utility integration.)
import './index.css'; 

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
