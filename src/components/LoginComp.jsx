import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../firebase/firebase";
import {useState} from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";

const LoginComp = () => {
     const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleLogIn = async() =>{
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const docRef = doc(db,'users',user.uid);
                const docSnap = await getDoc(docRef);
                console.log(userCredential.user);

            if(docSnap.exists()){
              navigate('/home');
              
            }
            else{
              navigate('/profile-setup')
            }
                  
        }
        catch (err){
            console.error(err);
        }
        
    }
  return (
    <>
    <input type = "email" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
    <input type = "password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
    <button onClick={handleLogIn}>Log In</button>
    </>
  )
}

export default LoginComp