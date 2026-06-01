import React, { useEffect, useState } from 'react'
import { auth, db } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import IsntConnComp from '../components/IsntConnComp';
import IsConnComp from '../components/IsConnComp';

const HomePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/auth");
        return;
      }
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          console.log("No such document");
        }
      } catch (error) {
        console.log(error);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!formData) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0d0b14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.08); }
          }
          @keyframes fadein {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '28px',
          fontWeight: 500,
          color: '#e8b89a',
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          Distance
        </div>
        <div style={{
          fontSize: '13px',
          color: 'rgba(232,228,240,0.3)',
          letterSpacing: '0.08em',
          animation: 'fadein 0.6s ease forwards',
        }}>
          Finding your thread...
        </div>
      </div>
    )
  }

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

      {/* Nav */}
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
          Distance
        </span>

        <ul style={{
          display: 'flex',
          gap: '28px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}>
          {['Journal', 'History', 'Partners'].map((item) => (
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
            {formData.username?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div style={{ padding: '28px' }}>
        {formData.isConnected ? (
          <IsConnComp formData={formData} />
        ) : (
          <IsntConnComp formData={formData} />
        )}
      </div>
    </div>
  )
}

export default HomePage