import React, { useState } from 'react'
import LoginComp from '../components/LoginComp';
import RegisterComp from '../components/RegisterComp';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0b14',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      color: '#e8e4f0',
      padding: '24px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadein {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .auth-card { animation: fadein 0.5s ease forwards; }
        .auth-input {
          width: 100%;
          background: rgba(255,255,255,0.04) !important;
          border: 0.5px solid rgba(255,255,255,0.1) !important;
          border-radius: 10px !important;
          padding: 12px 16px !important;
          color: #e8e4f0 !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 14px !important;
          outline: none !important;
          transition: border-color 0.2s !important;
          box-sizing: border-box !important;
        }
        .auth-input::placeholder { color: rgba(232,228,240,0.2) !important; }
        .auth-input:focus { border-color: rgba(232,149,109,0.4) !important; }
        .auth-primary-btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          background: #e8956d;
          color: #1a0f08;
          transition: opacity 0.2s, transform 0.1s;
        }
        .auth-primary-btn:hover { opacity: 0.88; }
        .auth-primary-btn:active { transform: scale(0.98); }
        .auth-toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(232,228,240,0.4);
          transition: color 0.2s;
          padding: 0;
        }
        .auth-toggle-btn span {
          color: #e8956d;
          font-weight: 500;
        }
        .auth-toggle-btn:hover { color: rgba(232,228,240,0.7); }
      `}</style>

      <div className="auth-card" style={{
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}>
        {/* Logo + tagline */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '36px',
            fontWeight: 500,
            color: '#e8b89a',
            letterSpacing: '0.02em',
            marginBottom: '8px',
          }}>
            Distance
          </div>
          <div style={{
            fontSize: '13px',
            color: 'rgba(232,228,240,0.3)',
            fontStyle: 'italic',
            fontFamily: "'Playfair Display', serif",
          }}>
            {isLogin ? 'Welcome back.' : 'Begin your story.'}
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: '#1a1624',
          borderRadius: '16px',
          padding: '28px',
          border: '0.5px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(232,228,240,0.3)',
          }}>
            {isLogin ? 'Sign in' : 'Create account'}
          </div>

          {isLogin
            ? <LoginComp />
            : <RegisterComp />
          }
        </div>

        {/* Toggle */}
        <div style={{ textAlign: 'center' }}>
          <button className="auth-toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? <>No account? <span>Create one</span></>
              : <>Already have one? <span>Sign in</span></>
            }
          </button>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          fontSize: '11px',
          color: 'rgba(232,228,240,0.15)',
          letterSpacing: '0.06em',
        }}>
          Connecting hearts across distance
        </div>
      </div>
    </div>
  )
}

export default AuthPage