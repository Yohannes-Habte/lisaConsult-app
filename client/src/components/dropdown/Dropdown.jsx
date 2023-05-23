import React from 'react';
import { NavLink } from 'react-router-dom';
import { GrFormClose } from "react-icons/gr"
import './Dropdown.scss';

const Dropdown = ({logoutUser, open, setOpen}) => {
  return (
    <ul onClick={() => setOpen(false)} className={open? "display" : "hide"}>
      <GrFormClose className='close-icon' />
      <li className="item">
        <NavLink to={'/profile'} className={'link'}>
          User Profile
        </NavLink>
      </li>
      <li className="item">
        <NavLink to={'/orderHistory'} className={'link'}>
          Order History
        </NavLink>
      </li>

      <li className="item">
        <NavLink to={'/contribution'} className={'link'}>
          Contribution
        </NavLink>
      </li>

      <li className="item">
        <NavLink to={'/login'} onClick={logoutUser} className={'link'}>
          Log Out
        </NavLink>
      </li>
    </ul>
  );
};

export default Dropdown;
