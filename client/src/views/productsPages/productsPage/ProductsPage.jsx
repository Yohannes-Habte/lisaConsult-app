import React from 'react';
import './ProductsPage.scss';
import Header from '../../../components/user/layout/header/Header';

const ProductsPage = () => {
  return (
    <main className="products-page">
      <Header />
      <article className="products-page-container">
        <h1 className="products-page-title"> Products Title </h1>
      </article>
    </main>
  );
};

export default ProductsPage;
