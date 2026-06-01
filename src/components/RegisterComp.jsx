import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';

const RegisterComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      navigate('/profile-setup');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password must be at least 6 characters.");
      } else {
        setError("Something went wrong. Try again.");
      }
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
        placeholder="Password (min. 6 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
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
        onClick={handleSignUp}
        disabled={loading}
        style={{ marginTop: '4px', opacity: loading ? 0.6 : 1 }}
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
    </div>
  )
}

export default RegisterComp