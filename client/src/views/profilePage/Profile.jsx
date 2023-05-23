import React, { useContext, useReducer, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './Profile.scss';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import { USER_CART_ACTION } from '../../context/userAndCart/UserCartReducer';
import ErrorMessage from '../../components/utiles/ErrorMessage';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

// Update Object
const UPDATE_LOADING = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};

// Initial state
const initialState = {
  loadingUpdate: false,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_LOADING.FETCH_REQUEST:
      return { ...state, loadingUpdate: true };
    case UPDATE_LOADING.FETCH_SUCCESS:
      return { ...state, loadingUpdate: false };
    case UPDATE_LOADING.FETCH_FAIL:
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

const Profile = () => {
  // Global state variables
  const { user, dispatch: contextDispatch } = useContext(UserCartContext);
  // Local state variables
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, initialState);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(false);

  // Validation
  const [firstNameValidation, setFirstNameValidation] = useState(false);
  const [lastNameValidation, setLastNameValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [confirmEmailValidation, setConfirmEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [confirmPasswordValidation, setConfirmPasswordValidation] =
    useState(false);

  // userRef
  const emailRef = useRef();
  const passwordRef = useRef();

  // Function to check if the email is valid
  const checkEmailFormat = () => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    if (emailRegex) {
      emailRef.current.className = 'errorInvisible';
    } else {
      emailRef.current.className = 'errorVisible';
    }
  };

  // Function to check if the password is valid
  const checkPasswordFormat = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      );
    if (passwordRegex) {
      passwordRef.current.className = 'errorInvisible';
      //passwordRef.current.style.display = 'none';
    } else {
      passwordRef.current.className = 'errorVisible';
      //passwordRef.current.style.display = 'block';
    }
  };

  // handle change function
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'firstName':
        setFirstName(e.target.value);
        setFirstNameValidation(true);
        break;
      case 'lastName':
        setlastName(e.target.value);
        setLastNameValidation(true);
        break;
      case 'email':
        setEmail(e.target.value);
        setEmailValidation(true);
        break;
      case 'confirmEmail':
        setConfirmEmail(e.target.value);
        setConfirmEmailValidation(true);
        break;
      case 'password':
        setPassword(e.target.value);
        setPasswordValidation(true);
        break;
      case 'confirmPassword':
        setConfirmPassword(e.target.value);
        setConfirmPasswordValidation(true);
        break;
      default:
        break;
    }
  };

  // Function to show/hide password
  const displayPassword = () => {
    setPasswordStatus((prevState) => !prevState);
  };

  // Function to show or hide confirm password
  const displayConfirmPassword = () => {
    setConfirmPasswordStatus((prevState) => !prevState);
  };

  // Function to reste the state variables
  const reset = () => {
    setFirstName('');
    setFirstNameValidation(false);
    setlastName('');
    setLastNameValidation(false);
    setEmail('');
    setEmailValidation(false);
    setConfirmEmail('');
    setConfirmEmailValidation(false);
    setPassword('');
    setPasswordValidation(false);
    setConfirmPassword('');
    setConfirmPasswordValidation(false);
  };

  // submit handler function
  const submitUpdatedProfile = async (e) => {
    e.preventDefault();

    // Check email confirmation
    if (email !== confirmEmail) {
      toast.error('Emails do not match!');
      return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const updateUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      const settings = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        process.env.REACT_APP_SERVER_URL + `/api/users/profile/update`,
        updateUser,
        settings
      );
      dispatch({ type: UPDATE_LOADING.FETCH_SUCCESS });
      contextDispatch({ type: USER_CART_ACTION.USER_SIGNIN, payload: data });
      toast.success('User registration details successfully updated.');
      // Reset
      reset();
    } catch (err) {
      toast.error(ErrorMessage(err));
    }
  };

  return (
    <main className="profile-page">
      <Helmet>
        <title>User Profile</title>
      </Helmet>

      <section className="profile-container">
        <h1 className="profile-title"> User Profile </h1>

        <p className="profile-paragraph">
          Dear user, you can update your profile as you wish.
        </p>

        <form
          onSubmit={submitUpdatedProfile}
          action=""
          className="profile-form"
        >
          <div className="input-label">
            <label htmlFor="firstName">First Name </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={handleChange}
              placeholder="First Name"
            />

            <div
              className={
                firstNameValidation && firstName.trim().length === 0
                  ? 'errorVisible'
                  : 'errorInvisible'
              }
            >
              Enter First name!
            </div>
          </div>

          <div className="input-label">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              id="lastName"
              placeholder="Last Name"
            />

            <div
              className={
                lastNameValidation && lastName.trim().length === 0
                  ? 'errorVisible'
                  : 'errorInvisible'
              }
            >
              Enter First name!
            </div>
          </div>

          <div className="input-label">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              onBlur={checkEmailFormat}
              placeholder="Email Address"
            />

            <div
              className={
                emailValidation && email.trim().length === 0
                  ? 'errorVisible'
                  : 'errorInvisible'
              }
            >
              Enter Eamil!
            </div>
            <div className="errorInvisible" ref={emailRef}>
              Incorrect email format!
            </div>
          </div>

          <div className="input-label">
            <label htmlFor="confirmEmail">Confirm Email</label>
            <input
              type="email"
              name="confirmEmail"
              id="confirmEmail"
              value={confirmEmail}
              onChange={handleChange}
              placeholder=" Confirm Email"
            />

            <div
              className={
                confirmEmailValidation && confirmEmail.trim().length === 0
                  ? 'errorVisible'
                  : 'errorInvisible'
              }
            >
              Enter Confirm Eamil!
            </div>
          </div>

          <div className="input-label">
            <label htmlFor="password">Password</label>
            <input
              type={passwordStatus ? 'text' : 'password'}
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              onBlur={checkPasswordFormat}
              placeholder="Password"
            />

            <span onClick={displayPassword} className="password-status">
              {passwordStatus ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>

            <div
              className={
                passwordValidation && password.trim().length === 0
                  ? 'errorVisible'
                  : 'errorInvisible'
              }
            >
              Enter Password!
            </div>
            <div className="errorInvisible" ref={passwordRef}>
              Incorrect password requirements!
            </div>
          </div>

          <div className="input-label">
            <label htmlFor="confirmPassword"> Confirm Password</label>
            <input
              type={confirmPasswordStatus ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="confirm Password"
            />

            <span onClick={displayConfirmPassword} className="password-status">
              {confirmPasswordStatus ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>

            <div
              className={
                confirmPasswordValidation && confirmPassword.trim().length === 0
                  ? 'errorVisible'
                  : 'errorInvisible'
              }
            >
              Enter Confirm Password!
            </div>
          </div>
          <div>
            <button className="profile-btn"> Update Profile </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Profile;
