import React from "react";
import { Link } from 'react-router-dom';

import "./style.css";
import Title from "../../components/Title/Title.js";

function WelcomePage() {
  return (
    <div id="welcome-page" className="page">
      <Title title={"Welcome Page"} />
      <Link className='button-container' to="/login">
        <button className="button">Login</button>
      </Link>
      <Link className='button-container' to="/signup">
        <button className="button">Sign Up</button>
      </Link>
    </div>
  );
}

export default WelcomePage;
