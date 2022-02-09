import './App.scss';
import React, { useRef, useState, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from 'pages/Game/Game';
import Home from 'pages/Home/Home';
import Shop from 'pages/Shop/Shop';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Game />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/shop" element={<Shop />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
