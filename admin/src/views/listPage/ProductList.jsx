import React from 'react';
import './List.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import ProductsTable from '../../components/tables/dataTable/ProductsTable';

const ProductList = () => {
  return (
    <main className="list-page">
      <Sidebar />

      <div className="list-container">
        <Navbar />
        <ProductsTable />
      </div>
    </main>
  );
};

export default ProductList;
