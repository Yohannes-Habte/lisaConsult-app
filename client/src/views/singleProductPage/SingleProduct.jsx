import React, { useContext, useEffect } from 'react';
import { ServiceContext } from '../../context/investments/ServiceProvider';
import axios from 'axios';
import { SINGLE_PRODUCT_ACTION } from '../../context/investments/Reducer';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../components/utiles/Loading';
import Message from '../../components/utiles/MessageBox';
import Rating from '../../components/rating/Rating';
import ErrorMessage from '../../components/utiles/ErrorMessage';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';
import { USER_CART_ACTION } from '../../context/userAndCart/UserCartReducer';
import './SingleProduct.scss';

const SingleProduct = () => {
  // Navigate
  const navigate = useNavigate();
  // Global state variables
  const { loading, product, error, dispatch } = useContext(ServiceContext);
  const { cart, dispatch: userCartDispatch } = useContext(UserCartContext);

  // Display the product in the frontend
  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: SINGLE_PRODUCT_ACTION.FETCH_FAIL });
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/products/${productId}`
        );

        dispatch({ type: SINGLE_PRODUCT_ACTION.FETCH_SUCCESS, payload: data });
      } catch (error) {
        console.log(error);
        dispatch({
          type: SINGLE_PRODUCT_ACTION.FETCH_FAIL,
          payload: ErrorMessage(error),
        });
      }
    };
    fetchProduct();
  }, []);

  // Find product ID using useLocation() hook
  const location = useLocation();
  const productId = location.pathname.split('/')[2];

  // Add to cart function
  //& Step 1 adding item to cart:. To add to cart and increasing the quantity of a product:
  const addToCart = async () => {
    // Setep 1: Find the item that has to be added to the cart
    const existingProduct = cart.cartItems.find(
      (item) => item._id === product._id
    );
    // Setep 2: Set the quantity of an existing item (existingItem) in the cart
    const quantity = existingProduct ? existingProduct.quantity + 1 : 1;
    // quantity demand should be less than count in stock (countInStock)
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_URL + `/api/products/${product._id}`
    );
    if (data.countInStock < quantity) {
      window.alert(
        'Sorry, Product is out of stock. Please contact us to address your need!'
      );
      return;
    } else {
      userCartDispatch({
        type: USER_CART_ACTION.ADD_ITEM_TO_CART,
        payload: { ...product, quantity },
      });
    }

    navigate('/cart');
  };

  return (
    <main className="single-product-page">
      <section className="single-product-container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger"> {error} </Message>
        ) : (
          <div className="single-product">
            <figure className="product-image">
              <img src={product.image} alt={product.name} className="image" />
            </figure>

            <article className='single-product-details'>
              <h1 className="single-product-nane"> {product.name} </h1>
              <span className="rating-container">
                Rating: <Rating rating={product.rating} />
              </span>
              <p>
                <strong>Price</strong>: ${product.price}
              </p>
              <p>
                <strong>Description</strong>: {product.description}
              </p>
            </article>

            <aside className="sigle-product-status">
              <p className="price">
                <strong>Price:</strong> ${product.price}
              </p>

              {/* //! How to manage product  stock   */}
              <div className="status-container">
                <strong>Status:</strong>
                {product.countInStock > 0 ? (
                  <span>
                    <span className="in-stock"> In Stock</span>

                    {/* You can add to cart if count in the stock is greater than zero  */}
                    <div className="btn-container">
                      <button onClick={addToCart} className="sigle-product-btn">
                        Add to Cart
                      </button>
                    </div>
                  </span>
                ) : (
                  <span className="out-of-stock"> Out of stock </span>
                )}
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
};

export default SingleProduct;
