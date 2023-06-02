import React from 'react';

// Checkout steps for product order
 export const ProductCheckoutSteps = (props) => {
  return (
    <section className="product-order-checkout-steps">
      <div className={props.step1 ? 'active' : ''}>Sign in</div>
      <div className={props.step2 ? 'active' : ''}>Shipping</div>
      <div className={props.step3 ? 'active' : ''}>Payment</div>
      <div className={props.step4 ? 'active' : ''}>Place Order</div>
    </section>
  );
};

// Checkout steps for course registration
export const CourseCheckoutSteps = (props) => {
  return (
    <section className="course-registration-checkout-steps">
      <div className={props.step1 ? 'active' : ''}>Login</div>
      <div className={props.step2 ? 'active' : ''}>Course</div>
      <div className={props.step3 ? 'active' : ''}> Address </div>
      <div className={props.step4 ? 'active' : ''}>Payment </div>
      <div className={props.step5 ? 'active' : ''}> Registration</div>
    </section>
  );
};

