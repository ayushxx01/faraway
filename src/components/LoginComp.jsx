import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";

const LoginComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = async () => {
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        navigate('/home');
      } else {
        navigate('/profile-setup');
      }
    } catch (err) {
      setError("Invalid email or password.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input
        className="auth-input"
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleLogIn()}
      />

      {error && (
        <div style={{
          fontSize: '12px',
          color: '#e87e7e',
          padding: '8px 12px',
          background: 'rgba(232,126,126,0.08)',
          borderRadius: '8px',
          border: '0.5px solid rgba(232,126,126,0.2)',
        }}>
          {error}
        </div>
      )}

      <button
        className="auth-primary-btn"
        onClick={handleLogIn}
        disabled={loading}
        style={{ marginTop: '4px', opacity: loading ? 0.6 : 1 }}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </div>
  )
}

export default LoginComp