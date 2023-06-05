import React, { useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import './Products.scss';
import { Helmet } from 'react-helmet-async';
import Product from '../../components/product/Product';
import Loading from '../../components/utiles/Loading';
import Message from '../../components/utiles/MessageBox';
import ErrorMessage from '../../components/utiles/ErrorMessage';
import { PagesContext } from '../../context/pagesData/PagesProvider';
import {
  PRODUCTS_ACTION,
  PRODUCT_ACTION,
} from '../../context/pagesData/Reducer';

const Products = () => {
  // Global state variables
  const { loading, products, error, dispatch } = useContext(PagesContext);

  // Display product in the users
  useEffect(() => {
    const fetchProducts = async () => {
      // dispatch({ type: PRODUCT_ACTION.FETCH_REQUEST });
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/products`
        );
        dispatch({
          type: PRODUCTS_ACTION.FETCH_PRODUCTS_SUCCESS,
          payload: data,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: PRODUCTS_ACTION.FETCH_PRODUCTS_FAIL,
          payload: ErrorMessage(error),
        });
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="product-page">
      <Helmet>
        <title> Products </title>
      </Helmet>
      <section className="organic-foods-container">
        <h1 className="meals-title"> Organic Delicious Meals</h1>

        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger"> {error} </Message>
        ) : (
          <div className="products-container">
            {products.map((product) => {
              return (
                /* to get the attribut of the map product in the component Product, you need product={product} */
                <div key={product._id}>
                  <Product product={product} />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Products;
