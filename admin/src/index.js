import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import UserProvider from './context/User/UserProvider';
import BgProvider from './context/background/BgProvider';

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
