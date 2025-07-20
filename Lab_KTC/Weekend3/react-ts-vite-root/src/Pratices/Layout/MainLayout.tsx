// import React from 'react'
import { Outlet } from 'react-router'
import { Nav } from '../components/HeaderNav';



const MainLayout = () => {
  return (
    <div>
      <Nav />
      <div>
        <Outlet />

      </div>
          
    </div>
  )
}

export default MainLayout