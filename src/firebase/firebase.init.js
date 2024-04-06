// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_JIFlr3nBylP74tpy-8plS0zuPbgJjnw",
  authDomain: "red-onion-6f3dd.firebaseapp.com",
  projectId: "red-onion-6f3dd",
  storageBucket: "red-onion-6f3dd.appspot.com",
  messagingSenderId: "100009560456",
  appId: "1:100009560456:web:af5e78f33c668610e8523d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;