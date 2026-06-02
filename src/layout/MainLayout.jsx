import React from 'react'
import NavBarComp from '../components/NavBarComp'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0b14',
      fontFamily: "'DM Sans', sans-serif",
      color: '#e8e4f0',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
      
      {/* Content */}
       <>
    <NavBarComp/>
    <Outlet/>
    </>
      <div style={{ padding: '28px' }}>
      
      </div>
    </div>
   
  )
}

export default MainLayout