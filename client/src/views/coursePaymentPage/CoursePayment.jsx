import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseContext } from '../../context/course/CourseProvider';
import { COURSE_ACTION } from '../../context/course/CourseReducer';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import "./CoursePayment.scss"

const CoursePayment = () => {
  const navigate = useNavigate();
  // Global variables
  const { studentAddress, paymentMethod, dispatch } = useContext(CourseContext);

  // Local state variable
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  // useEffect
  useEffect(() => {
    if (!studentAddress.address) {
      navigate('/studentAddress');
    }
  }, [studentAddress, navigate]);

  // Submit payment
  const submitPayment = async (e) => {
    e.preventDefault();

    if (!paymentMethodName) {
      toast.error('Please select the payment method!');
    } else {
      try {
        dispatch({
          type: COURSE_ACTION.PAYMENT_METHOD,
          payload: paymentMethodName,
        });
        // Dynamic payment methods
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/coursePlaceOrder');
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <main className="course-payment-page">
      <Helmet>
        <title> Payment </title>
      </Helmet>
      <section className="course-payment-container">
        <h1 className="payment-title"> Payment Methods </h1>

        <form onSubmit={submitPayment} action="" className="course-payment-form">
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

          <button className="course-payment-btn"> Next </button>
        </form>
      </section>
    </main>
  );
};

export default CoursePayment;
