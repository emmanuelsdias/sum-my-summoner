import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createData } from '../api/createData.js'; 

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    const region = document.getElementById('select-region').value;
    const url = `/summoner/${region}/${query}`;
    try {
      const response = await createData(region, query);
      if (response) {
        console.log('Summoner found!')
        navigate(url);
      } else {
        console.error('No summoner found with that username.');
        navigate(url);
      }
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    await handleSearch(); // Call handleSearch asynchronously
  };

  return (
    <div id='search-bar-container'>
      <form id='search-bar' onSubmit={handleSubmit}>
        <div id='search-region'>
          <span className='descriptor'>Region</span>
          <select id='select-region' defaultValue='br'>
            <option value='br'>Brazil</option>
            <option value='na'>North America</option>
          </select>
        </div>
        <div id='search-username'>
          <span className='descriptor'>Username</span>
          <input
            type='text'
            placeholder='Search username...'
            value={query}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit'>GO</button>
      </form>
    </div>
  );
}

export default SearchBar;
