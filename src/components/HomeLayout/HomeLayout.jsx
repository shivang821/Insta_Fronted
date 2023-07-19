import { Outlet } from "react-router-dom"
import SideBar from "../sideBar/SideBar"
import './homeLayout.css'

const HomeLayout = () => {
  return (
    <>
    <div className="homeLayout">
      <SideBar />
      <Outlet />
    </div>
    </>
  )
}

export default HomeLayout