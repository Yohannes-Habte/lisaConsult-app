import React, { useEffect, useState } from 'react';
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

const Footer = () => {
  // Local state variables
  const [data, setData] = useState({});

  // Display service procedures in the frontend fetched from backend
  useEffect(() => {
    const fetchProcedureData = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/pages/footer`
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProcedureData();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-sections-container">
        <section className="footer-sitemap">
          <h2> {data.sitemap} </h2>
          <ul>
            <li> <NavLink to="/"> {data.home} </NavLink> </li>
            <li> <NavLink to="/procedures"> {data.procedure} </NavLink> </li>
            <li> <NavLink to="/products"> {data.product} </NavLink> </li>
            <li> <NavLink to="/courses"> {data.course} </NavLink> </li>
            <li> <NavLink to="/research"> {data.researche} </NavLink> </li>
          </ul>
        </section>

        <section className="footer-company">
          <h2> {data.company} </h2>
          <ul>
            <li> <NavLink to="/story"> {data.story} </NavLink> </li>
            <li> <NavLink to="/team"> {data.team} </NavLink> </li>
            <li> <NavLink to="/projects"> {data.project} </NavLink> </li>
            <li> <NavLink to="/awards"> {data.award} </NavLink> </li>
            <li> <NavLink to="/clients"> {data.client} </NavLink> </li>
          </ul>
        </section>

        <section className="footer-social">
          <h2> {data.social} </h2>
          <ul>
            <li> <a href="https://www.linkedin.com/in/yohannes-habtemariam/" target="_blank"> <FaLinkedin className="footer-icon"/> {data.linkedIn} </a> </li>
            <li> <a href="https://www.facebook.com/profile.php?id=100009710022882" target="_blank"> <FaFacebookSquare className="footer-icon"/> Facebook </a> </li>
            <li> <a href="https://www.youtube.com/" target="_blank"> <FaYoutube className="footer-icon"/> {data.youtube} </a> </li>
            <li> <a href="https://github.com/Yohannes-Habtemariam" target="_blank"> <FaGithubSquare className="footer-icon"/> {data.github} </a> </li>
            <li> <a href="https://twitter.com/" target="_blank"> <FaTwitterSquare className="footer-icon"/> Twitter </a> </li>
          </ul>
        </section>

        <section className="footer-contact">
          <h2> Contact </h2>
          <ul>
            <li> <a href="mailto:uelandrae@gmail.com"> <MdOutlineMail className="footer-icon"/> {data.email} </a> </li>
            <li> <a href="tel:123-456-7890"> <MdPhoneInTalk className="footer-icon"/> {data.phone} </a> </li>
            <li> <a href="tel:6031112298"> <MdLocationOn className="footer-icon"/> {data.location} </a> </li>
            <li> <NavLink to="/contact"> <MdOutlineMessage className="footer-icon" /> {data.comment} </NavLink> </li>
          </ul>
        </section>
      </div>

      <hr />
      <div className="footer-copyright">
        <p className="compyright"> &copy; {data.copyright} </p>
        <figure className="footer-logo">
          <NavLink to="/" > <img src={data.logo} alt="Logo of LisaConsult" /> </NavLink>
        </figure>
      </div>
    </footer>
  );
};


export default Footer;
