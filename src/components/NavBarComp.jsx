import React from 'react'

const NavBarComp = () => {
  return (
    
    <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 28px',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '25px',
          fontWeight: 600,
          color: '#e8b89a',
          letterSpacing: '0.02em',
        }}>
          Faraway
        </span>

        <ul style={{
          display: 'flex',
          gap: '28px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}>
        
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '30px', height: '30px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px',
            color: 'rgba(232,228,240,0.5)',
            cursor: 'pointer',
          }}>
            
          </div>
       
        </div>
      </nav>
  )
}

export default NavBarComp