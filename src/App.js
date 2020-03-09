import React, { useState } from 'react';
import './App.css';
// import DragItems from './components/DragItems'
import UserLogin from './components/UserLogin'
import Header from './components/shared/Header'
import GuestLogin from './components/GuestLogin'
import { Route } from 'react-router-dom'
import GalleryCreate from './components/GalleryCreate'
import GalleryView from './components/GalleryView'
import EditAdd from './components/EditAdd'
import EditShare from './components/EditShare'
import ImageView from './components/ImageView'
import UserCreate from './components/UserCreate'
import ControlPanel from './components/ControlPanel'
import Welcome from './components/shared/Welcome'

/*
App -> Header*
    -> UserLogin* -> ControlPanel -> EditAdd*
                                 -> EditShare*
                                 -> GalleryCreate*
                                 -> GalleryView*
                 -> GuestLogin* -> GalleryView*

GalleryView* -> ImageView

to do:
ControlPanel
ImageView
*/

function App() {

  // add multiple in input for multiple files
  return (
    <div className="App">
      {/* <Welcome /> */}
      {/* <Header/> */}
      {/* <UserLogin /> */}
      {/* <GuestLogin/> */}
      {/* <GalleryCreate /> */}
      {/* <GalleryView /> */}
      {/* <EditAdd /> */}
      {/* <EditShare /> */}
      {/* <ImageView /> */}
      {/* <UserCreate /> */}
      {/* <ControlPanel /> */}

      <Route exact path='/' component={(props)=><UserLogin {...props}/>} />
      <Route exact path='/cp' component={(props)=><ControlPanel {...props}/>} />
    </div>
  );
}

export default App;
