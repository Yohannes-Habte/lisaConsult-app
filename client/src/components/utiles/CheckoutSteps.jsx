import React from 'react';

// Checkout steps for product order
 const ProductCheckoutSteps = (props) => {
  return (
    <section className="checkout-steps">
      <div className={props.step1 ? 'active' : ''}>Sign in</div>
      <div className={props.step2 ? 'active' : ''}>Shipping</div>
      <div className={props.step3 ? 'active' : ''}>Payment</div>
      <div className={props.step4 ? 'active' : ''}>Place Order</div>
    </section>
  );
};

export default ProductCheckoutSteps;
