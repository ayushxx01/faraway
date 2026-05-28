import React, { useEffect, useState } from 'react'
import { auth, db } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import {
  doc,
  getDoc
} from "firebase/firestore";
import IsntConnComp from '../components/IsntConnComp';
import IsConnComp from '../components/IsConnComp';
import {
  onAuthStateChanged
} from "firebase/auth";


const HomePage = () => {

    const navigate = useNavigate();
    const[formData, setFormData] = useState(null);
    
    useEffect(() => {

  const unsubscribe =
    onAuthStateChanged(
      auth,
      async (user) => {

        if (!user) {
          navigate("/auth");
          return;
        }

        try {

          const docRef =
            doc(db, "users", user.uid);

          const docSnap =
            await getDoc(docRef);

          if (docSnap.exists()) {

            setFormData(docSnap.data());

          } else {

            console.log(
              "No such document"
            );

          }

        } catch (error) {

          console.log(error);

        }
      }
    );

  return () => unsubscribe();

}, []);

 if (!formData) {
    return <h1>Loading...</h1>;
  }
    return (
        <>
        {
            formData.isConnected ? (
                 <IsConnComp formData={formData} />
            ) : (
              <IsntConnComp formData={formData}/>
            ) 
        }
        </>
    )

}

export default HomePage