import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from "firebase/auth";


import { auth, logInWithEmailAndPassword, signInWithGoogle, logInWithPhoneNumber } from '../firebase';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState("");
  const [email, setEmail] = useState('');
  const [loginPhoneNumber, setLoginPhoneNumber] = useState(false);
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
  })

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/');
  }, [user, loading, navigate]);

  const handleSignInWithPhone = () => {
    setLoginPhoneNumber(true)
  }

  const handleLogInWithPhoneNumber = async () => {
    const auth = getAuth();
    const appVerifier = new RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
    });
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      setConfirmationResult(confirmationResult);
    })
    .catch((error) => {
      console.log(error);
    });
    try {
      await logInWithPhoneNumber(phoneNumber, loginPhoneNumber);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleVerifyCode = () => {
    const credential = PhoneAuthProvider.credential(
      confirmationResult.verificationId,
      verificationCode
    );
  
    signInWithCredential(auth, credential)
      .then((userCredential) => {
        // Phone authentication successful
        const user = userCredential.user;
        // Do something with the authenticated user
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  const handleLogin = async () => {
    if (loginPhoneNumber) {
      await handleLogInWithPhoneNumber();
    } else {
      await logInWithEmailAndPassword(email, password);
    }
  };

  return (
    <div className="container d-flex flex-column" style={{ height: "calc(100vh - 98px)"}}>
      <div className="row d-flex flex-grow-1 justify-content-center align-items-center">
        <div className="col-md-6 col-lg-4">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Sign In</h3>
              <form>
                {loginPhoneNumber ? 
                  <>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Verification Code"
                      required
                    />
                  </div>
                  </> :
                  (<>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                    </div>
                  </>)
                }
                <div id="recaptcha-container"></div>
                <div className="mb-3 d-flex flex-grow-1 justify-content-center">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                <div className="text-center mb-3">
                  <button
                    className="btn btn-danger btn-block"
                    onClick={signInWithGoogle}
                  >
                    Login with Google
                  </button>
                </div>
                {!loginPhoneNumber ?
                  <div className="text-center mb-3">
                    <button
                      className="btn btn-danger btn-block"
                      onClick={handleSignInWithPhone}
                    >
                      Login with phoneNumber
                    </button>
                  </div> :
                  <div className="text-center mb-3">
                    <button
                      className="btn btn-danger btn-block"
                      onClick={handleVerifyCode}
                    >
                      Verify Code
                    </button>
                  </div> }
                <div className="text-center">
                  <Link to="/reset">Forgot Password</Link>
                </div>
                <div className="text-center mt-3">
                  Don't have an account? <Link to="/register">Register</Link> now.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
