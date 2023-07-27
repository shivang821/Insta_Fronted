// import React from 'react'
import { useEffect, useState } from 'react';
import './home.css'
import TopBar from '../sideBar/TopBar';
import { motion } from 'framer-motion'
const Home = () => {
  const [device, setDevice] = useState();
  useEffect(() => {
    function handleResize() {
      const deviceWidth = window.innerWidth;
      if (deviceWidth > 1439) {
        setDevice('lap');
      }
      else if (deviceWidth >= 768 && deviceWidth < 1440) {
        setDevice('tab')
      } else if (deviceWidth < 768) {
        setDevice('mob')
      }
    }
    if (!localStorage.getItem('darkmode')) {
      localStorage.setItem('darkmode', 'disable')
    }
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])
  return (
    <motion.div
      className='home'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{opacity: 0.5 }}
      transition={{
        ease: "linear",
        duration: .5,
      }}
    >
      {device === 'mob' && <TopBar />}
      <h2>Home</h2>
      <div></div>
      <div style={{backgroundColor:'yellow'}}></div>
        <div></div>
      {/* <h2 className="last">
          home
        </h2> */}
    </motion.div>
  )
}

export default Home