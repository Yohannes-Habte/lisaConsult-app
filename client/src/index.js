import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import ServiceProvider from './context/investments/ServiceProvider';
import { HelmetProvider } from 'react-helmet-async';
import UserCartProvider from './context/userAndCart/UserCartProvider';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import CourseProvider from './context/course/CourseProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserCartProvider>
      <CourseProvider>
        <ServiceProvider>
          <HelmetProvider>
            <PayPalScriptProvider deferLoading={true}>
              <App />
            </PayPalScriptProvider>
          </HelmetProvider>
        </ServiceProvider>
      </CourseProvider>
    </UserCartProvider>
  </React.StrictMode>
);
