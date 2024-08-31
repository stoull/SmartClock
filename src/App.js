import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js';
import Analyse from './pages/Analyse.jsx';
import React, {useCallback, useState, useEffect} from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IconContext } from "react-icons";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/analyse" element={ <Analyse />}></Route>
      <Route path="*"></Route>
    </Routes>
  );
}

export default App;