
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App';
import './index.css';

import { CafeListProvider } from './context/CafeListContext';

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <HashRouter>
      <CafeListProvider>
        <App />
      </CafeListProvider>
    </HashRouter>
  </React.StrictMode>
);
