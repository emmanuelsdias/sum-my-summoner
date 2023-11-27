import React from "react";

import "./style.css";
import Title from "../../components/Title/Title.js";

function SearchPage() {
  return (
    <div id="not-found-page" className="page">
      <Title
        title={"404!"}
        subtitle={"We couldn't find the page you were looking for."}
      />
      <p></p>
    </div>
  );
}

export default SearchPage;
