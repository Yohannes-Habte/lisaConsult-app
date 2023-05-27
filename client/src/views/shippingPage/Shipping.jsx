import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';
import { useNavigate } from 'react-router-dom';
import { USER_CART_ACTION } from '../../context/userAndCart/UserCartReducer';
import { toast } from 'react-toastify';
import ErrorMessage from '../../components/utiles/ErrorMessage';
import './Shipping.scss';
import ProductCheckoutSteps from '../../components/utiles/CheckoutSteps';

const Shipping = () => {
  // navigate to payment page
  const navigate = useNavigate();
  // Global state variables
  const { user, shippingAddress, dispatch } = useContext(UserCartContext);

  //! Local dynamic shipping address State Variables
  const [firstName, setFirstName] = useState(shippingAddress.firstName || '');
  const [lastName, setLastName] = useState(shippingAddress.lastName || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [state, setState] = useState(shippingAddress.state || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  // When a user is not logged in, user's shipping address should be deleted. To do so, you need to do ...
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Update inpute values
  const udpdateData = (e) => {
    switch (e.target.name) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
        break;
      case 'zipCode':
        setZipCode(e.target.value);
        break;
      case 'city':
        setCity(e.target.value);
        break;
      case 'state':
        setState(e.target.value);
        break;
      case 'country':
        setCountry(e.target.value);
        break;
      default:
        break;
    }
  };

  // Submit shipping address
  const submitShippingAddress = async (e) => {
    e.preventDefault();
    try {
      dispatch({
        type: USER_CART_ACTION.SHIPPING_ADDRESS,
        payload: {
          firstName,
          lastName,
          phone,
          address,
          zipCode,
          city,
          state,
          country,
        },
      });
      // address-step-1: Save shipping address in the browser local storage
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify({
          firstName,
          lastName,
          phone,
          address,
          zipCode,
          city,
          state,
          country,
        })
      );
      navigate('/payment');
    } catch (err) {
      toast.error(ErrorMessage(err));
    }
  };

  return (
    <main className="shipping-address-page">
      <Helmet>
        <title> Shipping Address </title>
      </Helmet>

      <ProductCheckoutSteps step1 step2 >  </ProductCheckoutSteps>

      <section className="shipping-address-container">
        <h1 className="shipping-address-title"> Shipping Address </h1>
        <form
          action=""
          onSubmit={submitShippingAddress}
          className="shipping-address-form"
        >
          <div className="shipping-attributes">
            <div className="label-input-container">
              <label htmlFor="firstName"> First Name </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="lastName"> Last Name </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="phone"> Phone </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="zipCode"> Zip Code </label>
              <input
                type="number"
                id="zipCode"
                name="zipCode"
                value={zipCode}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="city"> City </label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="state"> State </label>
              <input
                type="text"
                id="state"
                name="state"
                value={state}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={udpdateData} 
              />
            </div>
          </div>
          <button className="shipping-address-btn">Next</button>
        </form>
      </section>
    </main>
  );
};

export default Shipping;
