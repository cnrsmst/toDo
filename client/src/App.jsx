import Home from './components/Home'
import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ToDos from './components/ToDos';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
        <Route exact path="/todos" element={<ToDos setLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  )
}

export default App
