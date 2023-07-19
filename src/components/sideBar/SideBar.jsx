// import React from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'
const SideBar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar1">
            <h1>sideBar</h1>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/reels'>Reels</NavLink>
        </div>
    </div>
  )
}

export default SideBar