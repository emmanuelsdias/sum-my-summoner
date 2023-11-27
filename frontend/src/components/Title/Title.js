import React from "react";

import "./style.css";

function Title({ title, subtitle }) {
  return (
    <div id="title">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

export default Title;
