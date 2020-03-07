import React, { useState } from 'react';
import './App.css';
// import DragItems from './components/DragItems'
import UserLogin from './components/UserLogin'
import Header from './components/shared/Header'
import GuestLogin from './components/GuestLogin'
import { Route } from 'react-router-dom'
import GalleryCreate from './components/GalleryCreate'
import GalleryView from './components/GalleryView'


function App() {

  // add multiple in input for multiple files
  return (
    <div className="App">
      {/* <Header/> */}
      {/* <UserLogin /> */}
      {/* <GuestLogin/> */}
      {/* <GalleryCreate /> */}
      <GalleryView />
    </div>
  );
}

export default App;
