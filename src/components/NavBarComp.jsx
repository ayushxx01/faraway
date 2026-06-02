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
          fontSize: '18px',
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
          {['Journal', 'History'].map((item) => (
            <li key={item}>
              <a href="#" style={{
                fontSize: '13px',
                fontWeight: 400,
                color: item === 'Journal' ? '#e8e4f0' : 'rgba(232,228,240,0.4)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                {item}
              </a>
            </li>
          ))}
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
            📖
          </div>
          <div style={{
            width: '30px', height: '30px',
            borderRadius: '50%',
            background: 'rgba(232,149,109,0.15)',
            border: '0.5px solid rgba(232,149,109,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 500,
            color: '#e8956d',
            cursor: 'pointer',
          }}>
            {/* {formData.username?.[0]?.toUpperCase() || 'U'} */}
          </div>
        </div>
      </nav>
  )
}

export default NavBarComp