import React from 'react';

// Object
export const COURSE_ACTION = {
  ADD_COURSE: 'ADD_COURSE',
  REMOVE_COURSE: 'REMOVE_COURSE',
  STUDENT_ADDRESS: 'STUDENT_ADDRESS',
  PAYMENT_METHOD: 'PAYMENT_METHOD',
  CLEAR_CART: 'CLEAR_CART',
};

const CourseReducer = (state, action) => {
  switch (action.type) {
    // Add couse
    case COURSE_ACTION.ADD_COURSE:
      return { ...state, course: action.payload };

    // Student address
    case COURSE_ACTION.STUDENT_ADDRESS:
      return { ...state, studentAddress: action.payload };

    // Payment methods
    case COURSE_ACTION.PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};

export default CourseReducer;
