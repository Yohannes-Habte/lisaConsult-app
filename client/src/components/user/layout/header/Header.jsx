import React, { useEffect, useState } from 'react';
import './Header.scss';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import SearchBar from '../../../searchBar/SearchBar';
import Navbar from '../navbar/Navbar';
import { API } from '../../../utiles/securitiy/secreteKey';

const Header = () => {
  // Local state variables
  const [data, setData] = useState({});

  // Display service procedures in the frontend fetched from backend
  useEffect(() => {
    const fetchProcedureData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/api/pages/footer`
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProcedureData();
  }, []);

  console.log('Footer', data);
  return (
    <header className="header">
      <Navbar />

      <div className="images-search-wrapper">
        <figure className="image-container">
          <NavLink to="/">
            <img className="logo-image" src={data.logo} alt="LisaConsult Logo" />
          </NavLink>
        </figure>

        <SearchBar />

        <figure className="image-container">
          <NavLink to="/">
            <img className="image" src={data.investment} alt="Logo" />
          </NavLink>
        </figure>
      </div>
    </header>
  );
};

export default Header;
