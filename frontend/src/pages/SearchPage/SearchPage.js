import React from "react";

import "./style.css";
import Title from "../../components/Title/Title.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";

function SearchPage() {
  return (
    <div id="search-page" className="page">
      <Title
        title={"SUM MY SUMMONER"}
        subtitle={"Check a summoner stats below!"}
      />
      <SearchBar />
    </div>
  );
}

export default SearchPage;
