import React from 'react'

const StripePayment = () => {
     // =======================================================================================
  // Customer clicks pay on success page to load stripe payment (order already in database)
  //========================================================================================

  const stripePayment = async () => {
    // Temporatry
    const total = 30000;
    const pay = {
      total: total,
    };

    const settings = {
      method: 'POST',
      body: JSON.stringify(pay),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + '/api/payment',
      settings
    );
    const result = await response.json();
    try {
      if (response.ok) {
        // setCart([]);
        window.location.href = result.url;
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
        <h1>Stripe Payment</h1>
        <button onClick={stripePayment}> Pay </button>
    </div>
  )
}

export default StripePayment