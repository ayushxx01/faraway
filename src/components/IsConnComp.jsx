import React, { useEffect, useState } from 'react'
import { auth, db } from "../firebase/firebase";
import { getDoc } from 'firebase/firestore';
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
const IsConnComp = ({formData}) => {
  const[loading, setLoading] = useState(true);
  const [journal, setJournal] = useState(null); //because its an obj
  const user = auth.currentUser; //cause formadata doesnt contain user uid
  const pair = formData.pairId;
  const today = new Date().toISOString().split("T")[0];
  useEffect(()=> {
    const fetch = async () => {
      console.log(formData);
      console.log(pair);
      console.log(today)
      const docRef = doc(db,'relations', pair ,'journals' ,today);
      const docSnap = await getDoc(docRef);
      
      if(!docSnap.exists()){
        const jourData = {
          date: today,
          user1Id: user.uid,
          user2Id: formData.connectedTo,
          user1entry: "",
          user2entry: ""
        }
        const jour = await setDoc(doc(db,'relations', pair, 'journals', today),
         jourData);

        setLoading(false);
        setJournal(jourData)
      } 
      else {
        setLoading(false)
        setJournal(docSnap.data())
      }

    } 
  fetch (); },[])
  return (
    <>
      <div className="flex flex-row gap-6">
        <div className="flex-1">
          <h2>{formData.username}</h2>
        </div>
        <div className="flex-1">
          <h2>{formData.username}</h2>
        </div>
      </div>
      </>
  )
}

export default IsConnComp