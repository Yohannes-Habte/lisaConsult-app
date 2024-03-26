import React from 'react';
import './ContactPage.scss';
import Header from '../../components/user/layout/header/Header';

const ContactPage = () => {
  return (
    <main className="contact-page">
      <Header />
      <article className="contact-page-container">
        <h1 className="contact-page-title"> contact Us </h1>
      </article>
    </main>
  );
};

export default ContactPage;
