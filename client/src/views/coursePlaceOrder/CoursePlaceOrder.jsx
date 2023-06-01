import React, { useContext, useEffect, useReducer } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CourseContext } from '../../context/course/CourseProvider';
import axios from 'axios';
import { COURSE_ACTION } from '../../context/course/CourseReducer';
import { Helmet } from 'react-helmet-async';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';
import './CoursePlaceOrder.scss';

// Object for placing an order
const COURSE_ORDER = {
  ORDER_REQUEST: 'ORDER_REQUEST',
  ORDER_SUCCESS: 'ORDER_SUCCESS',
  ORDER_FAIL: 'ORDER_FAIL',
};

// Object for placing an order
const PAYMENT_ACTION = {
  PAYMENT_REQUEST: 'ORDER_REQUEST',
  PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
  PAYMENT_FAIL: 'PAYMENT_FAIL',
};

// Initial state
const initialState = {
  loading: false,
};

// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    // Order
    case COURSE_ORDER.ORDER_REQUEST:
      return { ...state, loading: true };
    case COURSE_ORDER.ORDER_SUCCESS:
      return { ...state, loading: false };
    case COURSE_ORDER.ORDER_FAIL:
      return { ...state, loading: false };
    // Payment

    case PAYMENT_ACTION.PAYMENT_REQUEST:
      return { ...state, loading: true };
    case PAYMENT_ACTION.PAYMENT_SUCCESS:
      return { ...state, loading: false };
    case PAYMENT_ACTION.PAYMENT_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
const CoursePlaceOrder = () => {
  const navigate = useNavigate();
  // Global state variables
  const {
    course,
    studentAddress,
    paymentMethod,
    dispatch: contextDispatch,
  } = useContext(CourseContext);

  // Local state variables
  const [{ loading }, dispatch] = useReducer(reducer, initialState);
  const { user } = useContext(UserCartContext);

  // Course Price calculations
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  // useEffect
  useEffect(() => {
    if (!paymentMethod) {
      navigate('/coursePayment');
    }
  }, [navigate]);

  //=======================================================
  // Submit Product order
  //=======================================================
  const submitOrder = async () => {
    try {
      const newOrder = {
        course: course,
        studentAddress: studentAddress,
        paymentMethod: paymentMethod,
      };

      // Request an order
      dispatch({ type: COURSE_ORDER.ORDER_REQUEST });

      // Authorization is used to identify a hacker or lawful logged in user
      // const settings = {
      //   headers: {
      //     authorization: `Bearer ${user.token}`,
      //   },
      // };

      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + '/api/courseRegistrations',
        newOrder,
        //settings
      );
      contextDispatch({ type: COURSE_ACTION.ADD_COURSE, payload: data });
      dispatch({ type: COURSE_ORDER.ORDER_SUCCESS });

      localStorage.setItem('courseOrder', JSON.stringify(data));

      navigate("/stripePayment")
    } catch (error) {
      console.log(error);
      dispatch({ type: COURSE_ORDER.ORDER_FAIL });
    }
  };

 
  return (
    <main className="course-order-page">
      <Helmet>
        <title>Course order preview</title>
      </Helmet>

      <section className="course-order-container">
        <h1 className="course-order-title"> General Course Order Preview </h1>
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
                {' '}
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
                {' '}
                Edit
              </NavLink>
            </article>
          </div>

          <article className="course-order-summary">
            <h4 className="subTitle">Course Order Summary</h4>
            <div className="course-price">
              <p className="price"> Course Price: </p>
              <p className="price"> Course Tax: </p>
              <hr />
              <p className="price"> Total Price: </p>
              <hr />
            </div>
            <button onClick={submitOrder} className="course-order-btn">
              Submit Order
            </button>

            <article className="support">
              <h4 className="title">Do You Need Support?</h4>
              <p>
                If you need suport, click on{' '}
                <NavLink to={'/contact'} className="link">
                  {' '}
                  Help Me{' '}
                </NavLink>{' '}
              </p>
            </article>
            <article className="success">
              <h4 className="title"> Celebrate Your Success! </h4>
              <p> Your dream comes true. Congratulation! </p>
            </article>
          </article>
        </div>
      </section>
    </main>
  );
};

export default CoursePlaceOrder;
