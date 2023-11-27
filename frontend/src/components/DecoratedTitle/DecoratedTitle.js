import React from "react";

import "./style.css";
import decoratorLeft from "../../images/decorator-left.png";
import decoratorRight from "../../images/decorator-right.png";

function DecoratedTitle({ title }) {
  return (
    <div className="decorated-title">
      <img src={decoratorLeft} className="decorator" alt="" />
      <h2>{title}</h2>
      <img src={decoratorRight} className="decorator" alt="" />
    </div>
  );
}

export default DecoratedTitle;
