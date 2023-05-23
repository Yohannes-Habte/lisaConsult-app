import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import lisaConsultLog from '../../assets/lisaConsult-logo.png';
import successfulInvestor from '../../assets/investing.png';
import SearchBar from '../searchBar/SearchBar';
import { useContext } from 'react';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';
import { USER_CART_ACTION } from '../../context/userAndCart/UserCartReducer';
import { FaUserCircle } from 'react-icons/fa';
import Dropdown from '../dropdown/Dropdown';

const Navbar = () => {
  // Global state variables
  const { user, cart, dispatch } = useContext(UserCartContext);
  // Local state Variables
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickChange = () => setClicked(!clicked);

  // User sign out Function
  const logoutUser = () => {
    dispatch({ type: USER_CART_ACTION.USER_LOG_OUT });
    //& User-step-3: Remove user info from the browser local storage
    localStorage.removeItem('user');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <header className="header-container">
      <nav className="header-navbar">
        <div className="language-register-login-container">
          <h4 className="header-discount-text">
            Register Today and Save at Least 20% Discount
          </h4>

          <div className="register-login-cart">
            {/* Shopping Cart */}
            <div className="cart-item">
              <NavLink to="/cart">
                Cart
                {cart.cartItems.length > 0 && (
                  <div className="cart-badge">
                    {/* //& Step 3 adding item to cart:. Increasing the quantity of a particular item in the badge */}
                    {cart.cartItems.reduce(
                      (acc, curr) => acc + curr.quantity,
                      0
                    )}
                  </div>
                )}
              </NavLink>
            </div>

            {/* //~ Show logged in user in the navbar and hide login and regiter when the user logged in */}
            {user ? (
              <div className="user-dropdown">
                <span className="user-name"> {user.firstName} </span>
                <FaUserCircle onClick={() => setOpen(!open)} className="icon" />
                <Dropdown logoutUser={logoutUser} open={open} setOpen={setOpen} />
              </div>
            ) : (
              <span className="register-login">
                <NavLink to="/register"> Register </NavLink>
                <NavLink to="/login"> Login </NavLink>
              </span>
            )}
          </div>
        </div>

        <div className="logo-search">
          <figure className="logo-container">
            <NavLink to="/">
              <img
                className="mission-logo"
                src={lisaConsultLog}
                alt="LisaConsult Logo"
              />
            </NavLink>
          </figure>

          <div className="search-btn">
            <SearchBar />
          </div>

          <figure className="whereToInvestImage">
            <NavLink to="/">
              <img
                className="successful-investor"
                src={successfulInvestor}
                alt="Logo"
              />
            </NavLink>
          </figure>
        </div>

        <div className="text-logo-header-nav-menu">
          <h3>
            <NavLink to="/">LisaConsult</NavLink>
          </h3>
          <ul
            className={clicked ? 'header-nav-menu active' : 'header-nav-menu'}
          >
            <li onClick={handleClickChange} className="header-nav-item">
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  textDecoration: isActive && 'underline',
                  color: isActive && 'red',
                })}
              >
                Home
              </NavLink>
            </li>

            <li onClick={handleClickChange} className="header-nav-item">
              <NavLink
                to="/procedures"
                style={({ isActive }) => ({
                  textDecoration: isActive && 'underline',
                  color: isActive && 'red',
                })}
              >
                Procedures
              </NavLink>
            </li>

            <li onClick={handleClickChange} className="header-nav-item">
              <NavLink
                to="/courses"
                style={({ isActive }) => ({
                  textDecoration: isActive && 'underline',
                  color: isActive && 'red',
                })}
              >
                Courses
              </NavLink>
            </li>

            <li onClick={handleClickChange} className="header-nav-item">
              <NavLink
                to="/products"
                style={({ isActive }) => ({
                  textDecoration: isActive && 'underline',
                  color: isActive && 'red',
                })}
              >
                Products
              </NavLink>
            </li>

            <li onClick={handleClickChange} className="header-nav-item">
              <NavLink
                to="/research"
                style={({ isActive }) => ({
                  textDecoration: isActive && 'underline',
                  color: isActive && 'red',
                })}
              >
                Research
              </NavLink>
            </li>

            <li onClick={handleClickChange} className="header-nav-item">
              <NavLink
                to="/contact"
                style={({ isActive }) => ({
                  textDecoration: isActive && 'underline',
                  color: isActive && 'red',
                })}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="menu-icon" onClick={handleClickChange}>
          <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
