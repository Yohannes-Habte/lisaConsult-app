import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { MdKeyboardVoice } from 'react-icons/md';
import './SearchBar.scss';
import { useState } from 'react';
import data from '../../data/Data.json';

const SearchBar = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [inputText, setInputText] = useState('');

  // Handle filtering data
  const handleFilter = (event) => {
    // What you type in the input field to search what you want to find
    const searchedItem = event.target.value;
    setInputText(searchedItem);
    // Filtered result that you get once you type in the input field
    const searchItemResult = data.filter((value) => {
      return value.title.toLowerCase().includes(searchedItem.toLowerCase());
    });

    if (searchedItem.length === '') {
      setFilteredData([]);
    } else {
      setFilteredData(searchItemResult);
    }
  };

  // Clear input
  const clearInput = () => {
    setFilteredData([]);
    setInputText('');
  };

  return (
    <div className="searchbar">
      <div className="searchbar-wrapper">
        <div className="searchbar-left">
          <div className="search-icon-wrapper">
            <span className="search-icon searchbar-icon">
              <AiOutlineSearch className="icon" />
            </span>
          </div>
        </div>

        <div className="searchbar-center">

          <input
            type="text"
            autoCapitalize="off"
            value={inputText}
            onChange={handleFilter}
            placeholder="Type here..."
            className="searchbar-input"
          />
        </div>

        <div className="searchbar-right">
          { inputText === '' ? (
            <svg
              className="voice-search"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285f4"
                d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
              ></path>
              <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
              <path
                fill="#fbbc05"
                d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
              ></path>
              <path
                fill="#ea4335"
                d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
              ></path>
            </svg>
          ) : (
            <AiOutlineClose className="close-icone" onClick={clearInput} />
          )}
        </div>
      </div>
    </div>

    /** 
    <div className="search">
      <div className="searchInput">
        <input
          type="text"
          name="search"
          value={inputText}
          onChange={handleFilter}
          placeholder="Type Here"
          className="input-field"
        />

        <div className="searchIcon-container">
          {filteredData.length === 0 && inputText === "" ? (
            <AiOutlineSearch className="searchIcon" />
          ) : (
            <AiOutlineClose className="searchIcon" onClick={clearInput} />
          )}
        </div>
      </div>

      {filteredData.length !== 0 && (
        <dir className="data-result">
          {filteredData.slice(0, 10).map((value, index) => {
            return (
              <NavLink to={value.link}>
                <p key={index} className="searchTitle">
                  {value.title}
                </p>
              </NavLink>
            );
          })}
        </dir>
      )}
    </div>*/
  );
};

export default SearchBar;
