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

     const generatePartnerCode = (name) => {
        

        const partnerCode = `&&${name.toLowerCase()}${Math.floor(1000 + Math.random() * 9000)}`;

        return partnerCode;
    }

    const[formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        isConnected: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const user = auth.currentUser;
            const partnerCode = generatePartnerCode(formData.name);
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                name: formData.name,
                age: Number(formData.age),
                gender: formData.gender,
                isConnected: false,
                connectedTo: null,
                partnerCode,
                createdAt: serverTimestamp(),
                pairId: null
            
            });

            navigate('/home');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }


   
  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type = "text" placeholder='name' onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input type = "number" placeholder='age' onChange={(e) => setFormData({...formData, age: e.target.value})} />
        <input type = "text" placeholder='gender' onChange={(e) => setFormData({...formData, gender: e.target.value})} />
        <button type="submit">Submit</button>

    </form></>
    
    
    )

}

export default ProfileSetPage