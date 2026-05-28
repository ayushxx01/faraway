import React, { useEffect, useState } from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';

const IsntConnComp = ({formData}) => {
    const[copied, setCopied] = useState(false);
    const[partnerCode, setPartnerCode] = useState('');
    const user = auth.currentUser;
   
   

    const copy = () => {
        navigator.clipboard.writeText(formData.partnerCode);
        setCopied(true);

    }

    const handleSubmit = async()=>{
        //me inserting partner code here and checking if it exists in the db
        const q = query(
            collection(db,'users'),
            where("partnerCode",
                "==",
                partnerCode
            )
        );

        const querySnapShot = await getDocs(q);

        if(querySnapShot.empty) {
            return "No user exists";
        }

        const partnerDoc = querySnapShot.docs[0];
        const partnerData = partnerDoc.data();


        if(partnerData.isConnected){
            console.log("already connected");
            return;
        }

        const userRef = doc(db,'users',user.uid)
        const partnerRef = doc(db,'users',partnerDoc.id);
        await updateDoc(
            userRef,{
                isConnected: true,
                connectedTo: partnerDoc.id
            }
        );

        await updateDoc(partnerRef, {
            isConnected: true,
            connectedTo: user.uid
        });
    }
  return (
    
                <>
              <h1>
                Connect With Partner
              </h1>

              <p>
                Your Code:
                {formData.partnerCode}
              </p>

              <button onClick={copy}>
                {copied ? 'copied!' : 'Copy Code'}
              </button>

              <input
                placeholder="Enter Partner Code"
                onChange={(e)=>setPartnerCode(e.target.value)}
              />

              <button onClick={handleSubmit}>
                Connect
              </button>
            </>
  )
}

export default IsntConnComp