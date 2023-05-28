import React, { createContext, useReducer } from 'react';
import BgReducer from './BgReducer';

// Initial State
const initialState = {
  darkMode: false,
};

// Create Context
export const BackgroundContext = createContext(initialState);

// Function
const BgProvider = ({ children }) => {
  // State variables
  const [state, dispatch] = useReducer(BgReducer, initialState);
  return (
    <BackgroundContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export default BgProvider;
