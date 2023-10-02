import React from 'react';

import Title from "../components/Title.js";
import SearchBar from "../components/SearchBar.js";

function SearchPage() {
  return (
    <div id='search-page'>
      <Title
        title={'SUM MY SUMMONER'} 
        subtitle={'Check a summoner stats below!'} 
      />
      <SearchBar />
    </div>
  );
}

export default SearchPage;
