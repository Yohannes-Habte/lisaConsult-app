import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';
import {
  FaGithubSquare,
  FaLinkedin,
  FaYoutube,
  FaFacebookSquare,
  FaTwitterSquare,
} from 'react-icons/fa';
import {
  MdOutlineMail,
  MdPhoneInTalk,
  MdOutlineMessage,
  MdLocationOn,
} from 'react-icons/md';
import axios from 'axios';
import { PagesContext } from '../../../../context/pagesData/PagesProvider';
import { FOOTER_ACTION } from '../../../../context/pagesData/Reducer';
import ErrorMessage from '../../../utiles/ErrorMessage';
import Loading from '../../../utiles/Loading';
import MessageBox from '../../../utiles/MessageBox';

const Footer = () => {
  // Global state variables
  const { loading, error, footer, dispatch } = useContext(PagesContext);

  // Display service procedures in the frontend fetched from backend
  useEffect(() => {
    const fetchProcedureData = async () => {
      dispatch({ type: FOOTER_ACTION.FETCH_FOOTER_REQUEST });
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/pages/footer`
        );
        dispatch({ type: FOOTER_ACTION.FETCH_FOOTER_SUCCESS, payload: data });
      } catch (err) {
        dispatch({
          type: FOOTER_ACTION.FETCH_FOOTER_FAIL,
          payload: ErrorMessage(err),
        });
      }
    };
    fetchProcedureData();
  }, []);

  return (
    <footer className="footer">
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger"> {error} </MessageBox>
      ) : (
        <div className="footer-sections-container">
          <section className="footer-sitemap">
            <h2> {footer.sitemap} </h2>
            <ul>
              <li>
                <NavLink to="/"> {footer.home} </NavLink>
              </li>
              <li>
                <NavLink to="/procedures"> {footer.procedure} </NavLink>
              </li>
              <li>
                <NavLink to="/products"> {footer.product} </NavLink>
              </li>
              <li>
                <NavLink to="/courses"> {footer.course} </NavLink>
              </li>
              <li>
                <NavLink to="/research"> {footer.researche} </NavLink>
              </li>
            </ul>
          </section>

          <section className="footer-company">
            <h2> {footer.company} </h2>
            <ul>
              <li>
                <NavLink to="/story"> {footer.story} </NavLink>
              </li>
              <li>
                <NavLink to="/team"> {footer.team} </NavLink>
              </li>
              <li>
                <NavLink to="/projects"> {footer.project} </NavLink>
              </li>
              <li>
                <NavLink to="/awards"> {footer.award} </NavLink>
              </li>
              <li>
                <NavLink to="/clients"> {footer.client} </NavLink>
              </li>
            </ul>
          </section>

          <section className="footer-social">
            <h2> {footer.social} </h2>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/yohannes-habtemariam/"
                  target="_blank"
                >
                  <FaLinkedin className="footer-icon" /> {footer.linkedIn}
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100009710022882"
                  target="_blank"
                >
                  <FaFacebookSquare className="footer-icon" /> {footer.facebook}
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/" target="_blank">
                  <FaYoutube className="footer-icon" /> {footer.youtube}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Yohannes-Habtemariam"
                  target="_blank"
                >
                  <FaGithubSquare className="footer-icon" /> {footer.github}
                </a>
              </li>
              <li>
                <a href="https://twitter.com/" target="_blank">
                  <FaTwitterSquare className="footer-icon" /> {footer.twitter}
                </a>
              </li>
            </ul>
          </section>

          <section className="footer-contact">
            <h2> Contact </h2>
            <ul>
              <li>
                <a href="mailto:uelandrae@gmail.com">
                  <MdOutlineMail className="footer-icon" /> {footer.email}
                </a>
              </li>
              <li>
                <a href="tel:123-456-7890">
                  <MdPhoneInTalk className="footer-icon" /> {footer.phone}
                </a>
              </li>
              <li>
                <a href="tel:6031112298">
                  <MdLocationOn className="footer-icon" /> {footer.location}
                </a>
              </li>
              <li>
                <NavLink to="/contact">
                  <MdOutlineMessage className="footer-icon" /> {footer.comment}
                </NavLink>
              </li>
            </ul>
          </section>
        </div>
      )}
      <hr />
      <div className="footer-copyright">
        <p className="compyright"> &copy; {footer.copyright} </p>
        <figure className="footer-logo">
          <NavLink to="/">
            <img src={footer.logo} alt="Logo of LisaConsult" />
          </NavLink>
        </figure>
      </div>
    </footer>
  );
};

export default Footer;
