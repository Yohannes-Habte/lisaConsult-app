import React from 'react';
import { MdLocationPin, MdEmail, MdOutlineSupport } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';

import { NavLink } from 'react-router-dom';

//====================================================================
// About Page Data
//====================================================================

export const AboutData = [
  {
    heading: 'Steps to Access Services in LisaConsult',
    step1: (
      <p>
        <span>Step 1</span>: Create a user account by clicking on the
        <NavLink to="/register"> Register </NavLink> button at the top right of
        the page.
      </p>
    ),
    step2: (
      <p>
        <span>Step 2</span>: After you create a user account, go to the service
        page, click on the{' '}
        <NavLink to="/courseRegistration"> Registration Form</NavLink> button
        and fill in the form. Make sure that you fill it out correctly.
      </p>
    ),
    step3: (
      <p>
        <span>Step 3</span>: Thereafter, go to the payment page and confirm the
        payment for the course you have chosen.
      </p>
    ),
    step4: (
      <p>
        <span>Step 4</span>: Eventually, a confirmation message with the
        relevant information will be sent to your e-mail address.
      </p>
    ),
  },
  {
    heading: 'How to Buy Products from LisaConsult',
    step1: (
      <p>
        <span>Step 1</span>: Create a user account by clicking on the{' '}
        <NavLink to="/register"> Register </NavLink> button at the top right of
        the page.{' '}
      </p>
    ),
    step2: (
      <p>
        <span>Step 2</span>: After you create an account, you need to{' '}
        <NavLink to="/login"> Login </NavLink> and then you will see that the
        shopping cart is available for you. You can select the products you want
        to buy on the "product page". On the shopping cart page you can confirm
        your selection. You can make changes if you wish.
      </p>
    ),
    step3: (
      <p>
        <span>Step 3</span>: Thereafter, go to the payment page and confirm the
        payment for the items you have chosen.
      </p>
    ),
    step4: (
      <p>
        <span>Step 4</span>: Eventually, a confirmation message with the
        relevant information will be sent to your e-mail address.
      </p>
    ),
  },
];

//====================================================================
// Contact Page Data
//====================================================================

export const ContactData = [
  {
    image: <MdLocationPin className="contact-icon" />,
    heading: 'Our Manin Office',
    link: <a href="#">straße 31, 4657 Hamburg, Germany</a>,
  },
  {
    image: <FiPhoneCall className="contact-icon" />,
    heading: 'Phone Number',
    link: <a href="tel:+4917581005650"> +491768686868</a>,
  },
  {
    image: <MdEmail className="contact-icon" />,
    heading: 'Email Address',
    link: <a href="mailto:uelandrae@gmail.com"> Email </a>,
  },
  {
    image: <MdOutlineSupport className="contact-icon" />,
    heading: '24/7 Support',
    link: <a href="tel:+4917581005650"> Call us now </a>,
  },
];
