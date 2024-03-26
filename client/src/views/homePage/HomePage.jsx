import React from 'react';
import './HomePage.scss';
import Header from '../../components/user/layout/header/Header';

const HomePage = () => {
  return (
    <main className="home-page">
      <Header />
      <article className="home-page-container">
        <h1 className="home-page-title"> Home Title </h1>
      </article>
    </main>
  );
};

export default HomePage;
