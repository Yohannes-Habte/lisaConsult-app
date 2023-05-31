import React, { useState, useContext, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FaMapMarker, FaPhoneAlt, FaTimes, FaUserAlt } from 'react-icons/fa';
import { BsCheck2All } from 'react-icons/bs';
import { MdEmail, MdLocationPin } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import './Register.scss';
import axios from 'axios';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';
import { toast } from 'react-toastify';
import { USER_CART_ACTION } from '../../context/userAndCart/UserCartReducer';
import { Helmet } from 'react-helmet-async';

const Register = () => {
  // to navigate register page
  const navigate = useNavigate();

  // Global state variables
  const { user, dispatch } = useContext(UserCartContext);

  // Local state variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [agree, setAgree] = useState(false);
  const [agreeChanged, setAgreeChanged] = useState(false);
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

  // useRef() Hook for the agreement checkbox
  const agreeError = useRef();

  // State variables that shows the condition of the password requirements
  const [letterCase, setLetterCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);

  // Password strength checker icons
  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  // Function to switch icon
  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    } else {
      return timesIcon;
    }
  };

  useEffect(() => {
    // Check for uppercase and lowercase letters
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setLetterCase(true);
    } else {
      setLetterCase(false);
    }

    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNumber(true);
    } else {
      setNumber(false);
    }

    // Check for special character
    if (password.match(/([§,$,!,%,@,#,^,*,?,_,~])/)) {
      setSpecialCharacter(true);
    } else {
      setSpecialCharacter(false);
    }

    // Check for password length
    if (password.length > 5) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
  }, [password]);

  // Function that is used to update the state variables of the registration form
  const update = (event) => {
    switch (event.target.name) {
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'confirmEmail':
        setConfirmEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;

      case 'phone':
        setPhone(event.target.value);
        break;
      case 'address':
        setAddress(event.target.value);
        break;
      case 'country':
        setCountry(event.target.value);
        break;
      case 'showPassword':
        setShowPassword(false);
        break;
      case 'confirmPassword':
        setConfirmPassword(event.target.value);
        break;
      case 'showConfirmPassword':
        setShowConfirmPassword(false);
        break;
      case 'agree':
        setAgree(!agree);
        setAgreeChanged(true);
        break;
      default:
        break;
    }
  };

  // Function that handles consent of the user
  const checkboxAgree = () => {
    setAgreeChanged((prevAgree) => !prevAgree);
  };

  // useRef for the state variables
  const passwordRef = useRef();

  //Function handling Password validation
  const checkPasswordFormat = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/.test(
        password
      );
    if (passwordRegex) {
      passwordRef.current.className = 'errorInvisible';
      //passwordRef.current.style.display = "none"
    } else {
      passwordRef.current.className = 'errorVisible';
      //passwordRef.current.style.display = "block"
    }
  };

  // Function to reset all the state variables
  const resetAllEnteredData = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setConfirmEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhone('');
    setAddress('');
    setCountry('');
    setAgree(false);
    setAgreeChanged(false);
  };

  // Function to register the user
  const SubmitRegisteredUser = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords did not match');
    } else {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        confirmEmail: confirmEmail,
        password: password,
        confirmPassword: confirmPassword,
        phone: phone,
        address: address,
        country: country,
      };

      try {
        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + '/api/users/register',
          userData
        );

        dispatch({ type: USER_CART_ACTION.USER_SIGNIN, payload: data });
        localStorage.setItem('user', JSON.stringify(data));
        resetAllEnteredData();
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <main className="register-page">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <div className="register-form-container">
        <fieldset className="register-field">
          <legend className="register-legend"> Register </legend>
          <form
            action=""
            onSubmit={SubmitRegisteredUser}
            className="register-form"
          >
            <div className="register-input-fields-container">
              <div className="input-container">
                <FaUserAlt className="icon" />
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={update}
                  placeholder="First Name"
                  className="input-field"
                />

                <label htmlFor="" className="input-label">
                  First Name
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <FaUserAlt className="icon" />
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={update}
                  placeholder="Last Name"
                  className="input-field"
                />

                <label htmlFor="" className="input-label">
                  Last Name
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <MdEmail className="icon" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={update}
                  placeholder="Email"
                  className="input-field"
                />
                <label htmlFor="" className="input-label">
                  Email Address
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <RiLockPasswordFill className="icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={update}
                  placeholder="Password"
                  className="input-field"
                />
                <label htmlFor="" className="input-label">
                  Password
                </label>
                <span className="input-highlight"></span>
                <span onClick={displayPassword} className="password-display">
                  {showPassword ? (
                    <AiFillEyeInvisible className="icon" />
                  ) : (
                    <AiFillEye className="icon" />
                  )}
                </span>
              </div>

              <div className="input-container">
                <RiLockPasswordFill className="icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={update}
                  placeholder="Confirm Password"
                  className="input-field"
                />
                <label htmlFor="" className="input-label">
                  Password
                </label>
                <span className="input-highlight"></span>
                <span
                  onClick={displayConfirmPassword}
                  className="confirm-password-display"
                >
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>

              <div className="input-container">
                <FaPhoneAlt className="icon" />
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={update}
                  placeholder="Phone Number"
                  className="input-field"
                />
                <label htmlFor="" className="input-label">
                  Phone Number
                </label>
                <span className="input-highlight"></span>
              </div>
              <div className="input-container">
                <MdLocationPin className="icon" />
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={update}
                  placeholder="Street Zip-code, City"
                  className="input-field"
                />
                <label htmlFor="" className="input-label">
                  Physical Address
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <FaMapMarker className="icon" />
                <input
                  type="text"
                  name="country"
                  value={country}
                  onChange={update}
                  placeholder="Country"
                  className="input-field"
                />
                <label htmlFor="" className="input-label">
                  Country
                </label>
                <span className="input-highlight"></span>
              </div>
            </div>

            <div className="cosent-and-others-container">
              <div className="consent-terms-button-login-container">
                <div className="register-consent">
                  <input
                    type="checkbox"
                    name="agree"
                    onChange={update}
                    className="register-consent-input"
                  />
                  <span>I accept</span>
                  <NavLink> Terms of Use</NavLink>
                </div>
                <button className="register-button"> Register </button>
                <p className="haveAccount">
                  Already have an account?
                  <NavLink to="/login"> Log In </NavLink>
                </p>
              </div>

              <div className="password-preconditions">
                <aside className="password-checkbox">
                  <h3>Checking Password Confirmation</h3>
                  <p className="text">
                    {switchIcon(letterCase)} &nbsp; Lowercase & UpperCase
                  </p>

                  <p className="text">
                    {switchIcon(number)} &nbsp; Number (0-9)
                  </p>

                  <p className="text">
                    {switchIcon(specialCharacter)} &nbsp; Spceial Character
                    (!%@#^*?_~)
                  </p>

                  <p className="text">
                    {switchIcon(passwordLength)} &nbsp; Minimum 6 Characters
                  </p>
                </aside>
              </div>
            </div>
          </form>
        </fieldset>
      </div>
    </main>
  );
};

export default Register;
