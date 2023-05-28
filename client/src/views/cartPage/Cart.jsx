import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';
import axios from 'axios';
import { USER_CART_ACTION } from '../../context/userAndCart/UserCartReducer';
import { Helmet } from 'react-helmet-async';
import Message from '../../components/utiles/MessageBox';
import { FaTrash } from 'react-icons/fa';
import './Cart.scss';

const Cart = () => {
  const navigate = useNavigate();

  // Global state variables
  const { dispatch, cart, cartItems, user } = useContext(UserCartContext);

  //~ 1. Function to increate and/or decreate product quantity in the cart
  const updateCart = async (product, quantity) => {
    // Find the product from the backend
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_URL + `/api/products/${product._id}`
    );
    if (data.countInStock < quantity) {
      window.alert(
        'Sorry, Product is out of stock. Please contact us to address your needs!'
      );
      return;
    } else {
      dispatch({
        type: USER_CART_ACTION.ADD_ITEM_TO_CART,
        payload: { ...product, quantity },
      });
    }
  };

  // Function to remove product from the cart
  const removeProduct = (product) => {
    dispatch({
      type: USER_CART_ACTION.REMOVE_ITEM_FROM_CART,
      payload: product,
    });
  };

  // Function that handle checkout
  const checkoutHandler = async () => {
    //! Step One: check whether user is signin. If user is logged in, direct the user to shipping address. Otherwise direct the user to login page
    if (user) {
      navigate('/shipping');
    } else {
      navigate('/login');
    }
  };

  return (
    <main className="cart-page">
      <Helmet>
        <title> Shopping Cart </title>
      </Helmet>

      <h1 className="cart-title"> Shopping Cart </h1>

      {cartItems.length === 0 ? (
        <Message>
          Cart is empty. <NavLink to={'/products'} className={"go-to-shopping"}> Go to Products Page for shopping! </NavLink>
        </Message>
      ) : (
        <div className="cart-items-details">
          <div className="itmes-info">
            {cartItems.map((product) => {
              return (
                <div key={product._id} className="cart-item-controller">
                  {/* Product image and name */}
                  <div className="item-image-name">
                    <figure className="image-container">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="image"
                      />
                    </figure>
                    <div className="product-name">
                      <NavLink to={`/products/${product._id}`} className={"link"}>
                        {product.name}
                      </NavLink>
                    </div>
                  </div>

                  {/* Product quantity management*/}
                  <div className="buttons-quantity-container">
                    {/* Decreating product quantity */}
                    <button
                      onClick={() => updateCart(product, product.quantity - 1)} //~ 3. Function to decrease quantity
                      disabled={product.quantity === 1}
                      className="quantity-btn"
                    >
                      -
                    </button>

                    {/* Product quantity */}
                    <span className="quantity">
                      <strong> {product.quantity}</strong>
                    </span>

                    {/* Increasing product quantity */}
                    <button
                      onClick={() => updateCart(product, product.quantity + 1)} //~ 2. Function to increate quantity
                      disabled={product.quantity === product.countInStock}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>

                  {/* Product Price */}
                  <div className="item-price"> ${product.price} </div>

                  {/* Delete a product from the cart */}
                  <div className="trash-icon">
                    <button
                      onClick={() => removeProduct(product)}
                      className="trash-btn"
                    >
                      <FaTrash className="icon" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total ordered products and price as well as to proceed to checkout*/}
          <div className="total-items-and-price">
            <h3 className="total">
              Subtotal (
              {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)})
              Products: $
              {cartItems.reduce(
                (acc, curr) => acc + curr.price * curr.quantity,
                0
              )}
            </h3>
            <button
              onClick={checkoutHandler}
              type="button"
              disabled={cart.cartItems.length <= 1}
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
