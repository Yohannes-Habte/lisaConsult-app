import React, { useContext, useEffect, useReducer } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CourseContext } from '../../context/course/CourseProvider';
import axios from 'axios';
import { COURSE_ACTION } from '../../context/course/CourseReducer';
import { Helmet } from 'react-helmet-async';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';

// Object for placing an order
const COURSE_ORDER = {
  ORDER_REQUEST: 'ORDER_REQUEST',
  ORDER_SUCCESS: 'ORDER_SUCCESS',
  ORDER_FAIL: 'ORDER_FAIL',
};

// Initial state
const initialState = {
  loading: false,
};

// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case COURSE_ORDER.ORDER_REQUEST:
      return { ...state, loading: true };
    case COURSE_ORDER.ORDER_SUCCESS:
      return { ...state, loading: false };
    case COURSE_ORDER.ORDER_FAIL:
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
      const settings = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + '/api/courseRegistrations',
        newOrder, settings
      );
      contextDispatch({ type: COURSE_ACTION.ADD_COURSE, payload: data });
      dispatch({ type: COURSE_ORDER.ORDER_SUCCESS });

      localStorage.setItem('courseOrder', JSON.stringify(data));
    } catch (error) {
      console.log(error);
      dispatch({ type: COURSE_ORDER.ORDER_FAIL });
    }
  };

  return (
    <main className="order-page">
      <Helmet>
        <title>Order Preview</title>
      </Helmet>

      <section className="order-container">
        <h1 className="order-title"> General Course Order Preview </h1>
        <div>
          {/* Course Order */}
          <article className="course-order">
            <h4>Course</h4>
            <p>
              <strong>Name:</strong> {course.name}
            </p>

            <p>
              <strong>Start on:</strong> {course.start}
            </p>

            <NavLink to={'/course'}> Edit</NavLink>
          </article>
          {/* Shipping Address */}
          <article className="shipping-address">
            <h4>Address</h4>

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

            <NavLink to={'/studentAddress'}> Edit</NavLink>
          </article>

          {/* Payment Method */}
          <article className="payment-method">
            <h4>Payment</h4>
            <p>
              <strong>Method:</strong> {paymentMethod}
            </p>
            <NavLink to={'/orderPayment'}> Edit</NavLink>
          </article>

          <button onClick={submitOrder} className="order-btn">
            Submit Order
          </button>
        </div>
      </section>
    </main>
  );
};

export default CoursePlaceOrder;
