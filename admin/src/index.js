import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

import BgProvider from './context/background/BgProvider';
import AdminProvider from './context/admin/AdminProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminProvider>
      <BgProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BgProvider>
    </AdminProvider>
  </React.StrictMode>
);
