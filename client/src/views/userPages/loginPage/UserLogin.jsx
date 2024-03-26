import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { HiOutlineEye } from 'react-icons/hi';
import { FaUserAlt } from 'react-icons/fa';
import './UserLogin.scss';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { UserCartContext } from '../../../context/userAndCart/UserCartProvider';
import { USER_CART_ACTION } from '../../../context/userAndCart/UserCartReducer';
import { toast } from 'react-toastify';
import ReactIcons from '../../../components/reactIcons/ReactIcons';

const UserLogin = () => {
  const navigate = useNavigate();
  // Global variables
  const { user, dispatch } = useContext(UserCartContext);
  const { emailIcon, passwordIcon } = ReactIcons();
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
      dispatch({ type: USER_CART_ACTION.USER_SIGNIN, payload: data.details });
      //& 1. Save user in the local storage
      localStorage.setItem('user', JSON.stringify(data));
      resetVariables();
      navigate('/');
    } catch (err) {
      //? toast-step-3: display the err using the GetError function from the component
      toast.error(err);
    }
  };

  return (
    <main className="lagin-page">
      <Helmet>
        <title> Sign In </title>
      </Helmet>

      <h1 className="login-title"> Welcome To Your Account </h1>
      <div className="login-container">
        <figure className="login-icon-container">
          <FaUserAlt className="login-icon" />
        </figure>
        <fieldset className="login-fieldset">
          <legend className="login-legend">User Login </legend>
          <form onSubmit={submitUserLogin} className="login-form">
            <div className="input-container">
              <span className="icon"> {emailIcon} </span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={updateUserLoginData}
                placeholder="Enter Email"
                className="input-field"
              />
              <label htmlFor="" className="input-label">
                Email Address
              </label>
              <span className="input-highlight"></span>
            </div>
            <div className="input-container">
              <span className="icon"> {passwordIcon} </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={updateUserLoginData}
                //onBlur={checkPasswordFormat}
                placeholder="Enter Password"
                className="input-field"
              />
              <label htmlFor="" className="input-label">
                Password
              </label>
              <span className="input-highlight"></span>
              <span onClick={displayPassword} className="password-display">
                {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
              </span>
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

export default UserLogin;
