import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div id='search-bar-container'>
      <div id='search-bar'>
        <div id='search-region'>
          <span className='descriptor'>Region</span>
          <select>
            <option value="BR" selected>Brazil</option>
            <option value="NA">North America</option>
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