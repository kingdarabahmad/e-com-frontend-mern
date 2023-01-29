// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-Gs1w6K9nhYX-DUNJSYESpyGKscHiCEs",
  authDomain: "full-stack-ecom-auth.firebaseapp.com",
  projectId: "full-stack-ecom-auth",
  storageBucket: "full-stack-ecom-auth.appspot.com",
  messagingSenderId: "836763295091",
  appId: "1:836763295091:web:931b8913d15ad2579bf906",
  measurementId: "G-BF9QP8XWEZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
