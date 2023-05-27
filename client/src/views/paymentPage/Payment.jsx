import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';
import { USER_CART_ACTION } from '../../context/userAndCart/UserCartReducer';
import ProductCheckoutSteps from '../../components/utiles/CheckoutSteps';
import './Payment.scss';

const Payment = () => {
  const navigate = useNavigate();

  // Global state variables
  const { shippingAddress, paymentMethod, dispatch}  =
    useContext(UserCartContext);

  // Local state variable
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  // useEffect
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  // Submit payment
  const submitPayment = async (e) => {
    e.preventDefault();
    dispatch({
      type: USER_CART_ACTION.PAYMENT_METHOD,
      payload: paymentMethodName,
    });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <main className="payment-page">
      <Helmet>
        <title className="payment-title"> Payment </title>
      </Helmet>
      <ProductCheckoutSteps step1 step2 step3  ></ProductCheckoutSteps>

      <h1 className='title'> Payment Methods </h1>

      <form onSubmit={submitPayment} action="" className="payment-form">
        <div className="payment-input">
          <input
            type="radio"
            name="paymentMethodName"
            is="payPal"
            value={paymentMethodName}
            checked={paymentMethodName === 'payPal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="payPal">PayPal</label>
        </div>

        <div className="payment-input">
          <input
            type="radio"
            name="paymentMethodName"
            is="stripe"
            value={paymentMethodName}
            checked={paymentMethodName === 'stripe'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          <label htmlFor="stripe">Stripe</label>
        </div>

        <button className="payment-btn"> Next </button>
      </form>
    </main>
  );
};

export default Payment;
