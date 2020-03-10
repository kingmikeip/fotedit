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
import Help from './components/Help'

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
      <Route exact path='/create-user' component={(props)=><UserCreate {...props} />} />
      <Route exact path='/cp' component={(props)=><ControlPanel {...props}/>} />
      <Route exact path='/help' component={Help} />
      <Route exact path='/gallery-create' component={(props)=><GalleryCreate {...props}/>} />
      <Route exact path='/gallery/:id' component={(props)=><GalleryView {...props}/>}/>
      <Route exact path='/guest-login' component={(props)=><GuestLogin {...props}/>}/>
      <Route exact path='/edit-add' component={(props)=><EditAdd {...props}/>} />
      <Route exact path='/edit-share' component={(props)=><EditShare {...props}/>} />
      <Route exact path='/gallery/:id/image/:id' component={(props)=><ImageView {...props} />} />
    </div>
  );
}

export default App;
