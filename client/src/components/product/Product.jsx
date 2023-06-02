import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Rating from '../rating/Rating';
import './Products.scss';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';
import axios from 'axios';
import { USER_CART_ACTION } from '../../context/userAndCart/UserCartReducer';

const Product = ({ product }) => {
  // Global state variables
  const { user, cartItems, dispatch } = useContext(UserCartContext);

  // Add to cart function from the home page
  const addToCart = async (meal) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_URL + `/api/products/${meal._id}`
    );
    if (data.countInStock < quantity) {
      window.alert(
        'Sorry, Product is out of stock. Please send us message how to meet your need!'
      );
      return;
    } else {
      dispatch({
        type: USER_CART_ACTION.ADD_ITEM_TO_CART,
        payload: { ...product, quantity },
      });
    }

    //navigate('/cart');
  };

  return (
    <article className="product-info">
      <figure className="product-image">
        <NavLink to={`/products/${product._id}`}>
          <img src={product.image} alt={product.name} className="image" />
        </NavLink>
      </figure>

      <article className="product-name-price">
        <h2 className="product-title">
          <NavLink to={`/products/${product._id}`}>{product.name}</NavLink>{' '}
        </h2>
        <span className="price"> ${product.price} </span>
      </article>

      <div className="rating-btn">
        {/* //& If there is not product in the stock, the button is disabled. If there is product, the button is active */}
        {product.countInStock === 0 ? (
          <button disabled className="product-btn">
            {' '}
            Out of Stock{' '}
          </button>
        ) : (
          <button onClick={() => addToCart(product)} className="product-btn">
            Add to Cart
          </button>
        )}
        <Rating rating={product.rating} />
      </div>

      <p className="product-description"> {product.description} </p>
    </article>
  );
};

export default Product;
