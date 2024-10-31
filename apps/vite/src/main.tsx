import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './App';
import { initSW } from './lib/sw-helper.js';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (import.meta.env.MODE !== 'development') {
  initSW();
}
