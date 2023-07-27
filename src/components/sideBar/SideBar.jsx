// import React from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'
import { useEffect, useState } from 'react'
// import {ReactComponent as HomeIcon} from './instaAssets/homeIcon.svg'
// import {ReactComponent as ReelIcon} from './instaAssets/reelIcon.svg'
// import {ReactComponent as ReelIcon2} from './instaAssets/reelIcon2.svg'
// import {ReactComponent as SearchIcon} from './instaAssets/searchIcon.svg'
// import {ReactComponent as HomeIcon2} from './instaAssets/homeIcon2.svg'
import { ReactComponent as HomeIcon } from './instaAssets/homeIcon.svg'
import { ReactComponent as HomeFillIcon } from './instaAssets/homeFillIcon.svg'
import { ReactComponent as SearchIcon } from './instaAssets/searchIcon.svg'
import { ReactComponent as SearchFillIcon } from './instaAssets/searchFillIcon.svg'
import { ReactComponent as ReelIcon } from './instaAssets/reelIcon.svg'
import { ReactComponent as ReelFillIcon } from './instaAssets/ReelFillIcon.svg'
import { ReactComponent as CreateIcon } from './instaAssets/createIcon.svg'
import { ReactComponent as CreateFillIcon } from './instaAssets/createFillIcon.svg'
import { ReactComponent as MessangerIcon } from './instaAssets/messangerIcon.svg'
import { ReactComponent as MessangerFillIcon } from './instaAssets/messangerFillIcon.svg'
import { ReactComponent as LightModeIcon } from './instaAssets/lightmodeIcon.svg'
import { ReactComponent as DarkModeIcon } from './instaAssets/darkmodeIcon.svg'
import Profile from './instaAssets/userProfileImage.jpg'
import InstaIcon from './instaAssets/instaIcon.png'
import { useDispatch, useSelector } from 'react-redux'
import { SET_MODAL_OPEN } from '../../reducers/appReducer'
const SideBar = () => {
  const {modalOpen}=useSelector(state=>state.App) 
  const [device, setDevice] = useState();
  const [dark, setDark] = useState(localStorage.getItem('darkmode'));
  const dispatch=useDispatch()
  const setDarkMode = () => {
    if (localStorage.getItem('darkmode') === 'enable') {
      localStorage.setItem('darkmode', 'disable')
      setDark('disable')
    } else {
      localStorage.setItem('darkmode', 'enable')
      setDark('enable')
    }
  }
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
    if (dark === 'enable') {
      document.body.classList.add('darkmode');
    } else {
      document.body.classList.remove('darkmode')
    }
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dark])
  const setModalOpen = () => {
    // setCreateOpen(!isCreateOpen)
    dispatch(SET_MODAL_OPEN(!modalOpen));
    // localStorage.setItem('modalOpen', !isCreateOpen)

  }
  return (
    <>
      <div className='sidebar'>
        <div className="sidebar1">
          <NavLink to='/' className='sidebarTop'>
            {
              device === 'lap' ? <h1>InstaClone</h1> : <img src={InstaIcon} alt="" />
            }

          </NavLink>
          <div className='sidebarMiddle'>
            <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to='/'>
              {({ isActive }) => {

                return (
                  <>
                    {
                      isActive ? <HomeFillIcon /> : <HomeIcon />
                    }
                    {
                      device === 'lap' && <p>Home</p>
                    }
                  </>
                )
              }}
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to='/search'>
              {({ isActive }) => {

                return (
                  <>
                    {
                      isActive ? <SearchFillIcon /> : <SearchIcon />
                    }
                    {
                      device === 'lap' && <p>Search</p>
                    }
                  </>
                )
              }}
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to='/reels'>
              {({ isActive }) => {

                return (
                  <>
                    {
                      isActive ? <ReelFillIcon /> : <ReelIcon />
                    }
                    {
                      device === 'lap' && <p>Reels</p>
                    }
                  </>
                )
              }}
            </NavLink>
            {device !== 'mob' &&
              <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to='/inbox'>
                {({ isActive }) => {
                  return (
                    <>
                      {
                        isActive ? <MessangerFillIcon /> : <MessangerIcon />
                      }
                      {
                        device === 'lap' && <p>Messages</p>
                      }
                    </>
                  )
                }}
              </NavLink>
            }
            <div className={modalOpen ? 'activeLink create' : 'create'} onClick={() => setModalOpen()}>
              <>
                {
                  modalOpen ? <CreateFillIcon /> : <CreateIcon />
                }
                {
                  device === 'lap' && <p>Create</p>
                }
              </>
            </div>
            <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to='/profile'>
              {() => {
                return (
                  <>
                    <img src={Profile} alt="" />
                    {
                      device === 'lap' && <p>Profile</p>
                    }
                  </>
                )
              }}
            </NavLink>
          </div>
          {
            device !== 'mob' && <div className="sidebarBottom">
              <div onClick={setDarkMode}>
                <>
                  {
                    dark === 'enable' ? <LightModeIcon className='lightModeIcon' /> : <DarkModeIcon className='darkModeIcon' />
                  }
                  {
                    device === 'lap' && <p className={dark === 'disable' ? 'darkswitch' : ''} >Switch</p>
                  }
                </>
              </div>
            </div>
          }

        </div>
      </div>
    </>
  )
}

export default SideBar