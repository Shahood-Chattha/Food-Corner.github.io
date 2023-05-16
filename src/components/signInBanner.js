import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const SignInBanner = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <main className="d-flex pt-3 pb-2" style={{ backgroundColor: "#2a52be"}}>
      <h3 className="d-flex flex-grow-1 justify-content-start my-auto px-2 text-white">Sign in to chat with the operator.</h3>
      <button className="d-flex justify-content-end btn btn-info mx-2" onClick={googleSignIn} type="button">
        Sign In
      </button>
    </main>
  );
};

export default SignInBanner;
