import React, { createContext } from 'react';
import { useReducer } from 'react';
import AdminReducer from './AdminReducer';

export const ADMIN_ACTION = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  ADMIN_LOG_OUT: 'ADMIN_LOG_OUT',
};

// Initial states
const initialState = {
  //user: null,
  user: localStorage.getItem("user")? JSON.parse(localStorage.getItem('user')) : null,
  loading: false,
  error: null,
};


// user context
export const AdminContext = createContext(initialState);

const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, initialState);

  return (
    <AdminContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
