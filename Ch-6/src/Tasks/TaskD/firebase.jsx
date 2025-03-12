
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfrXoWFhw3XnMFP0lg2fNv03VRp8_C_24",
  authDomain: "note-taking-app-dda41.firebaseapp.com",
  projectId: "note-taking-app-dda41",
  storageBucket: "note-taking-app-dda41.firebasestorage.app",
  messagingSenderId: "144555277408",
  appId: "1:144555277408:web:a81879db8032ead5c11705",
  measurementId: "G-3TB9LHQXYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth()
export const  db = getFirestore(app)
export default app