import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import "./style.css";
import Title from "../../components/Title/Title.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";

function SearchPage() {
  const isLogged = useSelector((state) => state.isLogged);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

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
