import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import UserCartProvider from './context/userAndCart/UserCartProvider';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import CourseProvider from './context/course/CourseProvider';
import PagesProvider from './context/pagesData/PagesProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserCartProvider>
      <CourseProvider>
        <PagesProvider>
          <HelmetProvider>
            <PayPalScriptProvider deferLoading={true}>
              <App />
            </PayPalScriptProvider>
          </HelmetProvider>
        </PagesProvider>
      </CourseProvider>
    </UserCartProvider>
  </React.StrictMode>
);
