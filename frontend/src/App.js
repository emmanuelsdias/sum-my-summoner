import React, { useState } from "react";

import Title from "./components/Title";
import SearchBar from "./components/SearchBar";
import SummonerResult from "./components/SummonerResult";

function App() {
  const [summonerResult, setSummonerResults] = useState([]);
  
  const handleSearch = (query) => {
    const dummy = []
    setSummonerResults(dummy);
  };

  return (
    <div id='main-page'>
      <Title />
      <SearchBar onSearch={handleSearch} />
      <SummonerResult results={summonerResult} />
    </div>
  );
}

export default App;
