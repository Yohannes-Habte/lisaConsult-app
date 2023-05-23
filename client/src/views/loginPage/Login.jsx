import React, { useState, useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { HiOutlineEye } from 'react-icons/hi';
import { FaUserAlt } from 'react-icons/fa';
import './Login.scss';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';
import { USER_CART_ACTION } from '../../context/userAndCart/UserCartReducer';
import ErrorMessage from '../../components/utiles/ErrorMessage';
import { toast } from 'react-toastify';
import ProductCheckoutSteps from '../../components/utiles/CheckoutSteps';

const Login = () => {
  const navigate = useNavigate();
  // Global variables
  const { user, dispatch } = useContext(UserCartContext);
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Function that display and hide the fonfirm password
  const displayConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // Validation of the login form
  const [emailChange, setEmailChange] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);

  // useRef hook to focus on specific issues
  const emailRef = useRef();
  //const passwordRef = useRef();

  // Function handling Email Validation
  const checkEmailFormat = () => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    if (emailRegex) {
      emailRef.current.className = 'errorInvisible';
      //emailRef.current.style.display = "none"
    } else {
      emailRef.current.className = 'errorVisible';
      //passwordRef.current.style.display = "block"
    }
  };

  // Function handling Password validation
  // const checkPasswordFormat = () => {
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  //   if (passwordRegex) {
  //     passwordRef.current.className = "errorInvisible";
  //     //passwordRef.current.style.display = "none"
  //   } else {
  //     passwordRef.current.className = "errorVisible";
  //     //passwordRef.current.style.display = "block"
  //   }
  // };

  // Function to update login user data
  const updateUserLoginData = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        setEmailChange(true);
        break;
      case 'password':
        setPassword(event.target.value);
        setPasswordChange(true);
        break;
      case 'showPassword':
        setShowPassword(false);
        break;
      default:
        break;
    }
  };

  // Reset all state variables for the login form
  const resetVariables = () => {
    setEmail('');
    setEmailChange(false);
    setPassword('');
    setPasswordChange(false);
  };

  // Login and Submit Function
  const submitUserLogin = async (event) => {
    event.preventDefault();

    // The body
    const loginUser = {
      email: email,
      password: password,
    };

    try {
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + '/api/users/login',
        loginUser
      );
      dispatch({ type: USER_CART_ACTION.USER_SIGNIN , payload: data });
      //& 1. Save user in the local storage
      localStorage.setItem('user', JSON.stringify(data));
      resetVariables();
      //! How to do dynamic navigation will be done soon
      navigate("/")
    } catch (err) {
      //? toast-step-3: display the err using the GetError function from the component
      toast.error(ErrorMessage(err));
    }
  };

  return (
    <main className="lagin-page">
      <Helmet>
        <title> Sign In </title>
      </Helmet>

      <ProductCheckoutSteps step1 > </ProductCheckoutSteps>
      <h1 className="login-title"> Welcome To Log In </h1>
      <div className="login-container">
        <figure className="login-icon-container">
          <FaUserAlt className="login-icon" />
        </figure>
        <fieldset className="login-fieldset">
          <legend className="login-legend">User Login </legend>
          <form onSubmit={submitUserLogin} className="login-form">
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={updateUserLoginData}
                onBlur={checkEmailFormat}
                placeholder="Enter Email"
              />
              <div
                className={
                  emailChange && email.trim().length === 0
                    ? 'errorVisible'
                    : 'errorInvisible'
                }
                ref={emailRef}
              >
                Email is required
              </div>
              <div className="errorInvisible" ref={emailRef}>
                Incorrect email format!
              </div>
            </div>
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={updateUserLoginData}
                //onBlur={checkPasswordFormat}
                placeholder="Enter Password"
              />
              <span onClick={displayPassword} className="password-display">
                {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
              </span>
              {/** 
            <div className={passwordChange && password.trim().length === 0 ? "errorVisible" : "errorInvisible"} ref={passwordRef} >
              Password is required
            </div>
           
            <div className="errorInvisible" ref={passwordRef}>
              Password must be at least 12 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.
            </div>

            */}
            </div>
            <div className="login-checkbox-forget-password">
              <div className="login-checkbox-keep-signed-in">
                <input
                  type="checkbox"
                  name="login"
                  className="login-checkbox"
                />
                <span>Keep me signed in</span>
              </div>
              <div className="forget-password">
                <a href=""> Forget your password? </a>
              </div>
            </div>
            <button className="login-button"> Log In</button>
            <p className="haveNoAccount">
              Don't have an account? <NavLink to="/register">Sign Up</NavLink>
            </p>
          </form>
        </fieldset>
      </div>
    </main>
  );
};

export default Login;
