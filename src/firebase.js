// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPhoneNumber,
  signOut
} from "firebase/auth";
import { getDatabase, ref, push, get } from "firebase/database";

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
auth.languageCode = 'it';
export const db = getDatabase(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const userRef = ref(db, "users/" + user.uid);
    const userSnapshot = await get(userRef);
    if (!userSnapshot.exists()) {
      push(userRef, {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userRef = ref(db, "users/" + user.uid);
    push(userRef, {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithPhoneNumber = async (phoneNumber, recaptchaVerifier) => {
  try {
    const verificationId = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    const verificationCode = window.prompt("Enter the verification code");
    const confirmationResult = confirmationResult.confirm(verificationCode)
    var credential = auth.PhoneAuthProvider.credential(confirmationResult.verificationId, verificationCode);
    auth().signInWithCredential(credential);
    // const credential = await signInWithPhoneNumber(auth, verificationId, verificationCode);
    alert("Successfully logged in with phone number:", credential.user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logInWithPhoneNumber,
  logout
};
