// import React, { useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Splash from './components/auth/Splash';
import { fetchUser } from './actions/userActions';
import SideBar from './components/sideBar/SideBar';
import Reels from './components/Reels/Reels.jsx'
import Messages from './components/Messages/Messages.jsx'
import Profile from './components/Profile/Profile.jsx'
import { AnimatePresence } from 'framer-motion'
// import TopBar from './components/sideBar/TopBar';

import Search from './components/Search/Search';
import CreateModal from './components/CreateModal/CreateModal';
const Login = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./components/auth/Login')), 2000);
  })
})
const Home = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./components/Home/Home.jsx')), 2000);
  })
})
function App() {
  const { isAuthenticate } = useSelector(state => state.User);
  const { modalOpen } = useSelector(state => state.App)
  const dispatch = useDispatch()
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch, modalOpen])
  return (
    <>
      <Suspense fallback={<Splash />} >
        {isAuthenticate ?
          <div className='app' >
            {/* {device==='mob' && <TopBar />} */}
            <SideBar />
            <div className='app2'>
              <AnimatePresence mode='popLayout' initial={true}>
                <Routes  >
                  <Route path='/' element={<Home />} />
                  <Route path='/search' element={<Search />} />
                  <Route path='/inbox' element={<Messages />} />
                  <Route path='/reels' element={<Reels />} />
                  <Route path='/profile' element={<Profile />} />
                </Routes>
              </AnimatePresence>
            </div>
            {
              modalOpen &&
              <AnimatePresence>
                <CreateModal />
              </AnimatePresence>
            }

          </div> :
          <div className='loginApp' >
            <Routes>
              <Route path='/' element={<Login />} />
            </Routes>
          </div>
        }
      </Suspense>
    </>
  )
}

export default App
