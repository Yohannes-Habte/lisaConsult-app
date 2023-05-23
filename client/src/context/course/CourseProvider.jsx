import React, { createContext, useReducer } from 'react';
import CourseReducer from './CourseReducer';

// Initial state
export const initialState = {
  course: localStorage.getItem('course')
    ? JSON.parse(localStorage.getItem('course'))
    : {},
  studentAddress: localStorage.getItem('studentAddress')
    ? JSON.parse(localStorage.getItem('studentAddress'))
    : {},
  paymentMethod: localStorage.getItem('paymentMethod')
    ? localStorage.getItem('paymentMethod')
    : '',
};

// Create course context
export const CourseContext = createContext(initialState);
const CourseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CourseReducer, initialState);

  return (
    <CourseContext.Provider
      value={{
        course: state.course,
        studentAddress: state.studentAddress,
        paymentMethod: state.paymentMethod,
        dispatch,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;
