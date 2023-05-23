import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../../components/utiles/Loading';
import MessageBox from '../../components/utiles/MessageBox';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';
import axios from 'axios';
import ErrorMessage from '../../components/utiles/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.scss';

// Order History Object
const ORDER_HISTORY = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};

const initialState = {
  loading: true,
  error: '',
  orders: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ORDER_HISTORY.FETCH_REQUEST:
      return { ...state, loading: true, error: '' };
    case ORDER_HISTORY.FETCH_SUCCESS:
      return { ...state, orders: action.payload, loading: false, error: '' };
    case ORDER_HISTORY.FETCH_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const OrderHistory = () => {
  const navigate = useNavigate();
  // Global state variables
  const { user } = useContext(UserCartContext);
  // Loca state variables
  const [{ loading, error, orders }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Display the order history in the frontend
  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: ORDER_HISTORY.FETCH_REQUEST });

      try {
        const settings = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + '/api/productOrders/user/orders',
          settings
        );
        dispatch({ type: ORDER_HISTORY.FETCH_SUCCESS, payload: data });
      } catch (err) {
        dispatch({
          type: ORDER_HISTORY.FETCH_FAIL,
          payload: ErrorMessage(err),
        });
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <main className="order-history-page">
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <section className="order-history-container">
        <h1 className="order-history-title">Order History</h1>
        <div className="table-container">
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox> {error} </MessageBox>
          ) : (
            <table className="table">
              <thead className='table-header'>
                <tr>
                  <th> Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className='table-body'>
                {orders.map((order) => {
                  return (
                    <tr key={order._id}>
                      <td> {order._id} </td>
                      {/* // substring is used to show only the date, but not the time of order */}
                      <td> {order.createdAt.substring(0, 10)} </td>
                      <td> {order.totalPrice.toFixed(2)} </td>
                      <td>
                        {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                      </td>
                      <td>
                        {order.deliveredAt
                          ? order.deliveredAt.substring(0, 10)
                          : 'No'}
                      </td>
                      <td>
                        <button
                          type="button"
                          variant="light"
                          onClick={() => navigate(`/productOrders/${order._id}`)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
};

export default OrderHistory;
