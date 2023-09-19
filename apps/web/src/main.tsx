import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { RootView } from './views/RootView';
import { AuthProvider } from './views/AuthProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RootView />
    </AuthProvider>
  </React.StrictMode>,
);
