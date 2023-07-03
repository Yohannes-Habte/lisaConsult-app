import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

import BgProvider from './context/background/BgProvider';
import UserProvider from './context/user/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BgProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BgProvider>
    </UserProvider>
  </React.StrictMode>
);
