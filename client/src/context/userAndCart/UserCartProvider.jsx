import React, { createContext, useReducer } from 'react';
import UserCartReducer from './UserCartReducer';

// Initial State variables
export const initialState = {
  //& 2. Get saved user in the local storage
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,

  cart: {
    //* Step 2: Get cartItems from the local storage
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],

    user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,

    shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},

    //! Since it is string, you do not need "JSON.parse"
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
  },
};

// Context
export const UserCartContext = createContext(initialState);

// Context Provider function
const UserCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserCartReducer, initialState);
  return (
    <UserCartContext.Provider
      value={{
        dispatch,
        user: state.user,
        cart: state.cart,
        cartItems: state.cart.cartItems,
        shippingAddress: state.cart.shippingAddress,
        paymentMethod: state.cart.paymentMethod,
      }}
    >
      {children}
    </UserCartContext.Provider>
  );
};

export default UserCartProvider;
