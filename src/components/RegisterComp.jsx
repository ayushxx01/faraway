import React from 'react'
import {useState} from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
const RegisterComp = () => {
  const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSignUp = async() =>{
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            console.log(userCredential.user);
            navigate('/profile-setup');
        }
        catch (err){
            console.error(err);
        }
    }
  return (
    <>
    <input type = "email" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
    <input type = "password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
    <button onClick={handleSignUp}>Sign Up</button>
    </>
  )
}

export default RegisterComp