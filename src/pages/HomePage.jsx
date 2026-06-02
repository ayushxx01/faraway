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
   formData.isConnected ? (
          <IsConnComp formData={formData} />
        ) : (
          <IsntConnComp formData={formData} />
        )
  )
}

export default HomePage