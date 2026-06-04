import React, { useEffect, useState } from 'react'
import { auth, db } from "../firebase/firebase";
import { getDoc } from 'firebase/firestore';
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import JournalComp from './JournalComp';
const IsConnComp = ({formData}) => {
  const[loading, setLoading] = useState(true);
  const [journal, setJournal] = useState(null); //because its an obj
  const user = auth.currentUser; //cause formadata doesnt contain user uid
  const pair = formData.pairId;
  const today = new Date().toISOString().split("T")[0];
  const [partner,setPartner] = useState(null);
useEffect(() => {
  const fetch = async () => {
    // journal fetch
    const docRef = doc(db, 'relations', pair, 'journals', today);
    const docSnap = await getDoc(docRef);

    // partner fetch
    const parRef = doc(db, 'users', formData.connectedTo);
    const parDoc = await getDoc(parRef);
    setPartner(parDoc.data());

    // journal set
    if (!docSnap.exists()) {
      const jourData = {
        date: today,
        user1Id: user.uid,
        user2Id: formData.connectedTo,
        user1entry: "",
        user2entry: ""
      }
      await setDoc(doc(db, 'relations', pair, 'journals', today), jourData);
      setJournal(jourData);
    } else {
      setJournal(docSnap.data());
    }

    setLoading(false);
  }
  fetch();
}, []) // ← always empty, runs once
  if(journal === null && partner === null){
    return (
      <>
      <h1>loading</h1>
      </>
    )
  }
  else {
    
    return (
      
    <>
      <JournalComp journal = {journal} currentUserUid={user.uid} pair={pair} formData={formData} partner={partner.name}/>
       
      </>
  )
  }
}

export default IsConnComp