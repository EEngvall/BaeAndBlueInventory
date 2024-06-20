// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4fpYeyMsrTh3sJKaR4MncNJqO-yX0vx4",
  authDomain: "baeandblue-cb251.firebaseapp.com",
  projectId: "baeandblue-cb251",
  storageBucket: "baeandblue-cb251.appspot.com",
  messagingSenderId: "232755973638",
  appId: "1:232755973638:web:5b8abd17222cd542cb7d87",
  measurementId: "G-W7XT1607TN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
