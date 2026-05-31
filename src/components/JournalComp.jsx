import React, { useEffect, useState } from 'react'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase/firebase";
const JournalComp = ({journal, currentUserUid, pair}) => {
    const today = new Date().toISOString().split("T")[0];
  const isUser1 = currentUserUid === journal.user1Id;
  console.log(journal)
  console.log(isUser1);
  const[myData, setMyData] =useState(
    isUser1 ? journal.user1entry : journal.user2entry
  );
  const[partnerData, setPartnerData] = useState(
    isUser1 ? journal.user2entry : journal.user1entry
  );
  console.log(myData);
  console.log(partnerData);
  
  const saveEditData = async ()=> {
      if(isUser1) {
         await updateDoc(doc(db,'relations',pair,'journals',today), {
        user1entry: myData
      });
      }
      else {
         await updateDoc(doc(db,'relations',pair,'journals',today), {
        user2entry: myData
      });
      }
     
    }

  return (
    <>
    <div className="flex flex-row gap-6">
      <div className="flex-1">
        <h2>My Journal</h2>
        <textarea value={myData} onChange={(e)=> setMyData(e.target.value)}/>
        
        <button onClick={saveEditData}>Save</button>
      </div>
      <div className="flex-1">
        <h2>Partner Journal</h2>
        <textarea value={partnerData} readOnly/>
       
      </div>
    </div>
    </>
  )
}

export default JournalComp