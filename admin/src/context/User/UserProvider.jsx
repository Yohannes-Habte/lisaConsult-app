import React, { createContext, useReducer } from 'react';
import UserReducer from './UserReducer';

// Initial State
const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
};

// user context
export const UserContext = createContext(initialState);

// The function
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
