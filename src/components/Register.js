import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) {
      alert("Please enter name");
      return;
    }
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <div className="container d-flex flex-column" style={{ height: "calc(100vh - 98px)"}}>
      <div className="row d-flex flex-grow-1 justify-content-center align-items-center">
        <div className="col-md-6 col-lg-4">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Register</h3>
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div className="mb-3 d-flex flex-grow-1 justify-content-center">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={register}
                  >
                    Register
                  </button>
                </div>
                <div className="text-center mb-3">
                  <button
                    className="btn btn-danger btn-block"
                    onClick={signInWithGoogle}
                  >
                    Register with Google
                  </button>
                </div>
                <div className="text-center mt-3">
                  Already have an account? <Link to="/login_page">Login</Link> now.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
