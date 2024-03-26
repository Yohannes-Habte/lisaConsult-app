import React from 'react';
import "./AboutPage.scss"
import Header from '../../components/user/layout/header/Header';

const AboutPage = () => {
  return (
    <main className="about-page">
      <Header />
      <article className="about-page-container">
        <h1 className="about-page-title"> About Us </h1>
      </article>
    </main>
  );
};

export default AboutPage;
