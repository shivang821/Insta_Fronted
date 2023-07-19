import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Splash from './components/auth/Splash';
import { fetchUser } from './actions/userActions';
import SideBar from './components/sideBar/SideBar';
import Reels from './components/Reels/Reels.jsx'
const Login = React.lazy(() =>{
  return new Promise(resolve=>{
    setTimeout(() =>resolve(import('./components/auth/Login')), 2000);
  })
})
const Home = React.lazy(()=>{
  return new Promise(resolve=>{
    setTimeout(() =>resolve(import('./components/Home/Home.jsx')), 2000);
  })
})
function App() {
  const { isAuthenticate } = useSelector(state => state.User);
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
      <>
      <Suspense fallback={<Splash />} >
        {isAuthenticate ?
          <div className='app' >
            <SideBar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/reels' element={<Reels/>}/>
            </Routes>
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
