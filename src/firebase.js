// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA8FNO0hMHvvMzoABn5wxZ9Rn0lLpsSZ8",
  authDomain: "react-chat-a3412.firebaseapp.com",
  databaseURL: "https://react-chat-a3412-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-chat-a3412",
  storageBucket: "react-chat-a3412.appspot.com",
  messagingSenderId: "537346556875",
  appId: "1:537346556875:web:3f614b63835df44ec86c4e",
  measurementId: "G-TN3C3HE881"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);