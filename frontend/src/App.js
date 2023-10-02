import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SearchPage from './pages/SearchPage.js';
import ContentPage from './pages/ContentPage.js';
import NotFoundPage from './pages/NotFoundPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SearchPage/>}/>
        <Route path="/summoner/:region/:username" element={<ContentPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
