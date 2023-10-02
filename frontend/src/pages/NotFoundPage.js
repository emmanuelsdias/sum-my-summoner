import React from 'react';

import Title from "../components/Title.js";

function SearchPage() {
  return (
    <div id='not-found-page'>
      <Title title={'404!'} subtitle={'We couldn\'t find the page you were looking for.'} />
      <p></p>
    </div>
  );
}

export default SearchPage;
