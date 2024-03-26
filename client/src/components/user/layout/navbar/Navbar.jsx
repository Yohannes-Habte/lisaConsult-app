import React, { useState } from 'react';
import './Navbar.scss';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Local state variable
  const [open, setOpen] = useState(false);

  // Handle click
  const handleClick = () => {
    setOpen(!open);
  };

  // Styling NavLink
  const navbarNavLink = ({ isActive }) =>
    isActive ? 'active-navbar-item' : 'passive-navbar-item';

  return (
    <nav className="navbar-wrapper">
      {/* Church logo */}
      <h1 className="logo">
        <NavLink to={'/'} className={'logo-link'}>
          LisaConsult
        </NavLink>
      </h1>

      {/* Navigation bar */}
      <ul className="navbar-items">
        <li className="navbar-item">
          <NavLink to={'/'} className={navbarNavLink}>
            Home
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={'/about'} className={navbarNavLink}>
            About
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={'/courses'} className={navbarNavLink}>
            Courses
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={'/products'} className={navbarNavLink}>
            Products
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={'/research'} className={navbarNavLink}>
            Research
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={'/faqs'} className={navbarNavLink}>
            FAQs
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={'/contact'} className={navbarNavLink}>
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Register and login */}
      <ul className="register-login-wrapper">
        <li className="navbar-item">
          <NavLink to={'/register'} className={navbarNavLink}>
            Register
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={'/login'} className={navbarNavLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
