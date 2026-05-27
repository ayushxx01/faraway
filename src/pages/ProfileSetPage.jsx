import React, { useState } from 'react'
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';

const ProfileSetPage = () => {
    const navigate = useNavigate();

     const generatePartnerCode = (username) => {
        

        const partnerCode = `&&${username.toLowerCase()}${Math.floor(1000 + Math.random() * 9000)}`;

        return partnerCode;
    }

    const[formData, setFormData] = useState({
        username: "",
        age: "",
        gender: "",
        isConnected: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const user = auth.currentUser;
            const partnerCode = generatePartnerCode(formData.username);
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                username: formData.username,
                age: Number(formData.age),
                gender: formData.gender,
                isConnected: false,
                connectedTo: null,
                partnerCode,
                createdAt: serverTimestamp()
            
            });

            navigate('/home');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }


   
  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type = "text" placeholder='username' onChange={(e) => setFormData({...formData, username: e.target.value})} />
        <input type = "number" placeholder='age' onChange={(e) => setFormData({...formData, age: e.target.value})} />
        <input type = "text" placeholder='gender' onChange={(e) => setFormData({...formData, gender: e.target.value})} />
        <button type="submit">Submit</button>

    </form></>
    
    
    )

}

export default ProfileSetPage