import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ContentPage from "./pages/ContentPage/ContentPage.js";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.js";
import SearchPage from "./pages/SearchPage/SearchPage.js";
import SignupPage from "./pages/SignupPage/SignupPage.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<SearchPage />} />
        <Route path="/summoner/:region/:username" element={<ContentPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
