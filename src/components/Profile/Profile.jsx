// import React from 'react'
import './profile.css'
import { motion } from 'framer-motion'
const Profile = () => {
  return (
    <motion.div
      className='profile'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{opacity: 0.5 }}
      transition={{
        ease: "linear",
        duration: .5,
      }}
    >
      Profile
    </motion.div>
  )
}

export default Profile