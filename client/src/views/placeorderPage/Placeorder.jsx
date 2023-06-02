import React, { useContext, useEffect, useReducer } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';
import axios from 'axios';
import { USER_CART_ACTION } from '../../context/userAndCart/UserCartReducer';
import { toast } from 'react-toastify';
import ErrorMessage from '../../components/utiles/ErrorMessage';
import { Helmet } from 'react-helmet-async';
import {ProductCheckoutSteps} from '../../components/utiles/CheckoutSteps';
import Loading from '../../components/utiles/Loading';
import {
  GiFlowers,
  GiFlowerPot,
  GiFireFlower,
  GiFlowerStar,
  GiLotusFlower,
} from 'react-icons/gi';
import './Placeorder.scss';

// Object for placing an order
const PLACING_ORDER = {
  ORDER_REQUEST: 'ORDER_REQUEST',
  ORDER_SUCCESS: 'ORDER_SUCCESS',
  ORDER_FAIL: 'ORDER_FAIL',
};
// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case PLACING_ORDER.ORDER_REQUEST:
      return { ...state, loading: true };
    case PLACING_ORDER.ORDER_SUCCESS:
      return { ...state, loading: false };
    case PLACING_ORDER.ORDER_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
const Placeorder = () => {
  const navigate = useNavigate();

  // Global state variables
  const { user, cart, dispatch: contextDispatch } = useContext(UserCartContext);

  // Local state variable
  //! loading-step-1: loading is used below the placing an order button
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  // Rounding to two decimal place
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  // total items' price
  cart.itemsPrice = round2(
    cart.cartItems.reduce((accu, curr) => accu + curr.quantity * curr.price, 0)
  );
  // shipping price
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  // Tax price
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  // overall total price
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  // useEffect
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  //=======================================================
  // Submit Product order
  //=======================================================
  const submitOrder = async () => {
    try {
      const newOrder = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      };

      // Authorization is used to identify a hacker or lawful logged in user
      const settings = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };

      // Request an order
      dispatch({ type: PLACING_ORDER.ORDER_REQUEST });

      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + '/api/productOrders',
        newOrder,
        settings
      );

      // Clear the cart after placing an order
      contextDispatch({ type: USER_CART_ACTION.CLEAR_CART });
      // successful order
      dispatch({ type: PLACING_ORDER.ORDER_SUCCESS });

      //& After placing an order, make the cart local storage empty
      localStorage.removeItem('cartItems');
      navigate(`/productOrders/${data.productOrder._id}`); // productOrder is the order created in the backend
    } catch (err) {
      dispatch({ type: PLACING_ORDER.ORDER_FAIL });
      toast.error(ErrorMessage(err));
    }
  };

  return (
    <main className="order-page">
      <Helmet>
        <title>Order Preview</title>
      </Helmet>

      <ProductCheckoutSteps step1 step2 step3 step4></ProductCheckoutSteps>

      <section className="order-container">
        <h1 className="order-title"> General Order Preview </h1>
        <div className="order-details">
          <div className="ordered-items-address-payment">
            {/* Shopping Items */}
            <article className="ordered-items">
              <h4>Shopping Items</h4>
              <div className="items-info">
                {cart.cartItems.map((item) => {
                  return (
                    <div key={item._id} className="item-container">
                      <div className="image-name">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="image"
                        />
                      </div>

                      <div className="name">
                        <NavLink to={`/products/${item._id}`}>
                          {item.name}
                        </NavLink>
                      </div>

                      <div> {item.quantity} </div>

                      <div className="item-price"> ${item.price} </div>
                    </div>
                  );
                })}
                <NavLink to={'/cart'}> Edit</NavLink>
              </div>
            </article>

            {/* Shipping Address */}
            <article className="shipping-address">
              <h4>Shipping</h4>
              <p>
                <strong>Name:</strong> {cart.shippingAddress.firstName}{' '}
                {cart.shippingAddress.lastName}
              </p>
              <p>
                <strong>Address: </strong> {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.zipCode}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.state}, {cart.shippingAddress.country}{' '}
              </p>

              <NavLink to={'/shipping'}> Edit</NavLink>
            </article>

            {/* Payment Method */}
            <article className="payment-method">
              <h4>Payment</h4>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
              <NavLink to={'/payment'}> Edit</NavLink>
            </article>
          </div>

          {/* Order summary */}
          <article className="order-summary">
            <h4>Order Summary</h4>
            <div className="order-summary-details">
              <div className="total-of-items">
                <p>
                  <strong>Items:</strong>
                </p>
                <p>${cart.itemsPrice.toFixed(2)}</p>
              </div>

              <div className="total-of-items">
                <p>
                  <strong>Shipping:</strong>
                </p>
                <p>${cart.shippingPrice.toFixed(2)}</p>
              </div>

              <div className="total-of-items">
                <p>
                  <strong>Tax</strong>
                </p>
                <p>${cart.taxPrice.toFixed(2)}</p>
              </div>

              <hr />

              <div className="total-of-items">
                <p>
                  <strong>Total</strong>
                </p>
                <p>
                  <strong>${cart.totalPrice.toFixed(2)}</strong>
                </p>
              </div>
              <hr />
            </div>
            <button onClick={submitOrder} className="order-btn">
              Submit Order
            </button>

            {/* //! loading-step-2: loading is used using <Loading> */}
            {loading && <Loading></Loading>}

            <section className="further-info">
              <h3>You Need Support? </h3>
              <p className="text-info">
                For more information, we would be happy to hear from you. If you
                would like to contact us, please{' '}
                <NavLink to={'/contact'}>click here</NavLink>.
              </p>

              <div className="icons-container">
                <GiFlowers className="icon" /> <GiFlowerPot className="icon" />{' '}
                <GiFireFlower className="icon" />{' '}
                <GiFlowerStar className="icon" />{' '}
                <GiLotusFlower className="icon" />{' '}
              </div>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Placeorder;
