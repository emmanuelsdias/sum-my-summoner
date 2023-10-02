import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    const region = document.getElementById("select-region").value;
    const url = `/summoner/${region}/${query}`;
    navigate(url);
  };

  return (
    <div id='search-bar-container'>
      <div id='search-bar'>
        <div id='search-region'>
          <span className='descriptor'>Region</span>
          <select id='select-region'>
            <option value="br" selected>Brazil</option>
            <option value="na">North America</option>
          </select>
        </div>
        <div id='search-username'>
          <span className='descriptor'>Username</span>
          <input
            type="text"
            placeholder="Search username..."
            value={query}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSearch}>GO</button>
      </div>
    </div>
  );
}

export default SearchBar;