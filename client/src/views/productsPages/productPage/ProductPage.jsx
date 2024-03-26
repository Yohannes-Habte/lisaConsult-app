import React from 'react';
import './ProductPage.scss';
import Header from '../../../components/user/layout/header/Header';

const ProductPage = () => {
  return (
    <main className="product-page">
      <Header />
      <article className="product-page-container">
        <h1 className="product-page-title"> Product Title </h1>
      </article>
    </main>
  );
};

export default ProductPage;
