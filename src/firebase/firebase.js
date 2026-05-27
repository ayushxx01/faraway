// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOhUFKYx9T_K2MmN40hSVD-Mfv5Ui5-c4",
  authDomain: "gentlyweeps-be709.firebaseapp.com",
  projectId: "gentlyweeps-be709",
  storageBucket: "gentlyweeps-be709.firebasestorage.app",
  messagingSenderId: "86861699142",
  appId: "1:86861699142:web:793a3b92564d6e1e1e5247"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);