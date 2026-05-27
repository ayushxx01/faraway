import React, { useEffect, useState } from 'react'
import { auth, db } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import {
  doc,
  getDoc
} from "firebase/firestore";
const HomePage = () => {
    const user = auth.currentUser;
    const navigate = useNavigate();
    const[formData, setFormData] = useState(null);
    
    useEffect(() => {const fetchUserData = async () => {
        
            if(!user) {

            }

            const docRef = doc(db,"users",user.uid);

            const docSnap = await getDoc(docRef);

            console.log(docSnap);

            if(docSnap.exists()){
                setFormData(docSnap.data());
                
            }
            else{
                console.log("No data")
            }

        
    }
fetchUserData()},[]);
 if (!formData) {
    return <h1>Loading...</h1>;
  }
    return (
        <>
        {
            formData.isConnected ? (
                 <h1>
              Show Journal Screen
            </h1>
            ) : (
                <>
              <h1>
                Connect With Partner
              </h1>

              <p>
                Your Code:
                {formData.partnerCode}
              </p>

              <button>
                Copy Code
              </button>

              <input
                placeholder="Enter Partner Code"
              />

              <button>
                Connect
              </button>
            </>
            ) 
        }
        </>
    )

}

export default HomePage