// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔑 Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfiQgMCSeJiZHDemb-qgEnUHr9fLRK6OE",
  authDomain: "bag-verse.firebaseapp.com",
  projectId: "bag-verse",
  storageBucket: "bag-verse.appspot.com",
  messagingSenderId: "682187092407",
  appId: "1:682187092407:web:0633dc1501eec9e09b3832"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);       // Firebase Authentication
export const db = getFirestore(app);    // Firestore Database
export const storage = getStorage(app); // Firebase Storage
