import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { CourseContext } from '../../context/course/CourseProvider';
import { useContext } from 'react';
import './StripePayment.scss';

const StripePayment = () => {
  // Global state variables
  const { course, studentAddress, paymentMethod } = useContext(CourseContext);
  // Temporatry
  const price = 30000;
  const tax = price * 0.15;
  const total = price + tax;

  // =======================================================================================
  // Customer clicks pay on success page to load stripe payment (order already in database)
  //========================================================================================
  const stripePayment = async () => {
    const pay = {
      total: total,
    };

    const settings = {
      method: 'POST',
      body: JSON.stringify(pay),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + '/api/payment',
      settings
    );
    const result = await response.json();
    try {
      if (response.ok) {
        // setCart([]);
        window.location.href = result.url;
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="stripe-payment-page">
      <Helmet>
        <title> Stripe Payment </title>
      </Helmet>
      <section className="course-order-container">
        <h1 className="course-order-title"> Course Order Payment </h1>
        <div className="course-order-details">
          <div className="order-address-payment">
            {/* Course Order */}
            <article className="course-order">
              <h4 className="subTitle">Course Information</h4>
              <p>
                <strong>Name:</strong> {course.name}
              </p>

              <p>
                <strong>Start on:</strong> {course.start}
              </p>

              <NavLink to={'/course'} className={'edit'}>
                Edit
              </NavLink>
            </article>
            {/* Shipping Address */}
            <article className="student-address">
              <h4 className="subTitle"> Student Address</h4>

              <ul>
                <li>
                  <strong>Name:</strong> {studentAddress.firstName}{' '}
                  {studentAddress.lastName}
                </li>
                <li>
                  <strong>Profession: </strong> {studentAddress.profession}
                </li>

                <li>
                  <strong>Language: </strong> {studentAddress.language}
                </li>
                <li>
                  <strong>Gender: </strong> {studentAddress.gender}
                </li>
                <li>
                  <strong>Phone: </strong> {studentAddress.phone}
                </li>
              </ul>
              <p>
                <strong>Address: </strong> {studentAddress.address}{' '}
                {studentAddress.houseNo}, {studentAddress.zipCode},{' '}
                {studentAddress.city}, {studentAddress.state},{' '}
                {studentAddress.country}{' '}
              </p>
              <p></p>

              <NavLink to={'/studentAddress'} className={'edit'}>
                {' '}
                Edit
              </NavLink>
            </article>

            {/* Payment Method */}
            <article className="payment-method">
              <h4 className="subTitle">Payment Method</h4>
              <p>
                <strong>Method:</strong> {paymentMethod}
              </p>
              <NavLink to={'/coursPayment'} className={'edit'}>
                Edit
              </NavLink>
            </article>
          </div>

          <article className="course-order-summary">
            <h4 className="subTitle"> Payment Summary</h4>
            <div className="course-price">
              <p className="price"> Course Price: ${price} </p>
              <p className="price"> Course Tax: $ {tax} </p>
              <hr />
              <p className="price"> Total Price: {total} </p>
              <hr />
            </div>
            <article className="payment">
              <h1 className="title">Contintue to Stripe Payment</h1>
              <button onClick={stripePayment} className="course-order-btn">
                Pay
              </button>
            </article>
          </article>
        </div>
      </section>
    </main>
  );
};

export default StripePayment;
